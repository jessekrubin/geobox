import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { Tms2dBoundingBox } from "./2d-bounding-box.js";
import { TmsCrs } from "./crs.js";
import { TmsDataType } from "./data-type.js";
import { TmsPropertiesSchema } from "./properties-schema.js";
import { TmsStyle } from "./style.js";
import { TmsTimestamp } from "./timestamp.js";
import { TmsLink } from "./tms-link.js";

export function TmsGeospatialData(options?: TSchemaOptions) {
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
        Type.String({
          description:
            "Unordered list of one or more commonly used or formalized word(s) or phrase(s) used to describe this layer",
        }),
      ),
      id: Type.String({
        description:
          "Unique identifier of the Layer. Implementation of 'identifier'",
      }),
      dataType: TmsDataType({
        description: "Type of data represented in the layer",
      }),
      geometryDimension: Type.Optional(
        Type.Integer({
          description:
            "The geometry dimension of the features shown in this layer (0: points, 1: curves, 2: surfaces, 3: solids), unspecified: mixed or unknown",
          minimum: 0,
          maximum: 3,
        }),
      ),
      featureType: Type.Optional(
        Type.String({
          description:
            "Feature type identifier. Only applicable to layers of datatype 'geometries'",
        }),
      ),
      pointOfContact: Type.Optional(
        Type.String({
          description:
            "Useful information to contact the authors or custodians for the layer (e.g. e-mail address, a physical address,  phone numbers, etc)",
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
      publisher: Type.Optional(
        Type.String({
          description:
            "Organization or individual responsible for making the layer available",
        }),
      ),
      theme: Type.Optional(
        Type.String({
          description: "Category where the layer can be grouped",
        }),
      ),
      crs: Type.Optional(
        TmsCrs({ description: "Coordinate Reference System (CRS)" }),
      ),
      epoch: Type.Optional(
        Type.Number({
          description: "Epoch of the Coordinate Reference System (CRS)",
        }),
      ),
      minScaleDenominator: Type.Optional(
        Type.Number({
          description: "Minimum scale denominator for usage of the layer",
        }),
      ),
      maxScaleDenominator: Type.Optional(
        Type.Number({
          description: "Maximum scale denominator for usage of the layer",
        }),
      ),
      minCellSize: Type.Optional(
        Type.Number({
          description: "Minimum cell size for usage of the layer",
        }),
      ),
      maxCellSize: Type.Optional(
        Type.Number({
          description: "Maximum cell size for usage of the layer",
        }),
      ),
      maxTileMatrix: Type.Optional(
        Type.String({
          description:
            "TileMatrix identifier associated with the minScaleDenominator",
        }),
      ),
      minTileMatrix: Type.Optional(
        Type.String({
          description:
            "TileMatrix identifier associated with the maxScaleDenominator",
        }),
      ),
      boundingBox: Type.Optional(
        Tms2dBoundingBox({
          description: "Minimum bounding rectangle surrounding the layer",
        }),
      ),
      created: Type.Optional(
        TmsTimestamp({
          description: "When the layer was first produced",
        }),
      ),
      updated: Type.Optional(
        TmsTimestamp({
          description: "Last layer change/revision",
        }),
      ),
      style: Type.Optional(TmsStyle()),
      geoDataClasses: Type.Optional(
        Type.Array(
          Type.String({
            description:
              "URI identifying a class of data contained in this layer (useful to determine compatibility with styles or processes)",
          }),
        ),
      ),
      propertiesSchema: Type.Optional(
        TmsPropertiesSchema({
          description:
            "Properties represented by the features in this layer. Can be the attributes of a feature dataset (datatype=geometries) or the rangeType of a coverage (datatype=coverage)",
        }),
      ),
      links: Type.Array(TmsLink()),
    },
    {
      $schema: "https://json-schema.org/draft/2019-09/schema",
      title: "GeospatialData",
      description: "Geospatial data",
      ...options,
    },
  );
}
