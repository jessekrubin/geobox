import { Type } from "@sinclair/typebox";

export function GeoJSONType() {
  return Type.Union(
    [
      Type.Literal("Feature"),
      Type.Literal("FeatureCollection"),
      Type.Literal("GeometryCollection"),
      Type.Literal("Point"),
      Type.Literal("LineString"),
      Type.Literal("Polygon"),
      Type.Literal("MultiPoint"),
      Type.Literal("MultiLineString"),
      Type.Literal("MultiPolygon"),
    ],
    {
      title: "GeoJSON type",
      description:
        "GeoJSON type property: Feature, FeatureCollection, GeometryCollection, Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon",
    },
  );
}
