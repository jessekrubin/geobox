import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { JSON_SCHEMA_OPTIONS_SCHEMA } from "./common.js";

export function JsonSchemaBoolean(options?: TSchemaOptions) {
  return Type.Evaluate(Type.Intersect(
    [
      JSON_SCHEMA_OPTIONS_SCHEMA,
      Type.Object(
        {
          type: Type.Literal("boolean"),
        },
        options,
      ),
    ],
    {
      description: "JSON-Schema-Schema",
      ...options,
    },
  ));
}
