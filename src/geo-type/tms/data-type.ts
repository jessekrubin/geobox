import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export function TmsDataType(options?: SchemaOptions) {
  return Type.Union(
    [
      Type.Literal("map"),
      Type.Literal("vector"),
      Type.Literal("coverage"),
      Type.String(),
    ],
    {
      $schema: "https://json-schema.org/draft/2019-09/schema",
      title: "DataType",
      description: "The type of data in the tile set",
      ...options,
    },
  );
}
