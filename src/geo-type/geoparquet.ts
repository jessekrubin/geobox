import { Type } from "@sinclair/typebox";
import { BBox } from "./bbox.js";

export function GeoparquetColumn_v1_1_0() {
  return Type.Object(
    {
      encoding: Type.Union([
        Type.Literal("WKB"),
        Type.Literal("point"),
        Type.Literal("linestring"),
        Type.Literal("polygon"),
        Type.Literal("multipoint"),
        Type.Literal("multilinestring"),
        Type.Literal("multipolygon"),
        Type.String({
          pattern:
            "^(WKB|point|linestring|polygon|multipoint|multilinestring|multipolygon)$",
        }),
      ]),
      //                "pattern": "^(GeometryCollection|(Multi)?(Point|LineString|Polygon))( Z)?$"
      geometry_types: Type.Array(
        Type.Union([
          Type.String({
            pattern:
              "^(Point|LineString|Polygon|MultiPoint|MultiLineString|MultiPolygon|GeometryCollection|(Multi)?(Point|LineString|Polygon))( Z)?$",
          }),
          // literals
          Type.Literal("GeometryCollection"),
          Type.Literal("Point"),
          Type.Literal("LineString"),
          Type.Literal("Polygon"),
          Type.Literal("MultiPoint"),
          Type.Literal("MultiLineString"),
          Type.Literal("MultiPolygon"),
          Type.Literal("GeometryCollection Z"),
          Type.Literal("Point Z"),
          Type.Literal("LineString Z"),
          Type.Literal("Polygon Z"),
          Type.Literal("MultiPoint Z"),
          Type.Literal("MultiLineString Z"),
          Type.Literal("MultiPolygon Z"),
        ]),
      ),
      // TODO: projjson schema...
      crs: Type.Optional(Type.Any()),
      edges: Type.Optional(
        Type.Union([Type.Literal("planar"), Type.Literal("spherical")]),
      ),
      orientation: Type.Optional(Type.Literal("counterclockwise")),
      bbox: Type.Optional(BBox()),

      epoch: Type.Optional(Type.Number()),
      covering: Type.Optional(
        Type.Object({
          bbox: Type.Object({
            xmin: Type.Tuple(
              [Type.String({ minLength: 1 }), Type.Literal("xmin")],
              {
                minItems: 2,
                maxItems: 2,
              },
            ),
            xmax: Type.Tuple(
              [Type.String({ minLength: 1 }), Type.Literal("xmax")],
              {
                minItems: 2,
                maxItems: 2,
              },
            ),
            ymin: Type.Tuple(
              [Type.String({ minLength: 1 }), Type.Literal("ymin")],
              {
                minItems: 2,
                maxItems: 2,
              },
            ),
            ymax: Type.Tuple(
              [Type.String({ minLength: 1 }), Type.Literal("ymax")],
              {
                minItems: 2,
                maxItems: 2,
              },
            ),
          }),
        }),
      ),
    },
    {
      additionalProperties: false,
    },
  );
}

export function Geoparquet_v1_1_1() {
  return Type.Object({
    version: Type.Const("1.1.0"),
    primary_column: Type.String({
      minLength: 1,
    }),
    columns: Type.Record(Type.String(), GeoparquetColumn_v1_1_0()),
  });
}

export function Geoparquet() {
  return Geoparquet_v1_1_1();
}
