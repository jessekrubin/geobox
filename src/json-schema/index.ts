import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { JsonSchemaBoolean } from "./boolean.js";
import { JSON_SCHEMA_OPTIONS_SCHEMA } from "./common.js";
import { JsonSchemaInteger } from "./integer.js";
import { JsonSchemaNull } from "./null.js";
import { JsonSchemaNumber } from "./number.js";
import { JsonSchemaString } from "./string.js";

export function JsonSchema(options?: TSchemaOptions) {
  return Type.Cyclic(
    {
      JsonSchema: Type.Union(
        [
          Type.Interface(
            [
              JSON_SCHEMA_OPTIONS_SCHEMA,
              Type.Object({
                type: Type.Literal("object"),
                properties: Type.Object(
                  {},
                  {
                    additionalProperties: Type.Optional(Type.Ref("JsonSchema")),
                  },
                ),
              }),
            ],
            {},
          ),
          Type.Interface(
            [
              JSON_SCHEMA_OPTIONS_SCHEMA,
              Type.Object({
                type: Type.Literal("array"),
                items: Type.Optional(Type.Ref("JsonSchema")),
                minItems: Type.Optional(Type.Integer()),
                maxItems: Type.Optional(Type.Integer()),
                uniqueItems: Type.Optional(Type.Boolean()),
              }),
            ],
            {},
          ),
          JsonSchemaString(),
          JsonSchemaNumber(),
          JsonSchemaInteger(),
          JsonSchemaBoolean(),
          JsonSchemaNull(),
        ],
        {
          description: "JSON-Schema-Schema",
          ...options,
        },
      ),
    },
    "JsonSchema",
  );
}
