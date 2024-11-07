import type { SchemaOptions, TSchema } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { BBox } from "../bbox.js";
import { Feature } from "./feature.js";

export function FeatureCollection<FSchema extends TSchema>(
  feature?: FSchema,
  options?: SchemaOptions,
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
