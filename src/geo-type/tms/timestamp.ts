import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export function TmsTimestamp(options?: SchemaOptions) {
  return Type.String({
    format: "date-time",
    title: "Timestamp",
    description: "A timestamp in ISO 8601 format",
    ...options,
  });
}
