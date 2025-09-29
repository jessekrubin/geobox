import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { Tms2dBoundingBox } from "./2d-bounding-box.js";
import { TmsCrs } from "./crs.js";

export function TileMatrixSet(options?: TSchemaOptions) {
  return Type.Object(
    {
      title: Type.Optional(
        Type.String({
          description:
            "Title of this tile matrix set, normally used for display to a human",
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
              "Unordered list of one or more commonly used or formalized word(s) or phrase(s) used to describe this tile matrix set",
          }),
        ),
      ),
      id: Type.Optional(
        Type.String({
          description:
            "Tile matrix set identifier. Implementation of 'identifier'",
        }),
      ),
      uri: Type.Optional(
        Type.String({
          description: "Reference to an official source for this tileMatrixSet",
          format: "uri",
        }),
      ),
      orderedAxes: Type.Optional(Type.Array(Type.String())),
      crs: TmsCrs(),
      wellKnownScaleSet: Type.Optional(
        Type.String({
          description: "Reference to a well-known scale set",
          format: "uri",
        }),
      ),

      boundingBox: Type.Optional(Tms2dBoundingBox()),
    },
    {
      title: "TileMatrixSet",
      description:
        "A definition of a tile matrix set following the Tile Matrix Set standard. For tileset metadata, such a description (in `tileMatrixSet` property) is only required for offline use, as an alternative to a link with a `http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme` relation type.",
      ...options,
    },
  );
}
