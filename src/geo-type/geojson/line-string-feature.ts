import type { TSchema, TSchemaOptions } from "typebox";
import { Type } from "typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type {
  TFeatureSchemas,
  TFeatureSchemas2d,
  TFeatureSchemas3d,
} from "./types.js";
import { Coord2d, Coord3d } from "../coord.js";
import { FeatureId, FeatureProperties, GeojsonBoudingBox } from "./core.js";
import { LineStringGeometry } from "./line-string-geometry.js";

export function LineStringFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: TSchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: LineStringGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
    },
    options,
  );
}

export { LineStringFeature as LineString };

export function LineStringFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: TSchemaOptions) {
  return LineStringFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export { LineStringFeature2d as LineString2d };

export function LineStringFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: TSchemaOptions) {
  return LineStringFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export { LineStringFeature3d as LineString3d };
