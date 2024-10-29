import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { TmsCrs } from "./crs.js";

export function TmsTilePoint(options?: SchemaOptions) {
  return Type.Object(
    {
      coordinates: Type.Array(Type.Number(), { minItems: 2, maxItems: 2 }),
      crs: Type.Optional(TmsCrs()),
      tileMatrix: Type.Optional(
        Type.String({
          description:
            "TileMatrix identifier associated with the scaleDenominator",
        }),
      ),
      scaleDenominator: Type.Optional(
        Type.Number({
          description: "Scale denominator of the tile matrix selected",
        }),
      ),
      cellSize: Type.Optional(
        Type.Number({
          description: "Cell size of the tile matrix selected",
        }),
      ),
    },
    {
      ...options,
      $schema: "https://json-schema.org/draft/2019-09/schema",
      title: "TilePoint",
      description: "A point in a tile matrix set",
    },
  );
}
