import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { JSON_SCHEMA_OPTIONS_SCHEMA } from "./common.js";

export function JsonSchemaNull(options?: TSchemaOptions) {
  return Type.Interface(
    [
      JSON_SCHEMA_OPTIONS_SCHEMA,
      Type.Object(
        {
          type: Type.Literal("null"),
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
