import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { JsonSchemaBoolean } from "./boolean.js";
import { JSON_SCHEMA_OPTIONS_SCHEMA } from "./common.js";
import { JsonSchemaInteger } from "./integer.js";
import { JsonSchemaNull } from "./null.js";
import { JsonSchemaNumber } from "./number.js";
import { JsonSchemaString } from "./string.js";

export function JsonSchema(options?: SchemaOptions) {
  return Type.Recursive(
    (Self) => {
      const objSchema = Type.Composite([
        JSON_SCHEMA_OPTIONS_SCHEMA,
        Type.Object({
          type: Type.Literal("object"),
          properties: Type.Object(
            {},
            {
              additionalProperties: Type.Optional(Self),
            },
          ),
          required: Type.Optional(Type.Array(Type.String())),
          additionalProperties: Type.Optional(Type.Boolean()),
        }),
      ]);
      const arrSchema = Type.Composite([
        JSON_SCHEMA_OPTIONS_SCHEMA,
        Type.Object({
          type: Type.Literal("array"),
          items: Type.Optional(Self),
          minItems: Type.Optional(Type.Integer()),
          maxItems: Type.Optional(Type.Integer()),
          uniqueItems: Type.Optional(Type.Boolean()),
        }),
      ]);
      return Type.Union([
        objSchema,
        arrSchema,
        JsonSchemaString(),
        JsonSchemaNumber(),
        JsonSchemaInteger(),
        JsonSchemaBoolean(),
        JsonSchemaNull(),
      ]);
    },
    {
      description: "JSON-Schema-Schema",
      ...options,
    },
  );
}
