import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { JsonSchema } from "../../json-schema/index.js";

export function TmsPropertiesSchema(options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("object"),
      required: Type.Optional(Type.Array(Type.String(), { minItems: 1 })),
      properties: Type.Object(
        {},
        {
          additionalProperties: JsonSchema(),
        },
      ),
    },
    {
      ...options,
      $schema: "https://json-schema.org/draft/2019-09/schema",
      description:
        "Attributes of the features or rangetypes of a coverage. Defined by a subset of the JSON Schema for the properties of a feature",
    },
  );
}

// =============================================================================
// Version 1
// =============================================================================
//
// export function TmsPropertiesSchema(options?: SchemaOptions) {
//   return Type.Object(
//     {
//
//       type: Type.Literal("object"),
//       required: Type.Optional(Type.Array(Type.String(), { minItems: 1 })),
//       properties: Type.Object({}, {
//         additionalProperties: Type.Object({
//           title: Type.Optional(Type.String()),
//           description: Type.Optional(Type.String()),
//           type: Type.Union([
//             Type.Literal("array"),
//             Type.Literal("boolean"),
//             Type.Literal("integer"),
//             Type.Literal("null"),
//             Type.Literal("number"),
//             Type.Literal("object"),
//             Type.Literal("string"),
//           ]),
//           enum: Type.Array(Type.Any(), { minItems: 1, uniqueItems: true }),
//           format: Type.Optional(Type.String()),
//           contentMediaType: Type.Optional(Type.String()),
//           maximum: Type.Optional(Type.Number()),
//           exclusiveMaximum: Type.Optional(Type.Number()),
//           minimum: Type.Optional(Type.Number()),
//           exclusiveMinimum: Type.Optional(Type.Number()),
//           pattern: Type.Optional(Type.String({ format: "regex" })),
//           maxItems: Type.Optional(Type.Integer({ minimum: 0 })),
//           minItems: Type.Optional(Type.Integer({ minimum: 0, default: 0 })),
//           observedProperty: Type.Optional(Type.String()),
//           observedPropertyURI: Type.Optional(Type.String({ format: "uri" })),
//           uom: Type.Optional(Type.String()),
//           uomURI: Type.Optional(Type.String({ format: "uri" })),
//         })
//       })
//     },
//     {
//       ...options,
//       $schema: "https://json-schema.org/draft/2019-09/schema",
//       description:
//         "Attributes of the features or rangetypes of a coverage. Defined by a subset of the JSON Schema for the properties of a feature",
//     },
//   );
// }
