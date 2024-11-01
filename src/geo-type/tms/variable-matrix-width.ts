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
