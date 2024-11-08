//{
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "https://schemas.stacspec.org/v1.1.0/item-spec/json-schema/bands.json",
//   "title": "Bands Field",
//   "type": "object",
//   "properties": {
//     "bands": {
//       "type": "array",
//       "items": {
//         "type": "object",
//         "properties": {
//           "name": {
//             "type": "string"
//           }
//         },
//         "allOf": [
//           {
//             "$ref": "common.json"
//           }
//         ]
//       }
//     }
//   }
// }
import { type SchemaOptions, Type } from "@sinclair/typebox";

export function Bands(options?: SchemaOptions) {
  return Type.Object(
    {
      bands: Type.Array(
        Type.Object(
          {
            name: Type.String(),
          },
          {
            additionalProperties: false,
          },
        ),
      ),
    },
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "Bands Field",
      ...options,
    },
  );
}
