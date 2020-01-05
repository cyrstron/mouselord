import {GeoPointStore} from './point-store';
import {GeoPoint, Cell, GeoPolygon, Figure, IndexatedFigure} from '@mouselord/grider';
import {observable, computed, action} from 'mobx';
import {InputsStore, FormField} from '@stores/inputs-store';
import {NewGameStore} from './new-game-store';

export class NewBorderStore {
  @observable isApplied = false;
  @observable isPending = false;

  @observable points: GeoPointStore[];
  @observable selectedPointIndex?: number;
  @observable selfIntersections: GeoPoint[] = [];
  @observable invalidCells: Cell[] = [];

  inputs: InputsStore;

  constructor(
    public newGameStore: NewGameStore,
    points: grider.GeoPoint[] = [],
  ) {
    this.points = points.map((point) => new GeoPointStore(point));

    this.inputs = new InputsStore({
      inputs: this.points,
      validate: this.validateFigure,
    });
  }

  @action
  selectPoint(pointIndex: number): void {
    this.selectedPointIndex = pointIndex;
  }

  @action
  resetSelection(): void {
    this.selectedPointIndex = undefined;
  }

  @action
  addPoint(geoPoint: grider.GeoPoint): void {
    this.setPoints([
      new GeoPointStore(geoPoint),
      ...this.points,
    ]);
  }

  @action
  insertPoint(index: number, geoPoint: grider.GeoPoint): void {
    this.setPoints([
      ...this.points.slice(0, index),
      new GeoPointStore(geoPoint),
      ...this.points.slice(index),
    ]);

    if (this.selectedPointIndex === undefined ) return;

    if (this.selectedPointIndex >= index) {
      this.selectPoint(this.selectedPointIndex + 1);
    }
  }

  @action
  setPoints(point: GeoPointStore[]): void {
    this.points = point;

    this.inputs.setInputs(this.points);

    this.onReset();
  }


  @action
  insertNearSelected(geoPoint: grider.GeoPoint): void {
    if (this.selectedPointIndex === undefined) {
      this.addPoint(geoPoint);

      return;
    }

    const {values, selectedPointIndex} = this;

    const point = GeoPoint.fromPlain(geoPoint);
    const prevPoint = GeoPoint.fromPlain(
      values[selectedPointIndex - 1] || values[values.length - 1],
    );
    const nextPoint = GeoPoint.fromPlain(
      values[selectedPointIndex + 1] || values[0],
    );

    const isPrevCloser = point.calcMercDistance(prevPoint) <
      point.calcMercDistance(nextPoint);

    const index = isPrevCloser ? selectedPointIndex : selectedPointIndex + 1;

    this.insertPoint(index, geoPoint);
  }

  @action
  deletePoint(index: number): void {
    if (this.points.length === 1) return;

    this.setPoints([
      ...this.points.slice(0, index),
      ...this.points.slice(index + 1),
    ]);

    if (this.selectedPointIndex === undefined) return;

    if (index === this.selectedPointIndex) {
      this.resetSelection();
    } else if (index < this.selectedPointIndex) {
      this.selectPoint(this.selectedPointIndex - 1);
    }
  }

  @action
  updateSelectedPoint(point: grider.GeoPoint): void {
    const {selectedPointIndex} = this;

    if (selectedPointIndex === undefined) return;

    this.updatePoint(selectedPointIndex, point);
  }

  @action
  updatePoint(index: number, point: grider.GeoPoint): void {
    const pointStore = this.points[index];

    if (!pointStore) return;

    pointStore.setPoint(point);

    this.onReset();
  }

  @action
  reset(): void {
    this.setPoints([]);

    this.isApplied = false;
    this.selfIntersections = [];
    this.invalidCells = [];
    this.resetSelection();
  }

  validateFigure = async (inputs: FormField<grider.GeoPoint>[]): Promise<void | never> => {
    if (inputs.length < 3) throw new Error('Border should have at least 3 points');

    const {gridParams} = this.newGameStore;

    if (!gridParams) throw new Error('Grid parameters should be specified');

    const borderPoints = inputs.map(({value}) => GeoPoint.fromPlain(value));

    const borderPoly = new GeoPolygon(borderPoints);

    const {cells, points} = await Figure.validateShape(borderPoly, gridParams);

    this.selfIntersections = points;
    this.invalidCells = cells;

    if (points.length > 0) throw new Error('Border shouldn\'t intersect itself');

    if (cells.length > 0) throw new Error('Border points should be further from each other');
  }

  @computed
  get values(): grider.GeoPoint[] {
    return this.points.map(({value}) => value);
  }

  @computed
  get polyline(): grider.GeoPoint[] {
    const {values} = this;

    if (values.length <= 2) return values;

    return [...values, values[0]];
  }

  get isValid(): boolean {
    return this.inputs.isValid;
  }

  @computed
  get error(): Error | undefined {
    return this.inputs.error;
  }

  @action
  async onApply(): Promise<void> {
    this.isPending = true;

    await this.inputs.validate();

    const {gridParams} = this.newGameStore;

    if (this.inputs.isValid && gridParams) {
      const borderShape = GeoPolygon.fromPlain(this.values);

      const borderFigure = await IndexatedFigure.fromShape(borderShape, gridParams);

      this.newGameStore.setBorderFigure(borderFigure);

      this.isApplied = true;
      this.selectedPointIndex = undefined;
    }

    this.isPending = false;
  }

  @action
  onReset(): void {
    this.isApplied = false;
    this.selfIntersections = [];
    this.invalidCells = [];
    this.inputs.refresh();

    this.newGameStore.resetBorderFigure();
  }
}
