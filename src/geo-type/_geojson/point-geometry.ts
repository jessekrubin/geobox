import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoord2d, TCoord3d, TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { GeojsonBoudingBox, GeojsonCoordinate } from "./core.js";

/**
 * GeoJSON Point geometry schema builder
 * @param schemas object with coordinate and bbox schemas
 * @param options schema options from typebox
 * @returns geojson point geometry typebox schema
 */
export function PointGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Point"),
      coordinates: GeojsonCoordinate(schemas && schemas.coordinate),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      title: "GeoJSON Point",
      description: "GeoJSON Point geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

/** */



export function PointGeometry2d(
  schemas?: TGeometrySchemas<TCoord2d>,
  options?: SchemaOptions,
) {
  return PointGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    {
      title: "GeoJSON Point 2d",
      ...options,
    },
  );
}

export function PointGeometry3d(
  schemas?: TGeometrySchemas<TCoord3d>,
  options?: SchemaOptions,
) {
  return PointGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    {
      title: "GeoJSON Point 3d",
      ...options,
    },
  );
}
