import { type TSchema, Type } from "@sinclair/typebox";
import type { TCoordinateSchema } from "../coord.js";
import type {
  TGeojsonBoundingBox,
  TGeojsonCoordinate,
  TProperties,
} from "./types.js";
import { BBox } from "../bbox.js";
import { Coord } from "../coord.js";

export function GeojsonCoordinate<
  T extends TCoordinateSchema | undefined = undefined,
>(schema?: T) {
  return (schema === undefined ? Coord() : schema) as TGeojsonCoordinate<T>;
}

export function GeojsonBoudingBox<T extends TSchema | undefined>(
  schema?: T,
): TGeojsonBoundingBox<T> {
  return (
    schema === undefined ? Type.Optional(BBox()) : schema
  ) as TGeojsonBoundingBox<T>;
}

export function FeatureId() {
  return Type.Union([Type.String(), Type.Number(), Type.Null()], {
    title: "geojson-feature-id",
    description: "Feature id",
  });
}

export function FeatureProperties<T extends TSchema | undefined>(schema?: T) {
  return (
    schema === undefined
      ? Type.Union([Type.Null(), Type.Record(Type.String(), Type.Any())])
      : schema
  ) as TProperties<T>;
}
