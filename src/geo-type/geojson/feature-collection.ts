import type { TSchema, TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { BBox } from "../bbox.js";
import { Feature } from "./feature.js";

export function FeatureCollection<FSchema extends TSchema>(
  feature?: FSchema,
  options?: TSchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("FeatureCollection"),
      features: Type.Array(feature ?? Feature()),
      bbox: Type.Optional(BBox()),
    },
    {
      additionalProperties: false,
      ...options,
    },
  );
}
