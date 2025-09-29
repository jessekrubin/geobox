import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { BBox } from "../bbox.js";
import { GeometryPrimitive } from "./geometry-primitive.js";

/**
 * GeoJSON GeometryCollection of ONLY primitive geometries
 * @param schemas
 * @param options {Options} typebox schema options
 * @returns geojson geometry collection of primitives
 */

export function PrimitiveGeometryCollection<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: TSchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("GeometryCollection"),
      geometries: Type.Array(GeometryPrimitive(schemas)),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON GeometryCollection",
      description: "GeoJSON GeometryCollection",
      additionalProperties: false,
      ...options,
    },
  );
}
