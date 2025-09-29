import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { GeojsonBoudingBox, GeojsonCoordinate } from "./core.js";

export function MultiPolygonGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: TSchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("MultiPolygon"),
      coordinates: Type.Array(
        Type.Array(
          Type.Array(GeojsonCoordinate(schemas && schemas.coordinate), {
            minItems: 4,
          }),
          {
            minItems: 1,
          },
        ),
        {
          minItems: 1,
        },
      ),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      title: "GeoJSON MultiPolygon",
      description: "GeoJSON MultiPolygon geometry",
      additionalProperties: false,
      ...options,
    },
  );
}
