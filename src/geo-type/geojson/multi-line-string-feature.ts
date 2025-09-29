import type { TSchemaOptions, TSchema } from "typebox";
import { Type } from "typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type {
  TFeatureSchemas,
  TFeatureSchemas2d,
  TFeatureSchemas3d,
} from "./types.js";
import { Coord2d, Coord3d } from "../coord.js";
import { FeatureId, FeatureProperties } from "./core.js";
import { MultiLineStringGeometry } from "./multi-line-string-geometry.js";

export function MultiLineStringFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: TSchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiLineStringGeometry({
        coordinate: schemas?.coordinate,
        bbox: schemas?.bbox,
      }),
      properties: FeatureProperties(schemas?.properties),
    },
    options,
  );
}

export function MultiLineStringFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: TSchemaOptions) {
  return MultiLineStringFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export { MultiLineStringFeature2d as MultiLineString2d };
export { MultiLineStringFeature as MultiLineString };

export function MultiLineStringFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: TSchemaOptions) {
  return MultiLineStringFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export { MultiLineStringFeature3d as MultiLineString3d };
