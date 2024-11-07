import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { Nullable } from "../../tb.js";

export function GeojsonProperties(options?: SchemaOptions) {
  return Nullable(Type.Record(Type.String(), Type.Unknown()), {
    title: "GeoJSON properties",
    ...options,
  });
}
