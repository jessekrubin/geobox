import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";

export function TmsTimestamp(options?: TSchemaOptions) {
  return Type.String({
    format: "date-time",
    title: "Timestamp",
    description: "A timestamp in ISO 8601 format",
    ...options,
  });
}
