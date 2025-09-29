import type { TSchema, TSchemaOptions } from "typebox";
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
import { PointGeometry } from "./point-geometry.js";

export function PointFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: TSchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: PointGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
    },
    options,
  );
}

export { PointFeature as Point };

/**
 * =====================================================
 * 2d and 3d feature variants
 * =====================================================
 */
export function PointFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: TSchemaOptions) {
  return PointFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export { PointFeature2d as Point2d };

export function PointFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: TSchemaOptions) {
  return PointFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export { PointFeature3d as Point3d };
