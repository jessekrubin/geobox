import type { AssertType, TOptional, TSchema } from "@sinclair/typebox";
import type { IsDefined } from "../../types.js";
import type { TBBoxSchema } from "../bbox.js";
import type { Coord, TCoord2d, TCoord3d, TCoordinateSchema } from "../coord.js";
import type { LineStringGeometry } from "./line-string-geometry.js";
import type { MultiLineStringGeometry } from "./multi-line-string-geometry.js";
import type { MultiPointGeometry } from "./multi-point-geometry.js";
import type { MultiPolygonGeometry } from "./multi-polygon-geometry.js";
import type { PointGeometry } from "./point-geometry.js";
import type { PolygonGeometry } from "./polygon-geometry.js";
import type { GeojsonProperties } from "./properties.js";

/**
 * type inference for coordinate(s)
 */
export type TGeojsonCoordinate<T extends TCoordinateSchema | undefined> =
  IsDefined<T> extends true ? AssertType<T> : ReturnType<typeof Coord>;


export type TGeojsonBoundingBox<T extends TBBoxSchema | undefined> =
  IsDefined<T> extends true ? AssertType<T> : TOptional<TBBoxSchema>;
export type TGeometrySchemas<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
> = {
  coordinate?: TCoord;
  bbox?: TBBox;
};

export type TFeatureSchemas<
  TProperties extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
> = {
  properties?: TProperties;
} & TGeometrySchemas<TCoord, TBBox>;

export type TFeatureSchemasV2<
  TProperties extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
> = {
  properties?: TProperties;
} & TGeometrySchemas<TCoord, TBBox>;

export type TProperties<T extends TSchema | undefined> =
  IsDefined<T> extends true
    ? AssertType<T>
    : ReturnType<typeof GeojsonProperties>;

export type TFeatureSchemas2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
> = TFeatureSchemas<TProps, TCoord2d, TBBox>;

export type TFeatureSchemas3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
> = TFeatureSchemas<TProps, TCoord3d, TBBox>;

export type TGeometrySchema =
  | ReturnType<typeof PointGeometry>
  | ReturnType<typeof LineStringGeometry>
  | ReturnType<typeof PolygonGeometry>
  | ReturnType<typeof MultiPointGeometry>
  | ReturnType<typeof MultiLineStringGeometry>
  | ReturnType<typeof MultiPolygonGeometry>;
