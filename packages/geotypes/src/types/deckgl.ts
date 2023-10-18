export type DeckglTilejson = {
  tilejson: string;
  tiles: string[];
  // eslint-disable-next-line camelcase, @typescript-eslint/no-explicit-any
  vector_layers: any[];
  attribution?: string;
  scheme?: string;
  maxzoom?: number;
  minzoom?: number;
  version?: string;
};

export type DeckglMapViewstate = {
  /** Longitude of the map center */
  longitude: number;
  /** Latitude of the map center */
  latitude: number;
  /** Zoom level */
  zoom: number;
  /** Pitch (tilt) of the map, in degrees. `0` looks top down */
  pitch?: number;
  /** Bearing (rotation) of the map, in degrees. `0` is north up */
  bearing?: number;
  /** Min zoom, default `0` */
  minZoom?: number;
  /** Max zoom, default `20` */
  maxZoom?: number;
  /** Min pitch, default `0` */
  minPitch?: number;
  /** Max pitch, default `60` */
  maxPitch?: number;
  /** Viewport center offsets from lng, lat in meters */
  position?: number[];
}
