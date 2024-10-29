import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

// TODO: Implement ProjJson schema FOR REAL
export function ProjJson(options?: SchemaOptions) {
  return Type.Any({
    ...options,
    title: "ProjJson",
    description: "A JSON object representing a PROJ coordinate reference",
  });
}
