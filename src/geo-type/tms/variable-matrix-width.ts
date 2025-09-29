import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";

export function VariableMatrixWidth(options?: TSchemaOptions) {
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
