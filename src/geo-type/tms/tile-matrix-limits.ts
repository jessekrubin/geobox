import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export function TileMatrixLimits(options?: SchemaOptions) {
  return Type.Object(
    {
      tileMatrix: Type.String(),
      minTileRow: Type.Integer({ minimum: 0 }),
      maxTileRow: Type.Integer({ minimum: 0 }),
      minTileCol: Type.Integer({ minimum: 0 }),
      maxTileCol: Type.Integer({ minimum: 0 }),
    },
    {
      title: "TileMatrixLimits",
      description:
        "The limits for an individual tile matrix of a TileSet's TileMatrixSet, as defined in the OGC 2D TileMatrixSet and TileSet Metadata Standard",
      ...options,
    },
  );
}
