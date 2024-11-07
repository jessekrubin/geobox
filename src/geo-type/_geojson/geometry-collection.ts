import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { BBox } from "../bbox.js";
import { Coord } from "../coord.js";
import { LineStringGeometry } from "./line-string-geometry.js";
import { MultiLineStringGeometry } from "./multi-line-string-geometry.js";
import { MultiPointGeometry } from "./multi-point-geometry.js";
import { MultiPolygonGeometry } from "./multi-polygon-geometry.js";
import { PointGeometry } from "./point-geometry.js";
import { PolygonGeometry } from "./polygon-geometry.js";
import {
  PrimitiveGeometryCollection
} from "./primitive-geometry-collection.js";

export function GeometryCollection<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("GeometryCollection"),
      geometries: Type.Array(
        Type.Union([
          PrimitiveGeometryCollection(schemas),
          PointGeometry(schemas),
          MultiPointGeometry(schemas),
          LineStringGeometry(schemas),
          MultiLineStringGeometry(schemas),
          PolygonGeometry(schemas),
          MultiPolygonGeometry(schemas),
        ]),
      ),
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

export function GeometryCollection2d(options?: SchemaOptions) {
  return GeometryCollection(
    {
      coordinate: Coord(),
    },
    {
      title: "GeoJSON GeometryCollection 2d",
      ...options,
    },
  );
}

export function GeometryCollection3d(options?: SchemaOptions) {
  return GeometryCollection(
    {
      coordinate: Coord(),
    },
    {
      title: "GeoJSON GeometryCollection 3d",
      ...options,
    },
  );
}
