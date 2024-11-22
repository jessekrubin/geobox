import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { Coord, Coord2d } from "../coord.js";
import {
  GeometryCollection,
  GeometryCollection2d,
  GeometryCollection3d,
} from "./geometry-collection.js";
import { GeometryPrimitive } from "./geometry-primitive.js";
import { LineStringGeometry } from "./line-string-geometry.js";
import { MultiLineStringGeometry } from "./multi-line-string-geometry.js";
import { MultiPointGeometry } from "./multi-point-geometry.js";
import { MultiPolygonGeometry } from "./multi-polygon-geometry.js";
import { PointGeometry } from "./point-geometry.js";
import { PolygonGeometry } from "./polygon-geometry.js";

export function Geometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Union([
    PointGeometry(schemas),
    MultiPointGeometry(schemas),
    LineStringGeometry(schemas),
    MultiLineStringGeometry(schemas),
    PolygonGeometry(schemas),
    MultiPolygonGeometry(schemas),
    GeometryCollection(schemas),
    Type.Null(),
  ]);
  return Type.Union([GeometryPrimitive(), GeometryCollection()], {
    title: "GeoJSON Geometry",
    description: "GeoJSON Geometry",
    ...options,
  });
}

export function Geometry2d(options?: SchemaOptions) {
  return Type.Union(
    [
      GeometryPrimitive({
        coordinate: Coord2d(),
      }),
      GeometryCollection2d(),
    ],
    {
      title: "GeoJSON Geometry 2d",
      description: "GeoJSON Geometry 2d",
      ...options,
    },
  );
}

export function Geometry3d(options?: SchemaOptions) {
  return Type.Union(
    [
      GeometryPrimitive({
        coordinate: Coord(),
      }),
      GeometryCollection3d(),
    ],
    {
      title: "GeoJSON Geometry 3d",
      description: "GeoJSON Geometry 3d",
      ...options,
    },
  );
}
