import type { TSchema, TSchemaOptions } from "typebox";
import { Type } from "typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type { TFeatureSchemas, TGeometrySchema } from "./types.js";
import { FeatureId, GeojsonBoudingBox } from "./core.js";
import { Geometry } from "./geometry.js";
import { FeatureProperties } from "./index.js";

export function Feature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(
  schemas?: TFeatureSchemas<TProps, TCoord, TBBox> & {
    geometry?: TGeometrySchema;
  },
  options?: TSchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: schemas?.geometry ?? Geometry(),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(),
    },
    {
      additionalProperties: false,
      ...options,
    },
  );
}
