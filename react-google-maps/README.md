# react-google-maps

React components library for google maps.

__Library is under active development. It is not recomended for production usage so far.__

```javascript
import {GoogleApiProvider, Map, Marker} from 'react-google-maps-ts';

const App = () => (
  <GoogleApiProvider
    apiKey="<API_KEY>"
  >
    <MyAwesomeApp />
  </GoogleApiProvider>
);

const geoPoint = {lat: 50, lng: 50};

const MyAwesomeApp = () => (
  <Map
    defaultCenter={geoPoint}
  >
    <Marker 
      position={geoPoint}
      zoom={8}
      title="My perfect marker"
    />
  </Map>
);
```

##### Implemented features:

* Marker
* Polygon
* Polyline
* Circle
* Rectangle
* TilesOverlay (MapType)
* DomOverlay (OverlayView)
* GroundOverlay
* InfoWindow

## `GoogleMapsProvider`

### Common API loading

```javascript
import {GoogleApiProvider} from 'react-google-maps-ts';

const App = () => (
  <GoogleApiProvider
    apiKey="<API_KEY>"
    geometry // include geometry library
    drawing // include drawing library
    places // include places library
    visualization // include visualization library
    language='en' // Google Maps localization
    region='GB'
    version='quarterly' // Google Maps versioning
  >
    <MyAwesomeApp />
  </GoogleApiProvider>
);
```

### Proxy API loading

You can load Google API using your own proxy

```javascript
import {GoogleApiProvider} from 'react-google-maps-ts';

const App = () => (
  <GoogleApiProvider
    proxy='<Your proxy URL>'
  >
    <MyAwesomeApp />
  </GoogleApiProvider>
);
```

### Custom loading callback

You can load Google API using your own loading method

```javascript
import {GoogleApiProvider} from 'react-google-maps-ts';

const load = async (): Promise<GoogleObject> => {
  // implementation

  return googleApi;
}

const App = () => (
  <GoogleApiProvider
    load={load}
  >
    <MyAwesomeApp />
  </GoogleApiProvider>
);
```

### Extending library with you own classes

You can extend Google API with your custom objects

```javascript
import {GoogleApiProvider} from 'react-google-maps-ts';

const extend = async (google: Google): void => {
  google["<your namespace>"] = // your extension;
}

const App = () => (
  <GoogleApiProvider
    apiKey="<API_KEY>"
    extend={extend}
  >
    <MyAwesomeApp />
  </GoogleApiProvider>
);
```

## Smart vs Dumb components

Main purpose of this library is combining of declarative React syntax with free accessibility to Google Maps objects without doubtful workarounds.

Each component has smart and dumb implementations.

### Smart components

Smart components are self-contained. They have their own encapsulated Google Maps objects and you can't access them. But they are extremely simple to use and their intarfaces are similar to corresponding Google Maps object.

```javascript
import {Map, Marker} from 'react-google-maps-ts';

const geoPoint = {lat: 50, lng: 50};

const MyAwesomeApp = () => (
  <Map
    defaultCenter={geoPoint}
  >
    <Marker 
      position={geoPoint}
      zoom={8}
      title="My perfect marker"
    />
  </Map>
);
```

### Dumb components

Dumb components use Google Maps objects from external context. So you can access it if you need.

```javascript
import {DumbMap, withSmartMapCtx, MapService, useGoogleCtx} from 'react-google-maps-ts';

interface AwesomeAppProps {
  ...
};

const geoPoint = {lat: 50, lng: 50};

const MyAwesomeApp = (
  {mapService}: AwesomeAppProps & {mapService: MapService | undefined}
) => {  
  const googleApi = useGoogleCtx();

  const centerMap = () => { 
    // Notice that such approach creates new function on each render
    // It is provided only as example. It is recomended to avoid it.

    if (!mapService || !googleApi) return;

    const {object} = mapService; // Google Maps object;

    const defaultCenter = new googleApi.maps.LatLng(geoPoint.lat, geoPoint.lng);

    object.setCenter(defaultCenter);
  }

  return (
    <>
      <button onClick={centerMap}>Center map</button>
      <DumbMap
        defaultCenter={geoPoint}
      />
    </>
  );
}

withSmartMapCtx<AwesomeAppProps>(MyAwesomeApp);
```
