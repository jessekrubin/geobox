import type { SchemaOptions} from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { TBBoxSchema } from "../bbox.js";
import type { TCoordinateSchema } from "../coord.js";
import type { TGeometrySchemas } from "./types.js";
import { GeojsonBoudingBox, GeojsonCoordinate } from "./core.js";

export function MultiPointGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("MultiPoint"),
      coordinates: Type.Array(
        GeojsonCoordinate(schemas && schemas.coordinate),
        {
          minItems: 1,
          title: "MultiPoint coordinates",
        },
      ),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      title: "GeoJSON MultiPoint",
      description: "GeoJSON MultiPoint geometry",
      additionalProperties: false,
      ...options,
    },
  );
}
