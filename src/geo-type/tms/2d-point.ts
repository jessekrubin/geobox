import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";

export function Tms2dPoint(options?: TSchemaOptions) {
  return Type.Array(Type.Number(), {
    ...options,
    title: "2DPoint",
    minItems: 2,
    maxItems: 2,
    description: "A 2D Point in the CRS indicated elsewhere",
  });
}
