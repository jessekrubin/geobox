/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FeatureOptions, PointGeometry, Feature } from "../types/geojson.js";
{
  // type ExampleOptions = FeatureOptionsGeneric;

  type FeatureOptionsNothing = FeatureOptions;
  type ExampleOptionsWithId = FeatureOptions<{
    Id: string;
  }>;
}
{
  type FeatureWithId = Feature<PointGeometry, undefined, { Id: string }>;
  const featureWithNoProperties: FeatureWithId = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    id: "some-id",
  };
  const validFeature: FeatureWithId = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      howdy: "partner",
    },
    id: "some-id",
  };

  // @ts-expect-error id is required
  const invalidFeature: FeatureWithId = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      howdy: "partner",
    },
  };


  type FeatureWithProperties = Feature<PointGeometry, { howdy: 'doody' } | undefined>;
  type FeatureWithPropertiesProperties = FeatureWithProperties['properties'];

  const featureWithProperties: FeatureWithProperties = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      howdy: "doody",
    },
  };

}

{
  const pointFeature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      howdy: "partner",
    },
  } satisfies Feature;
}
