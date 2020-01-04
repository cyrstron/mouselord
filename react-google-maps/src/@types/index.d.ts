declare namespace google.maps {
  export interface MapType {
    getTile(
      tileCoord: google.maps.Point,
      zoom: number,
      ownerDocument: Document,
    ): Element | null;
  }
  export interface MapConstructor {
    new(container: HTMLDivElement, options: google.maps.MapOptions): google.maps.Map;
  }

  export interface MarkerConstructor {
    new(options: google.maps.MarkerOptions): google.maps.Marker;
  }

  export interface PolygonConstructor {
    new(options: google.maps.PolygonOptions): google.maps.Polygon;
  }

  export interface PointConstructor {
    new(x: number, y: number): google.maps.Point;
  }

  export interface CircleConstructor {
    new(options: google.maps.CircleOptions): google.maps.Circle;
  }

  export interface RectangleConstructor {
    new(options: google.maps.RectangleOptions): google.maps.Rectangle;
  }

  export interface PolylineConstructor {
    new(options: google.maps.PolylineOptions): google.maps.Polyline;
  }

  export interface LatLngConstructor {
    new(lat: number, lng: number): google.maps.LatLng;
  }

  export interface SizeConstructor {
    new(width: number, height: number): google.maps.Size;
    new(
      width: number, 
      height: number, 
      widthUnit: string,
      heightUnit: string,
      ): google.maps.Size;
  }

  export type SizeOptions = {
    width: number, 
    height: number, 
  } | {
    width: number, 
    height: number, 
    widthUnit: string,
    heightUnit: string,
  }

  export interface OverlayViewConstructor {
    new(): google.maps.OverlayView;
  }

  export interface GroundOverlay {
    map_changed(): void;
  }

  export interface GroundOverlayConstructor {
    new(
      url: string, 
      bounds: LatLngBounds | LatLngBoundsLiteral,
      options: GroundOverlayOptions,
    ): google.maps.GroundOverlay;
  }

  export interface InfoWindowConstructor {
    new(options: InfoWindowOptions): google.maps.InfoWindow;
  }

  export interface LatLngBoundsConstructor {
    new(): google.maps.LatLngBounds;
    new(southWest: LatLngLiteral, northEast: LatLngLiteral): google.maps.LatLngBounds;
  }

  export interface MapCreationOptions extends google.maps.MapOptions {
    zoom: number;
  }

  export type MapEventHandler = () => void;
  export type MapMouseEventHandler = (e:google.maps.MouseEvent) => void;
  export type MapIconEventHandler = (e:google.maps.IconMouseEvent) => void;
  export type MapPolyEventHandler = (e:google.maps.PolyMouseEvent) => void;
  
  export interface MapsObject<
    MapsObjectEventName,
    MapsObjectOptions,
    MapsObjectEventHandler
  > {
    setOptions?(options: MapsObjectOptions): void;
    addListener(
      event: MapsObjectEventName,
      handler: MapsObjectEventHandler,
    ): google.maps.MapsEventListener;
  }

  export interface Feature<
    FeatureEventName,
    FeatureOptions,
    FeatureEventHandler
  > extends MapsObject<  
    FeatureEventName,
    FeatureOptions,
    FeatureEventHandler
  > {
    setMap(map: Map | null): void;
  }
}

declare namespace google.custom {
  export interface TilesOverlay extends google.maps.MapType {
    index: number;
    map: google.maps.Map | null;
    getTile(
      tileCoord: google.maps.Point,
      zoom: number,
      ownerDocument: Document,
    ): Element;
    setMap(map: google.maps.Map | null): void;
    remove(): void;
    refreshTiles(): void;
    registerTile?: (
      node: Node,      
      payload: {tileCoord: google.maps.Point, zoom: number}
    ) => void;
    unregisterTile?: (node: Node) => void;
    onRegister(callback: (
      node: Node,      
      payload: {tileCoord: google.maps.Point, zoom: number}
    ) => void): void;
    onUnregister(callback: (node: Node) => void): void;
  }

  export interface TilesOverlayOptions {
    tagName?: string,
    width: number,
    height?: number,
    widthUnit?: string,
    heightUnit?: string,
    maxZoom?: number,
    minZoom?: number,
    index: number,
    map?: google.maps.Map,
  }

  export type TilesOverlayConstructor = new(
    options: TilesOverlayOptions & {      
      registerTile?: (node: Node, payload: {tileCoord: google.maps.Point, zoom: number}) => void,
      unregisterTile?: (node: Node) => void,
    }
  ) => TilesOverlay;

  export interface DomOverlayOptions {
    map?: google.maps.Map;
    bounds: google.maps.LatLngBounds | 
      google.maps.LatLngBoundsLiteral |
      google.maps.LatLngLiteral[];
    opacity?: number;
    isHidden?: boolean;
  }
  
  export type DomOverlayConstructor = new(
    options: DomOverlayOptions,
  ) => DomOverlay;
  
  export interface DomOverlay extends google.maps.OverlayView {
    getContainer(): HTMLDivElement | void;
    setOpacity(opacity?: number): void;
    setIsHidden(isHidden?: boolean): void;
    setBounds(
      bounds?: google.maps.LatLngBounds |
        google.maps.LatLngBoundsLiteral |
        google.maps.LatLngLiteral[],
    ): void;
    setOptions({
      opacity,
      isHidden,
      bounds,
      map,
    }: google.custom.DomOverlayOptions): void
  }
}

declare namespace google {
  export interface Maps {
    Map: google.maps.MapConstructor;
    Marker: google.maps.MarkerConstructor;
    Polygon: google.maps.PolygonConstructor;
    Polyline: google.maps.PolylineConstructor;
    Circle: google.maps.CircleConstructor;
    Rectangle: google.maps.RectangleConstructor;
    LatLng: google.maps.LatLngConstructor;
    LatLngBounds: google.maps.LatLngBoundsConstructor;
    OverlayView: google.maps.OverlayViewConstructor;
    GroundOverlay: google.maps.GroundOverlayConstructor;
    InfoWindow: google.maps.InfoWindowConstructor;
    Size: google.maps.SizeConstructor;
    Point: google.maps.PointConstructor;
    SymbolPath: {
      CIRCLE: google.maps.SymbolPath.CIRCLE;
      BACKWARD_CLOSED_ARROW: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW;
      BACKWARD_OPEN_ARROW: google.maps.SymbolPath.BACKWARD_OPEN_ARROW;
      FORWARD_CLOSED_ARROW: google.maps.SymbolPath.FORWARD_CLOSED_ARROW;
      FORWARD_OPEN_ARROW: google.maps.SymbolPath.FORWARD_OPEN_ARROW;
    };
  }
  export interface Custom {
    TilesOverlay: google.custom.TilesOverlayConstructor;
    DomOverlay: google.custom.DomOverlayConstructor;
    boundsToLiteral(
      bounds: google.maps.LatLngBounds,
    ): google.maps.LatLngBoundsLiteral;
    pointsToBounds(
      points: google.maps.LatLngLiteral[],
    ): google.maps.LatLngBounds
  }
}

declare interface Google {
  maps: google.Maps;
  custom: google.Custom;
}
