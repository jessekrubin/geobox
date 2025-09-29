import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";

// TODO: Implement ProjJson schema FOR REAL
export function ProjJson(options?: TSchemaOptions) {
  return Type.Any({
    ...options,
    title: "ProjJson",
    description: "A JSON object representing a PROJ coordinate reference",
  });
}
