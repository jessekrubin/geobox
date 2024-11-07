import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoord2d, TCoord3d, TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { GeojsonBoudingBox, GeojsonCoordinate } from "./core.js";

export function PolygonGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Polygon"),
      coordinates: Type.Array(
        Type.Array(GeojsonCoordinate(schemas && schemas.coordinate), {
          minItems: 4,
        }),
        {
          minItems: 1,
        },
      ),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      title: "GeoJSON Polygon",
      description: "GeoJSON Polygon geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

export function PolygonGeometry2d(
  schemas?: TGeometrySchemas<TCoord2d>,
  options?: SchemaOptions,
) {
  return PolygonGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    {
      title: "GeoJSON Polygon 2d",
      ...options,
    },
  );
}

export function PolygonGeometry3d(
  schemas?: TGeometrySchemas<TCoord3d>,
  options?: SchemaOptions,
) {
  return PolygonGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    { title: "GeoJSON Polygon 3d", ...options },
  );
}
