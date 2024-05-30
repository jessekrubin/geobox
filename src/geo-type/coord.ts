/**
 * Turfbox = turf/geojson + typebox
 */
import type { SchemaOptions, TNumber } from "../typebox.js";
import { Type } from "../typebox.js";
import type { TUnionVec2Vec3, TVec2, TVec3 } from "../types.js";
import { LatitudeWgs84, LongitudeWgs84 } from "./lnglat.js";

export type TCoord2d = TVec2;
export type TCoord3d = TVec3;
export type TCoord = TUnionVec2Vec3;
export type TCoordinateSchema = TCoord | TCoord2d | TCoord3d;

export type CoordSchemaOptions = {
  Tx?: TNumber;
  Ty?: TNumber;
  Tz?: TNumber;
} & SchemaOptions;

function _coordOptions(options?: CoordSchemaOptions): {
  Tx: TNumber;
  Ty: TNumber;
  Tz: TNumber;
  schemaOptions: SchemaOptions;
} {
  const {
    Tx = Type.Number(),
    Ty = Type.Number(),
    Tz = Type.Number(),
    ...schemaOptions
  } = options || {};
  return { Tx, Ty, Tz, schemaOptions };
}

export function Coord2d(options?: CoordSchemaOptions): TCoord2d {
  const { Tx, Ty, schemaOptions } = _coordOptions(options);
  return Type.Tuple([Tx, Ty], {
    title: "coordinate 2d",
    description: "2d coordinate: [x, y]",
    ...schemaOptions,
  });
}

export function Coord3d(options?: CoordSchemaOptions): TCoord3d {
  const { Tx, Ty, Tz, schemaOptions } = _coordOptions(options);
  return Type.Tuple([Tx, Ty, Tz], {
    title: "coordinate 3d",
    description: "3d coordinate: [x, y, z]",
    ...schemaOptions,
  });
}

export function Coord(options?: CoordSchemaOptions): TCoord {
  return Type.Union([Coord2d(options), Coord3d(options)], {
    title: "coordinate",
    description: "2d/3d coordinate: [x, y] or [x, y, z]",
    ...options,
  });
}

export function Coord2dWgs84(options?: SchemaOptions) {
  return Type.Tuple([LongitudeWgs84(), LatitudeWgs84()], {
    title: "GeoJSON coordinate 2d WGS84",
    description: "coordinate: [longitude, latitude]",
    ...options,
  });
}

export function Coord3dWgs84(options?: SchemaOptions) {
  return Type.Tuple([LongitudeWgs84(), LatitudeWgs84(), Type.Number()], {
    title: "GeoJSON coordinate 3d WGS84",
    description: "coordinate: [longitude, latitude, elevation/z]",
    ...options,
  });
}
