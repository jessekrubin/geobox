import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { JSON_SCHEMA_OPTIONS_SCHEMA } from "./common.js";

export function JsonSchemaNumber(options?: SchemaOptions) {
  return Type.Composite(
    [
      JSON_SCHEMA_OPTIONS_SCHEMA,
      Type.Object(
        {
          type: Type.Literal("number"),
          maximum: Type.Optional(Type.Number()),
          exclusiveMaximum: Type.Optional(Type.Number()),
          minimum: Type.Optional(Type.Number()),
          exclusiveMinimum: Type.Optional(Type.Number()),
        },
        options,
      ),
    ],
    {
      description: "JSON-Schema-Schema",
      ...options,
    },
  );
}
