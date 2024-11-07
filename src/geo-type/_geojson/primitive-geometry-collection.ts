import type { SchemaOptions} from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

import type { TBBoxSchema } from "../bbox.js";

/**
 * GeoJSON GeometryCollection of ONLY primitive geometries
 * @param schemas
 * @param options {SchemaOptions} typebox schema options
 * @returns geojson geometry collection of primitives
 */
import type { TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { BBox } from "../bbox.js";
import { GeometryPrimitive } from "./geometry-primitive.js";

export function PrimitiveGeometryCollection<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
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
