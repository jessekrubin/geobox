import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { Tms2dBoundingBox } from "./2d-bounding-box.js";
import { TmsCrs } from "./crs.js";
import { TmsDataType } from "./data-type.js";
import { TmsGeospatialData } from "./geospatial-data.js";
import { TmsStyle } from "./style.js";
import { TileMatrixLimits } from "./tile-matrix-limits.js";
import { TileMatrixSet } from "./tile-matrix-set.js";
import { TmsTilePoint } from "./tile-point.js";
import { TmsTimestamp } from "./timestamp.js";
import { TmsLink } from "./tms-link.js";

export function TileSet(options?: SchemaOptions) {
  return Type.Object(
    {
      title: Type.Optional(
        Type.String({
          description: "A title for this tileset",
        }),
      ),
      description: Type.Optional(
        Type.String({
          description: "Brief narrative description of this tile set",
        }),
      ),
      keywords: Type.Optional(
        Type.Array(
          Type.String({
            description: "keywords about this tileset",
          }),
        ),
      ),
      version: Type.Optional(
        Type.String({
          description:
            "Version of the Tile Set. Changes if the data behind the tiles has been changed",
        }),
      ),
      pointOfContact: Type.Optional(
        Type.String({
          description:
            "Useful information to contact the authors or custodians for the Tile Set",
        }),
      ),
      attribution: Type.Optional(
        Type.String({
          description: "Short reference to recognize the author or provider",
        }),
      ),
      license: Type.Optional(
        Type.String({
          description: "License applicable to the tiles",
        }),
      ),
      accessConstraints: Type.Optional(
        Type.Union(
          [
            Type.Literal("unclassified"),
            Type.Literal("restricted"),
            Type.Literal("confidential"),
            Type.Literal("secret"),
            Type.Literal("topSecret"),
          ],
          {
            default: "unclassified",
          },
        ),
      ),

      mediaTypes: Type.Optional(
        Type.Array(
          Type.String({
            description: "Media types available for the tiles",
          }),
        ),
      ),
      dataType: TmsDataType(),
      tileMatrixSetLimits: Type.Optional(Type.Array(TileMatrixLimits())),
      crs: TmsCrs(),
      epoch: Type.Optional(
        Type.Number({
          description: "Epoch of the Coordinate Reference System (CRS)",
        }),
      ),
      boundingBox: Type.Optional(Tms2dBoundingBox()),

      created: Type.Optional(TmsTimestamp()),
      updated: Type.Optional(TmsTimestamp()),
      layers: Type.Array(TmsGeospatialData()),
      style: Type.Optional(TmsStyle()),
      centerPoint: Type.Optional(TmsTilePoint()),
      tileMatrixSet: Type.Optional(TileMatrixSet()),
      tileMatrixSetURI: Type.Optional(
        Type.String({
          format: "uri",
          description:
            "Reference to a Tile Matrix Set on an official source for Tile Matrix Sets such as the OGC-NA definition server (http://www.opengis.net/def/tms). Required if the tile matrix set is registered on an open official source.",
        }),
      ),
      links: Type.Optional(Type.Array(TmsLink())),
    },
    {
      title: "Tile Set Metadata",
      description:
        "A resource describing a tileset based on the OGC TileSet Metadata Standard. At least one of the 'TileMatrixSet',  or a link with 'rel' http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme",

      ...options,
    },
  );
}
