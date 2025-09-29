// REF: https://github.com/mapbox/mapbox-geostats
import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";

export function GeostatsAttribute(options?: TSchemaOptions) {
  return Type.Object(
    {
      attribute: Type.String(),
      count: Type.Number(),
      type: Type.String(),
      values: Type.Array(Type.String()),
      min: Type.Number(),
      max: Type.Number(),
    },
    {
      title: "geostats-attribute",
      ...options,
    },
  );
}

export function GeostatsLayer(options?: TSchemaOptions) {
  return Type.Object(
    {
      layer: Type.String(),
      count: Type.Number(),
      geometry: Type.String(),
      attributeCount: Type.Number(),
      attributes: Type.Array(GeostatsAttribute()),
    },
    {
      title: "geostats-layer",
      ...options,
    },
  );
}

export function GeostatsTilestats(options?: TSchemaOptions) {
  return Type.Object(
    {
      layerCount: Type.Number(),
      layers: Type.Array(GeostatsLayer()),
    },
    {
      title: "geostats-tilestats",
      ...options,
    },
  );
}
