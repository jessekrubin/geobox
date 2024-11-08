import { type SchemaOptions, Type } from "@sinclair/typebox";
import { Bands } from "./bands.js";
import { Basics } from "./basics.js";
import { DataValues } from "./data-values.js";
import { Datetime } from "./datetime.js";
import { Instrument } from "./instrument.js";
import { Licensing } from "./licensing.js";
import { Provider } from "./provider.js";

// {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "https://schemas.stacspec.org/v1.1.0/item-spec/json-schema/commonjson",
//   "title": "STAC Common Metadata",
//   "type": "object",
//   "description": "This schema includes all common metadata fields.",
//   "allOf": [
//     {
//       "$ref": "basics.json"
//     },
//     {
//       "$ref": "bands.json"
//     },
//     {
//       "$ref": "datetime.json"
//     },
//     {
//       "$ref": "data-values.json"
//     },
//     {
//       "$ref": "instrument.json"
//     },
//     {
//       "$ref": "licensing.json"
//     },
//     {
//       "$ref": "provider.json"
//     }
//   ]
// }
export function Common(options?: SchemaOptions) {
  return Type.Intersect(
    [
      Basics(),
      Bands(),
      Datetime(),
      DataValues(),
      Instrument(),
      Licensing(),
      Provider(),
    ],
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "STAC Common Metadata",
      description: "This schema includes all common metadata fields.",
      ...options,
    },
  );
}

// {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "https://schemas.stacspec.org/v1.1.0/item-spec/json-schema/item.json",
//   "title": "STAC Item",
//   "type": "object",
//   "description": "This object represents the metadata for an item in a SpatioTemporal Asset Catalog.",
//   "allOf": [
//     {
//       "$ref": "#/definitions/core"
//     }
//   ],
//   "definitions": {
//     "core": {
//       "allOf": [
//         {
//           "$ref": "https://geojson.org/schema/Feature.json"
//         },
//         {
//           "oneOf": [
//             {
//               "type": "object",
//               "required": ["geometry", "bbox"],
//               "properties": {
//                 "geometry": {
//                   "$ref": "https://geojson.org/schema/Geometry.json"
//                 },
//                 "bbox": {
//                   "type": "array",
//                   "oneOf": [
//                     {
//                       "minItems": 4,
//                       "maxItems": 4
//                     },
//                     {
//                       "minItems": 6,
//                       "maxItems": 6
//                     }
//                   ],
//                   "items": {
//                     "type": "number"
//                   }
//                 }
//               }
//             },
//             {
//               "type": "object",
//               "required": ["geometry"],
//               "properties": {
//                 "geometry": {
//                   "type": "null"
//                 },
//                 "bbox": {
//                   "not": {}
//                 }
//               }
//             }
//           ]
//         },
//         {
//           "type": "object",
//           "required": ["stac_version", "id", "links", "assets", "properties"],
//           "properties": {
//             "stac_version": {
//               "title": "STAC version",
//               "type": "string",
//               "const": "1.1.0"
//             },
//             "stac_extensions": {
//               "title": "STAC extensions",
//               "type": "array",
//               "uniqueItems": true,
//               "items": {
//                 "title": "Reference to a JSON Schema",
//                 "type": "string",
//                 "format": "iri"
//               }
//             },
//             "id": {
//               "title": "Provider ID",
//               "description": "Provider item ID",
//               "type": "string",
//               "minLength": 1
//             },
//             "links": {
//               "$ref": "#/definitions/links"
//             },
//             "assets": {
//               "$ref": "#/definitions/assets"
//             },
//             "properties": {
//               "allOf": [
//                 {
//                   "$ref": "common.json"
//                 },
//                 {
//                   "anyOf": [
//                     {
//                       "required": ["datetime"],
//                       "properties": {
//                         "datetime": {
//                           "not": {
//                             "type": "null"
//                           }
//                         }
//                       }
//                     },
//                     {
//                       "required": ["datetime", "start_datetime", "end_datetime"]
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//           "$comment": "Rules enforcement for STAC Item",
//           "allOf": [
//             {
//               "if": {
//                 "properties": {
//                   "links": {
//                     "contains": {
//                       "required": ["rel"],
//                       "properties": {
//                         "rel": {
//                           "const": "collection"
//                         }
//                       }
//                     }
//                   }
//                 }
//               },
//               "then": {
//                 "required": ["collection"],
//                 "properties": {
//                   "collection": {
//                     "title": "Collection ID",
//                     "description": "The ID of the STAC Collection this Item references to.",
//                     "type": "string",
//                     "minLength": 1
//                   }
//                 }
//               },
//               "else": {
//                 "properties": {
//                   "collection": {
//                     "not": {}
//                   }
//                 }
//               }
//             },
//             {
//               "$comment": "The if-then-else below checks whether the bands field is given in assets or not. If not, allows bands in properties (then), otherwise, disallows bands in properties (else).",
//               "if": {
//                 "$comment": "If there is no asset with bands...",
//                 "required": ["assets"],
//                 "properties": {
//                   "assets": {
//                     "type": "object",
//                     "additionalProperties": {
//                       "properties": {
//                         "bands": false
//                       }
//                     }
//                   }
//                 }
//               },
//               "then": {
//                 "$comment": "... then bands are not allowed in properties...",
//                 "properties": {
//                   "properties": {
//                     "properties": {
//                       "bands": false
//                     }
//                   }
//                 }
//               },
//               "else": {
//                 "$comment": "... otherwise bands are allowed in properties.",
//                 "properties": {
//                   "properties": {
//                     "$ref": "bands.json"
//                   }
//                 }
//               }
//             }
//           ]
//         }
//       ]
//     },
//     "links": {
//       "title": "Item links",
//       "description": "Links to item relations",
//       "type": "array",
//       "items": {
//         "$ref": "#/definitions/link"
//       }
//     },
//     "link": {
//       "allOf": [
//         {
//           "type": "object",
//           "required": ["rel", "href"],
//           "properties": {
//             "href": {
//               "title": "Link reference",
//               "type": "string",
//               "format": "iri-reference",
//               "minLength": 1
//             },
//             "rel": {
//               "title": "Link relation type",
//               "type": "string",
//               "minLength": 1
//             },
//             "type": {
//               "title": "Link type",
//               "type": "string"
//             },
//             "title": {
//               "title": "Link title",
//               "type": "string"
//             },
//             "method": {
//               "title": "Link method",
//               "type": "string",
//               "pattern": "^[A-Z]+$",
//               "default": "GET"
//             },
//             "headers": {
//               "title": "Link headers",
//               "type": "object",
//               "additionalProperties": {
//                 "oneOf": [
//                   {
//                     "type": "string"
//                   },
//                   {
//                     "type": "array",
//                     "items": {
//                       "type": "string"
//                     }
//                   }
//                 ]
//               }
//             },
//             "body": {
//               "title": "Link body",
//               "$comment": "Any type is allowed."
//             }
//           },
//           "$comment": "Link with relationship `self` must be absolute URI",
//           "if": {
//             "properties": {
//               "rel": {
//                 "const": "self"
//               }
//             }
//           },
//           "then": {
//             "properties": {
//               "href": {
//                 "format": "iri"
//               }
//             }
//           }
//         },
//         {
//           "$ref": "common.json"
//         }
//       ]
//     },
//     "assets": {
//       "title": "Asset links",
//       "description": "Links to assets",
//       "type": "object",
//       "additionalProperties": {
//         "$ref": "#/definitions/asset"
//       }
//     },
//     "asset": {
//       "allOf": [
//         {
//           "type": "object",
//           "required": ["href"],
//           "properties": {
//             "href": {
//               "title": "Asset reference",
//               "type": "string",
//               "format": "iri-reference",
//               "minLength": 1
//             },
//             "title": {
//               "title": "Asset title",
//               "type": "string"
//             },
//             "description": {
//               "title": "Asset description",
//               "type": "string"
//             },
//             "type": {
//               "title": "Asset type",
//               "type": "string"
//             },
//             "roles": {
//               "title": "Asset roles",
//               "type": "array",
//               "items": {
//                 "type": "string"
//               }
//             }
//           }
//         },
//         {
//           "$ref": "common.json"
//         }
//       ]
//     }
//   }
// }
export function ItemLink(options?: SchemaOptions) {
  return Type.Object(
    {
      href: Type.String({
        format: "iri-reference",
        minLength: 1,
        title: "Link reference",
      }),
      rel: Type.String({
        minLength: 1,
        title: "Link relation type",
      }),
      type: Type.Optional(
        Type.String({
          title: "Link type",
        }),
      ),
      title: Type.Optional(
        Type.String({
          title: "Link title",
        }),
      ),
      method: Type.Optional(
        Type.String({
          pattern: "^[A-Z]+$",
          default: "GET",
          title: "Link method",
        }),
      ),
      headers: Type.Optional(
        Type.Record(
          Type.String(),
          Type.Union([Type.String(), Type.Array(Type.String())]),
          {
            title: "Link headers",
          },
        ),
      ),
      body: Type.Optional(Type.Any())
    },
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      additionalProperties: false,
      $comment: "Link with relationship `self` must be absolute URI",
      ...options,
    },
  );
}

export function Item(options?: SchemaOptions) {
  return Type.Object(
    {},
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      additionalProperties: false,
      ...options,
    },
  );
}
