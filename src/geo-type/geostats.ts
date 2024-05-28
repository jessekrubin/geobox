// REF: https://github.com/mapbox/mapbox-geostats
import type { SchemaOptions } from "../typebox.js";
import { Type } from "../typebox.js";

export function GeostatsAttribute(options?: SchemaOptions) {
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

export function GeostatsLayer(options?: SchemaOptions) {
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

export function GeostatsTilestats(options?: SchemaOptions) {
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
