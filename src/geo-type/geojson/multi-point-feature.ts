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
import { MultiPointGeometry } from "./multi-point-geometry.js";

export function MultiPointFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: TSchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiPointGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
    },
    options,
  );
}

export { MultiPointFeature as MultiPoint };

export function MultiPointFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: TSchemaOptions) {
  return MultiPointFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export { MultiPointFeature2d as MultiPoint2d };

export function MultiPointFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: TSchemaOptions) {
  return MultiPointFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export { MultiPointFeature3d as MultiPoint3d };
