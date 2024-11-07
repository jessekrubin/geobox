import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { BBox } from "../bbox.js";
import { LineStringGeometry } from "./line-string-geometry.js";
import { MultiLineStringGeometry } from "./multi-line-string-geometry.js";
import { MultiPointGeometry } from "./multi-point-geometry.js";
import { MultiPolygonGeometry } from "./multi-polygon-geometry.js";
import { PointGeometry } from "./point-geometry.js";

import { PolygonGeometry } from "./polygon-geometry.js";

export function GeometryCollectionRecursive(
  schemas?: TGeometrySchemas<TCoordinateSchema, TBBoxSchema>,
  options?: SchemaOptions,
) {
  const s = Type.Recursive((This) =>
    Type.Object(
      {
        type: Type.Literal("GeometryCollection"),
        geometries: Type.Array(
          Type.Union([
            PointGeometry(schemas),
            MultiPointGeometry(schemas),
            LineStringGeometry(schemas),
            MultiLineStringGeometry(schemas),
            PolygonGeometry(schemas),
            MultiPolygonGeometry(schemas),
            This,
          ]),
        ),
        bbox: Type.Optional(BBox()),
      },
      {
        title: "GeoJSON GeometryCollection",
        description: "GeoJSON GeometryCollection",
        ...options,
      },
    ),
  );
  return s;
}
