// {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "https://schemas.stacspec.org/v1.1.0/item-spec/json-schema/provider.json",
//   "title": "Provider Fields",
//   "type": "object",
//   "properties": {
//   "providers": {
//     "title": "Providers",
//       "type": "array",
//       "items": {
//       "type": "object",
//         "required": ["name"],
//         "properties": {
//         "name": {
//           "title": "Organization name",
//             "type": "string",
//             "minLength": 1
//         },
//         "description": {
//           "title": "Organization description",
//             "type": "string"
//         },
//         "roles": {
//           "title": "Organization roles",
//             "type": "array",
//             "items": {
//             "type": "string",
//               "enum": ["producer", "licensor", "processor", "host"]
//           }
//         },
//         "url": {
//           "title": "Organization homepage",
//             "type": "string",
//             "format": "iri"
//         }
//       }
//     }
//   }
// }
// }
import { type SchemaOptions, Type } from "@sinclair/typebox";

export function Provider(options?: SchemaOptions) {
  return Type.Object(
    {
      providers: Type.Array(
        Type.Object({
          name: Type.String({
            minLength: 1,
          }),
          description: Type.Optional(
            Type.String({
              title: "Organization description",
            }),
          ),
          roles: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Literal("producer"),
                Type.Literal("licensor"),
                Type.Literal("processor"),
                Type.Literal("host"),
              ]),
              {
                title: "Organization roles",
              },
            ),
          ),
          url: Type.Optional(
            Type.String({
              format: "iri",
              title: "Organization homepage",
            }),
          ),
        }),
      ),
    },
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      additionalProperties: false,
      ...options,
    },
  );
}
