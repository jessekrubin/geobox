import { Type } from "typebox";
import { FeatureCollection } from "./feature-collection.js";
import { Feature } from "./feature.js";
import { GeometryCollection } from "./geometry-collection.js";
import { LineStringGeometry } from "./line-string-geometry.js";
import { MultiLineStringGeometry } from "./multi-line-string-geometry.js";
import { MultiPointGeometry } from "./multi-point-geometry.js";
import { MultiPolygonGeometry } from "./multi-polygon-geometry.js";
import { PointGeometry } from "./point-geometry.js";
import { PolygonGeometry } from "./polygon-geometry.js";

export function GeoJSON() {
  return Type.Union(
    [
      Feature(),
      FeatureCollection(),
      GeometryCollection(),
      PointGeometry(),
      LineStringGeometry(),
      PolygonGeometry(),
      MultiPointGeometry(),
      MultiLineStringGeometry(),
      MultiPolygonGeometry(),
    ],
    {
      title: "GeoJSON",
      description: "GeoJSON",
    },
  );
}
