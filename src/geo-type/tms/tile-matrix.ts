import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { Tms2dPoint } from "./2d-point.js";
import { VariableMatrixWidth } from "./variable-matrix-width.js";

export function TileMatrix(options?: TSchemaOptions) {
  return Type.Object(
    {
      title: Type.Optional(
        Type.String({
          description:
            "Title of this tile matrix, normally used for display to a human",
        }),
      ),
      description: Type.Optional(
        Type.String({
          description:
            "Brief narrative description of this tile matrix set, normally available for display to a human",
        }),
      ),
      keywords: Type.Optional(
        Type.Array(
          Type.String({
            description:
              "Unordered list of one or more commonly used or formalized word(s) or phrase(s) used to describe this dataset",
          }),
        ),
      ),
      id: Type.String({
        description:
          "Identifier selecting one of the scales defined in the TileMatrixSet and representing the scaleDenominator the tile. Implementation of 'identifier'",
      }),
      scaleDenominator: Type.Number({
        description: "Scale denominator of this tile matrix",
      }),
      cellSize: Type.Number({
        description: "Cell size of this tile matrix",
      }),
      cornerOfOrigin: Type.String({
        description:
          "The corner of the tile matrix (_topLeft_ or _bottomLeft_) used as the origin for numbering tile rows and columns. This corner is also a corner of the (0, 0) tile.",
        enum: ["topLeft", "bottomLeft"],
        default: "topLeft",
      }),
      pointOfOrigin: Tms2dPoint(),
      tileWidth: Type.Number({
        description: "Width of each tile of this tile matrix in pixels",
        format: "integer",
        minimum: 1,
        multipleOf: 1,
      }),
      tileHeight: Type.Number({
        description: "Height of each tile of this tile matrix in pixels",
        format: "integer",
        minimum: 1,
        multipleOf: 1,
      }),
      matrixHeight: Type.Number({
        description: "Width of the matrix (number of tiles in width)",
        format: "integer",
        minimum: 1,
        multipleOf: 1,
      }),
      matrixWidth: Type.Number({
        description: "Height of the matrix (number of tiles in height)",
        format: "integer",
        minimum: 1,
        multipleOf: 1,
      }),
      variableMatrixWidths: Type.Array(VariableMatrixWidth()),
    },
    {
      title: "TileMatrix",
      description:
        "A tile matrix, usually corresponding to a particular zoom level of a TileMatrixSet.",
      ...options,
    },
  );
}
