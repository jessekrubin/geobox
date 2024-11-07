import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { LineStringGeometry } from "./line-string-geometry.js";
import { MultiLineStringGeometry } from "./multi-line-string-geometry.js";
import { MultiPointGeometry } from "./multi-point-geometry.js";
import { MultiPolygonGeometry } from "./multi-polygon-geometry.js";
import { PointGeometry } from "./point-geometry.js";
import { PolygonGeometry } from "./polygon-geometry.js";

export function GeometryPrimitive<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Union(
    [
      PointGeometry(schemas),
      LineStringGeometry(schemas),
      PolygonGeometry(schemas),
      MultiPointGeometry(schemas),
      MultiLineStringGeometry(schemas),
      MultiPolygonGeometry(schemas),
    ],
    {
      title: "GeoJSON Primitive Geometry",
      description: "GeoJSON Primitive Geometry",
      ...options,
    },
  );
}
