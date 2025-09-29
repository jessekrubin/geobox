import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { JSON_SCHEMA_OPTIONS_SCHEMA } from "./common.js";

export function JsonSchemaInteger(options?: TSchemaOptions) {
  return Type.Interface(
    [
      JSON_SCHEMA_OPTIONS_SCHEMA,
      Type.Object(
        {
          type: Type.Literal("integer"),
          maximum: Type.Optional(Type.Integer()),
          exclusiveMaximum: Type.Optional(Type.Integer()),
          minimum: Type.Optional(Type.Integer()),
          exclusiveMinimum: Type.Optional(Type.Integer()),
        },
        options,
      ),
    ],
    {},
    {
      description: "JSON-Schema-Schema",
      ...options,
    },
  );
}
