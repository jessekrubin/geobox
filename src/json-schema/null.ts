import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { JSON_SCHEMA_OPTIONS_SCHEMA } from "./common.js";

export function JsonSchemaNull(options?: SchemaOptions) {
  return Type.Composite(
    [
      JSON_SCHEMA_OPTIONS_SCHEMA,
      Type.Object(
        {
          type: Type.Literal("null"),
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
