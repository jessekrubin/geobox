import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export function Tms2dPoint(options?: SchemaOptions) {
  return Type.Array(Type.Number(), {
    ...options,
    title: "2DPoint",
    minItems: 2,
    maxItems: 2,
    description: "A 2D Point in the CRS indicated elsewhere",
  });
}
