import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { JSON_SCHEMA_OPTIONS_SCHEMA } from "./common.js";

export function JsonSchemaNumber(options?: TSchemaOptions) {
  return Type.Interface(
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
    {},
    {
      description: "JSON-Schema-Schema",
      ...options,
    },
  );
}
