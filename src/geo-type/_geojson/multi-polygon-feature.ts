import type { SchemaOptions, TSchema } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type {
  TFeatureSchemas,
  TFeatureSchemas2d,
  TFeatureSchemas3d
} from "./types.js";
import { Coord2d, Coord3d } from "../coord.js";
import { FeatureId, FeatureProperties, GeojsonBoudingBox } from "./core.js";
import { MultiPolygonGeometry } from "./multi-polygon-geometry.js";

export function MultiPolygonFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiPolygonGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
    },
    {
      title: "GeoJSON MultiPolygon Feature",
      ...options,
    },
  );
}

export { MultiPolygonFeature as MultiPolygon };

export function MultiPolygonFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: SchemaOptions) {
  return MultiPolygonFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export function MultiPolygonFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: SchemaOptions) {
  return MultiPolygonFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export { MultiPolygonFeature2d as MultiPolygon2d };
export { MultiPolygonFeature3d as MultiPolygon3d };
