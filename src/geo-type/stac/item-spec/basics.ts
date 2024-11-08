//{
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "https://schemas.stacspec.org/v1.1.0/item-spec/json-schema/basics.json",
//   "title": "Basic Descriptive Fields",
//   "type": "object",
//   "properties": {
//     "title": {
//       "title": "Title",
//       "description": "A human-readable title describing the entity.",
//       "type": "string"
//     },
//     "description": {
//       "title": "Description",
//       "description": "Detailed multi-line description to fully explain the entity.",
//       "type": "string",
//       "minLength": 1
//     },
//     "keywords": {
//       "title": "Keywords",
//       "description": "List of keywords describing the entity.",
//       "type": "array",
//       "items": {
//         "type": "string"
//       }
//     },
//     "roles": {
//       "title": "Roles",
//       "type": "array",
//       "items": {
//         "type": "string"
//       }
//     }
//   }
// }
import { type SchemaOptions, Type } from "@sinclair/typebox";

/**
 *
 * @param options
 * @constructor
 */
export function Basics(options?: SchemaOptions) {
  return Type.Partial(
    Type.Object(
      {
        title: Type.String(),
        description: Type.String({
          minLength: 1,
          title: "Description",
          description:
            "Detailed multi-line description to fully explain the entity.",
        }),
        keywords: Type.Array(Type.String(), {
          title: "Keywords",
          description: "List of keywords describing the entity.",
        }),
        roles: Type.Array(Type.String()),
      },
      {
        $schema: "http://json-schema.org/draft-07/schema#",
        additionalProperties: false,
        ...options,
      },
    ),
  );
}
