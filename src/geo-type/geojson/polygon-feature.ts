import type { TSchemaOptions, TSchema } from "typebox";
import { Type } from "typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type {
  TFeatureSchemas,
  TFeatureSchemas2d,
  TFeatureSchemas3d,
} from "./types.js";
import { Coord2d, Coord3d } from "../coord.js";
import { FeatureId, FeatureProperties, GeojsonBoudingBox } from "./core.js";
import { PolygonGeometry } from "./polygon-geometry.js";

export function PolygonFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: TSchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: PolygonGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
    },
    options,
  );
}

export function PolygonFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: TSchemaOptions) {
  return PolygonFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export function PolygonFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: TSchemaOptions) {
  return PolygonFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export { PolygonFeature as Polygon };
