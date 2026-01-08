import type { TNumber, TSchemaOptions } from "typebox";
/**
 * Turfbox = turf/geojson + typebox
 */
import { Type } from "typebox";
import type { TUnionVec2Vec3, TVec2, TVec3 } from "../types.js";
import { LatitudeWgs84, LongitudeWgs84 } from "./lnglat.js";

export type TCoord2d = TVec2;
export type TCoord3d = TVec3;
export type TCoord = TUnionVec2Vec3;
export type TCoordinateSchema = TCoord | TCoord2d | TCoord3d;

export type CoordSchemaOptions = {
  x?: TNumber;
  y?: TNumber;
  z?: TNumber;
} & TSchemaOptions;

function coordSchemaOptions(options?: CoordSchemaOptions): {
  x: TNumber;
  y: TNumber;
  z: TNumber;
  schemaOptions: TSchemaOptions;
} {
  const {
    x = Type.Number(),
    y = Type.Number(),
    z = Type.Number(),
    ...schemaOptions
  } = options || {};
  return { x, y, z, schemaOptions };
}

export function Coord2d(options?: CoordSchemaOptions): TCoord2d {
  const { x, y, schemaOptions } = coordSchemaOptions(options);
  return Type.Tuple([x, y], {
    title: "coordinate 2d",
    description: "2d coordinate: [x, y]",
    ...schemaOptions,
  });
}

export function Coord3d(options?: CoordSchemaOptions): TCoord3d {
  const { x, y, z, schemaOptions } = coordSchemaOptions(options);
  return Type.Tuple([x, y, z], {
    title: "coordinate 3d",
    description: "3d coordinate: [x, y, z]",
    ...schemaOptions,
  });
}

export function Coord(options?: CoordSchemaOptions): TCoord {
  const { x, y, z, schemaOptions } = coordSchemaOptions(options);
  return Type.Union([Type.Tuple([x, y]), Type.Tuple([x, y, z])], {
    title: "coordinate",
    description: "2d/3d coordinate: [x, y] or [x, y, z]",
    ...schemaOptions,
  });
}

export function Coord2dWgs84(options?: TSchemaOptions) {
  return Type.Tuple([LongitudeWgs84(), LatitudeWgs84()], {
    title: "GeoJSON coordinate 2d WGS84",
    description: "coordinate: [longitude, latitude]",
    ...options,
  });
}

export function Coord3dWgs84(options?: TSchemaOptions) {
  return Type.Tuple([LongitudeWgs84(), LatitudeWgs84(), Type.Number()], {
    title: "GeoJSON coordinate 3d WGS84",
    description: "coordinate: [longitude, latitude, elevation/z]",
    ...options,
  });
}
