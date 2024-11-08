import { type SchemaOptions, Type } from "@sinclair/typebox";

// {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "https://schemas.stacspec.org/v1.1.0/item-spec/json-schema/licensing.json",
//   "title": "Licensing Fields",
//   "type": "object",
//   "properties": {
//   "license": {
//     "type": "string",
//       "pattern": "^[\\w\\-\\.\\+]+$"
//   }
// }
// }
export function Licensing(options?: SchemaOptions) {
  return Type.Object(
    {
      license: Type.String({
        pattern: String.raw`^[\w\-\.\+]+$`,
      }),
    },
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      additionalProperties: false,
      ...options,
    },
  );
}
