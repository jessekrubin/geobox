import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { Nullable } from "../../tb.js";

export function GeojsonProperties(options?: TSchemaOptions) {
  return Nullable(Type.Record(Type.String(), Type.Unknown()), {
    title: "GeoJSON properties",
    ...options,
  });
}
