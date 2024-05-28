/**
 * Turfbox = turf/geojson + typebox
 */
import type { SchemaOptions } from "../typebox.js";
import { Type } from "../typebox.js";
import type { TUnionVec2Vec3, TVec2, TVec3 } from "../types.js";

export type TCoord2d = TVec2;
export type TCoord3d = TVec3;
export type TCoord = TUnionVec2Vec3;
export type TCoordinateSchema = TCoord | TCoord2d | TCoord3d;

export function Coord2d(options?: SchemaOptions): TCoord2d {
  return Type.Tuple([Type.Number(), Type.Number()], {
    title: "coordinate 2d",
    description: "2d coordinate: [x, y]",
    ...options,
  });
}

export function Coord3d(options?: SchemaOptions): TCoord3d {
  return Type.Tuple([Type.Number(), Type.Number(), Type.Number()], {
    title: "coordinate 3d",
    description: "3d coordinate: [x, y, z]",
    ...options,
  });
}

export function Coord(options?: SchemaOptions): TCoord {
  return Type.Union([Coord2d(), Coord3d()], {
    title: "coordinate",
    description: "2d/3d coordinate: [x, y] or [x, y, z]",
    ...options,
  });
}

/**
 * GeoJSON Latitude json-schema
 * @returns {TNumber} GeoJSON Latitude json-schema
 */
export function Latitude(options?: SchemaOptions) {
  return Type.Number({
    title: "Latitude",
    description: "Longitude",
    ...options,
  });
}

/**
 * GeoJSON Longitude json-schema
 * @returns {TNumber} GeoJSON Longitude json-schema
 */
export function Longitude(options?: SchemaOptions) {
  return Type.Number({
    title: "Longitude",
    description: "Longitude",
    ...options,
  });
}

export function LatitudeWgs84(options?: SchemaOptions) {
  return Latitude({
    minimum: -90,
    maximum: 90,
    title: "LatitudeWgs84",
    description: "WGS84 latitude; -90 to 90 degrees",
    ...options,
  });
}

export function LongitudeWgs84(options?: SchemaOptions) {
  return Longitude({
    minimum: -180,
    maximum: 180,
    title: "LongitudeWgs84",
    description: "WGS84 longitude; -180 to 180 degrees",
    ...options,
  });
}

export function Coordinate2dWgs84(options?: SchemaOptions) {
  return Type.Tuple([LongitudeWgs84(), LatitudeWgs84()], {
    title: "GeoJSON coordinate 2d WGS84",
    description: "coordinate: [longitude, latitude]",
    ...options,
  });
}

export function Coordinate3dWgs84(options?: SchemaOptions) {
  return Type.Tuple([...Type.Rest(Coordinate2dWgs84()), Type.Number()], {
    title: "GeoJSON coordinate 3d WGS84",
    description: "coordinate: [longitude, latitude, elevation/z]",
    ...options,
  });
}

export function CoordinateWgs84(options?: SchemaOptions) {
  return Type.Union([Coordinate2dWgs84(), Coordinate3dWgs84()], {
    title: "GeoJSON coordinate WGS84",
    description:
      "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
    ...options,
  });
}

export function LonLat(options?: SchemaOptions) {
  return Type.Object(
    {
      lon: Longitude(options),
      lat: Latitude(options),
    },
    {
      title: "LonLat",
      description: "Longitude, Latitude",
      ...options,
    },
  );
}

export function LonLatZ(options?: SchemaOptions) {
  return Type.Object(
    { lon: Longitude(options), lat: Latitude(options), z: Type.Number() },
    {
      title: "LonLatZ",
      description: "Longitude, Latitude, Z",
      ...options,
    },
  );
}

export function LonLatWgs84(options?: SchemaOptions) {
  return Type.Object(
    {
      lon: LongitudeWgs84(options),
      lat: LatitudeWgs84(options),
    },
    {
      title: "LonLatWgs84",
      description: "Longitude, Latitude",
      ...options,
    },
  );
}

export function LngLat(options?: SchemaOptions) {
  return Type.Object(
    {
      lng: Longitude(options),
      lat: Latitude(options),
    },
    {
      title: "LngLat",
      description: "Longitude, Latitude",
      ...options,
    },
  );
}

export function LngLatWgs84(options?: SchemaOptions) {
  return Type.Object(
    {
      lng: LongitudeWgs84(options),
      lat: LatitudeWgs84(options),
    },
    {
      title: "LngLatWgs84",
      description: "Longitude, Latitude",
      ...options,
    },
  );
}
