// {
//   "$schema": "https://json-schema.org/draft/2019-09/schema",
//   "description": "Variable Matrix Width data structure",
//   "type": "object",
//   "required": ["coalesce", "minTileRow", "maxTileRow"],
//   "properties": {
//     "coalesce": {
//       "description": "Number of tiles in width that coalesce in a single tile for these rows",
//       "type": "number",
//       "format": "integer",
//       "minimum": 2,
//       "multipleOf": 1
//     },
//     "minTileRow": {
//       "description": "First tile row where the coalescence factor applies for this tilematrix",
//       "type": "number",
//       "format": "integer",
//       "minimum": 0,
//       "multipleOf": 1
//     },
//     "maxTileRow": {
//       "description": "Last tile row where the coalescence factor applies for this tilematrix",
//       "type": "number",
//       "format": "integer",
//       "minimum": 0,
//       "multipleOf": 1
//     }
//   }
// }

import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export function VariableMatrixWidth(options?: SchemaOptions) {
  return Type.Object(
    {
      coalesce: Type.Integer({ minimum: 2 }),
      minTileRow: Type.Integer({ minimum: 0 }),
      maxTileRow: Type.Integer({ minimum: 0 }),
    },
    {
      title: "VariableMatrixWidth",
      description: "Variable Matrix Width data structure",
      ...options,
    },
  );
}
