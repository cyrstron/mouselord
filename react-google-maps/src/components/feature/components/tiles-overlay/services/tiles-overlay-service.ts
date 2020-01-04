import {MapService} from '../../../../map/services';
import debounce from 'lodash/debounce';
import { tileToKey } from './tiles-overlay-utils';
import { EventlessFeatureService } from '../../../services/eventless-feature-service/eventless-feature-service';
import { CreateTilesOverlayServiceProps } from './create-tiles-overlay-service';

export interface TilePayload {
  tileCoord: google.maps.Point,
  zoom: number,
}

export type ExtendPayloadCallback<ExtendedPayload = any> = (
  payload: TilePayload  & {
    width: number,
    height: number,
  }
) => Promise<ExtendedPayload | undefined>

export type SetTilesCallback<ExtendedPayload> = (
  tiles: Map<Node, TilePayload & {data?: ExtendedPayload}>
) => void;

export class TilesOverlayService<
  ExtendedPayload = any
> extends EventlessFeatureService<
  google.custom.TilesOverlayOptions,
  google.custom.TilesOverlay
> {
  isUnmounted: boolean = false;

  tiles = new Map<Node, TilePayload & {data?: ExtendedPayload}>();
  tilesByKey: {[key: string]: Node | undefined} = {};
  tilesForAddByKey: {[key: string]: Node | undefined} = {};

  tilesForDelete: Node[] = [];
  tilesForAdd: Array<{
    node: Node,
    payload: TilePayload & {data?: ExtendedPayload}
  }> = [];

  setTiles: SetTilesCallback<ExtendedPayload>;
  extendPayload?: ExtendPayloadCallback<ExtendedPayload>;

  constructor(
    googleApi: Google,
    mapService: MapService,
    options: google.custom.TilesOverlayOptions,
    setTiles: SetTilesCallback<ExtendedPayload>,
    extendPayload?: ExtendPayloadCallback<ExtendedPayload>,
  ) {
    super(
      googleApi,
      mapService,
      new googleApi.custom.TilesOverlay({
        map: mapService.getObject(), 
        ...options
      }),
      options,
    );
    
    this.setTiles = setTiles;
    this.extendPayload = extendPayload;

    this.object.onRegister(this.registerTile);
    this.object.onUnregister(this.unregisterTile);

    this.object.refreshTiles();
  }

  async getExtendedData(
    payload: TilePayload
  ): Promise<ExtendedPayload | undefined> {
    if (!this.extendPayload) return;

    const {width, height} = this.options;

    return this.extendPayload({
      ...payload,
      width,
      height: height || width,
    });
  }

  setProps({
    setTiles,
    extendPayload,
    ...props
  }: CreateTilesOverlayServiceProps<ExtendedPayload>): void {
    this.setTilesCallback(setTiles);
    this.setExtendPayloadCallback(extendPayload);

    super.setProps(props);
  }

  updateProps({
    setTiles,
    extendPayload,
    ...props
  }: CreateTilesOverlayServiceProps<ExtendedPayload>): void {
    this.updateTilesCallback(setTiles);
    this.updateExtendPayloadCallback(extendPayload);

    super.updateProps(props);
  }

  updateExtendPayloadCallback(    
    extendPayload?: ExtendPayloadCallback<ExtendedPayload>
  ): void {
    if (extendPayload === this.extendPayload) return;

    this.setExtendPayloadCallback(extendPayload);
  }

  setExtendPayloadCallback(
    extendPayload?: ExtendPayloadCallback<ExtendedPayload>
  ): void {
    this.extendPayload = extendPayload;
  }

  updateTilesCallback(setTiles: SetTilesCallback<ExtendedPayload>): void {
    if (setTiles === this.setTiles) return;

    this.setTilesCallback(setTiles);
  }

  setTilesCallback(setTiles: SetTilesCallback<ExtendedPayload>): void {
    this.setTiles = setTiles;
  }

  updateTiles(tiles: Map<Node, TilePayload & {data?: ExtendedPayload}>) {
    this.tiles = tiles;
    this.setTiles(tiles);
  }

  registerTile = async (
    node: Node, 
    payload: TilePayload, 
  ) => {
    let extendedPayload: ExtendedPayload | undefined;

    extendedPayload = await this.getExtendedData(payload) as ExtendedPayload;

    const key = tileToKey(payload);
    const tileForAdd = this.tilesForAddByKey[key];

    if (tileForAdd) {
      this.tilesForAdd = this.tilesForAdd.filter(({node}) => node !== tileForAdd);
    }

    this.tilesForAddByKey[key] = node;

    const addedTile = this.tilesByKey[key];

    if (addedTile) {
      this.unregisterTile(addedTile);
    }  

    const fullPayload = {
      ...payload,
      data: extendedPayload
    }
    
    this.tilesForAdd.push({node, payload: fullPayload});

    this.recalcTiles();
  }

  unregisterTile = (node: Node) => {
    this.tilesForDelete.push(node);

    this.recalcTiles();
  }

  async recalcData() {
    const nodes: Node[] = [];
    const dataPromises: Promise<ExtendedPayload | undefined>[] = [];

    for (const [node, {data, ...payload}] of this.tiles) {
      const dataPromise = this.getExtendedData(payload)
      dataPromises.push(dataPromise);
      nodes.push(node);
    }

    const dataArray = await Promise.all(dataPromises);

    if (this.isUnmounted) return;

    const newTiles = new Map<Node, TilePayload & {data?: ExtendedPayload}>();

    nodes.forEach((node, index) => {
      const data = dataArray[index];
      const value = this.tiles.get(node);

      if (!value) return;

      const {
        data: prevData, 
        ...payload
      } = value

      newTiles.set(node, {...payload, data})
    });

    this.updateTiles(newTiles);
  }

  recalcTiles = debounce(() => {
    if (this.isUnmounted) return;
    
    const newTiles = new Map<Node, TilePayload & {data?: ExtendedPayload}>();

    for (const [node, payload] of this.tiles) {
      newTiles.set(node, payload);
    }

    this.tilesForDelete.forEach((tile) => {
      newTiles.delete(tile);
    });

    this.tilesForAdd.forEach(({node, payload}) => {
      newTiles.set(node, payload);
    });
    
    this.tilesForDelete = [];
    this.tilesForAdd = [];    
    this.tilesForAddByKey = {};

    this.tilesByKey = {};

    const tileNodes = newTiles.keys();
    
    for (const node of tileNodes) {
      const payload = newTiles.get(node);

      if (!payload) continue;

      const key = tileToKey(payload);

      this.tilesByKey[key] = node;
    }

    this.updateTiles(newTiles);
  }, 20);

  unmount() {
    this.isUnmounted = true;
    super.unmount();
  }
}
