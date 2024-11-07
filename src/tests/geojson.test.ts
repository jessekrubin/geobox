/* eslint-disable no-console */
import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { assert, describe, expect, test } from "vitest";
import { Feature } from "../geo-type/_geojson/feature.js";
import { FeatureCollection } from "../geo-type/_geojson/feature-collection.js";
import { Geometry } from "../geo-type/_geojson/geometry.js";
import {
  GeometryCollection,
  GeometryCollection2d
} from "../geo-type/_geojson/geometry-collection.js";
import {
  GeometryCollectionRecursive
} from "../geo-type/_geojson/geometry-collection-recursive.js";
import {
  LineStringGeometry
} from "../geo-type/_geojson/line-string-geometry.js";
import {
  MultiLineStringGeometry
} from "../geo-type/_geojson/multi-line-string-geometry.js";
import {
  MultiPointGeometry
} from "../geo-type/_geojson/multi-point-geometry.js";
import {
  MultiPolygonGeometry
} from "../geo-type/_geojson/multi-polygon-geometry.js";
import {
  PointFeature,
  PointFeature2d
} from "../geo-type/_geojson/point-feature.js";
import { PolygonGeometry } from "../geo-type/_geojson/polygon-geometry.js";
import * as geobox from "../index.js";
import { jsonschema } from "../result-box.js";
import {
  FEATURE_COLLECTION,
  GEOMETRY_COLLECTION,
  LINE_STRING_GEOMETRY,
  MULTI_LINE_STRING_GEOM,
  MULTI_POINT_GEOMETRY,
  MULTI_POLYGON_GEOM,
  POINT_GEOMETRY,
  POLYGON_GEOM,
} from "./test-data.js";

const simplePointFeature = {
  type: "Feature",
  geometry: {
    type: "Point",

    coordinates: [0, 0],
  },
  properties: {},
};

const pointFeatureDingoProps = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [0, 0],
  },
  properties: {
    // My dog bash aka 'babydog'
    dingo: "bash",
  },
};
test("no-properties-schema-feature-with-geometry-schema", () => {
  const pointSchema = Feature({ geometry: geobox.PointGeometry() });
  const pointSchemaValidator = TypeCompiler.Compile(pointSchema);
  assert.equal(pointSchemaValidator.Check(simplePointFeature), true);
  if (pointSchemaValidator.Check(simplePointFeature)) {
    const t = simplePointFeature;
    // keep to make eslint is happy and can see the type of t
    expect(t.geometry.coordinates).toEqual([0, 0]);
  }
});
test("no-properties-schema", () => {
  const pointSchema = PointFeature();
  const pointSchemaValidator = TypeCompiler.Compile(pointSchema);

  assert.equal(pointSchemaValidator.Check(simplePointFeature), true);
  if (pointSchemaValidator.Check(simplePointFeature)) {
    const t = simplePointFeature;
    // keep to make eslint is happy and can see the type of t
    expect(t.geometry.coordinates).toEqual([0, 0]);
  }
});

test("point-with-properties-schema", () => {
  const pointSchemaBabydog = PointFeature({
    properties: Type.Object({ dingo: Type.String() }),
  });
  const pointSchemaDingoValidator = TypeCompiler.Compile(pointSchemaBabydog);
  if (pointSchemaDingoValidator.Check(pointFeatureDingoProps)) {
    const t = pointFeatureDingoProps;
    expect(t.properties).toEqual({ dingo: "bash" });
  }

  assert.equal(pointSchemaDingoValidator.Check(pointFeatureDingoProps), true);
  assert.equal(pointSchemaDingoValidator.Check(simplePointFeature), false);

  const badpoint = { ...simplePointFeature, properties: [123] };
  expect(pointSchemaDingoValidator.Check(badpoint)).toBe(false);
});

test("point-feature-schema-2d", () => {
  const pointSchemaBabydog = PointFeature2d({
    properties: Type.Object({ dingo: Type.String() }),
  });
  const pointSchemaDingoValidator = TypeCompiler.Compile(pointSchemaBabydog);
  if (pointSchemaDingoValidator.Check(pointFeatureDingoProps)) {
    const t = pointFeatureDingoProps;
    expect(t.properties).toEqual({ dingo: "bash" });
  }

  assert.equal(pointSchemaDingoValidator.Check(pointFeatureDingoProps), true);
  assert.equal(pointSchemaDingoValidator.Check(simplePointFeature), false);

  const badpoint = { ...simplePointFeature, properties: [123] };
  expect(pointSchemaDingoValidator.Check(badpoint)).toBe(false);
});

test("nested-geometry-collection", () => {
  /**
   * Nested geometry collection
   */
  const nestedGeometryCollection = {
    type: "GeometryCollection",
    geometries: [
      {
        type: "GeometryCollection",
        geometries: [
          {
            type: "GeometryCollection",
            geometries: [
              {
                type: "Point",
                coordinates: [0, 0],
              },
            ],
          },
        ],
      },
    ],
  };
  const geometryCollectionSchema = GeometryCollectionRecursive();
  const validator = jsonschema(geometryCollectionSchema);
  const res = validator.tryFrom(nestedGeometryCollection);
  if (!res.ok) {
    console.log(JSON.stringify(res.error, null, 2));
  }
  expect(res.ok).toBe(true);
});

const aFeeeeetCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [-28.521_526_795_399_666, 21.025_827_362_161_493],
          [-26.709_304_368_730_244, 4.002_964_838_519_915],
          [5.899_976_839_396_885, -0.916_790_172_545_802_3],
          [-24.236_594_171_065_406, 18.006_967_554_562_28],
        ],
        type: "LineString",
      },
    },
  ],
};

test("feature-collection", () => {
  const featureCollectionSchema = FeatureCollection();
  const validator = jsonschema(featureCollectionSchema);

  const res = validator.tryFrom(aFeeeeetCollection);
  if (!res.ok) {
    console.log(JSON.stringify(res.error, null, 2));
  }
  //
  expect(res.ok).toBe(true);
});

describe("geojson-geometry-validation", () => {
  test("point", () => {
    const pointSchema = geobox.PointGeometry();
    const validator = jsonschema(pointSchema);

    const res = validator.tryFrom(POINT_GEOMETRY);
    if (!res.ok) {
      console.log(JSON.stringify(res.error, null, 2));
    }
    //
    expect(res.ok).toBe(true);
  });

  test("line-string", () => {
    const lineStringSchema = LineStringGeometry();
    const validator = jsonschema(lineStringSchema);

    const res = validator.tryFrom(LINE_STRING_GEOMETRY);
    if (!res.ok) {
      console.log(JSON.stringify(res.error, null, 2));
    }
    expect(res.ok).toBe(true);
  });

  test("polygon", () => {
    const polygonSchema = PolygonGeometry();
    const validator = jsonschema(polygonSchema);

    const res = validator.tryFrom(POLYGON_GEOM);
    if (!res.ok) {
      console.log(JSON.stringify(res.error, null, 2));
    }
    //
    expect(res.ok).toBe(true);
  });

  test("multi-point", () => {
    const multiPointSchema = MultiPointGeometry();
    const validator = jsonschema(multiPointSchema);

    const res = validator.tryFrom(MULTI_POINT_GEOMETRY);
    if (!res.ok) {
      console.log(JSON.stringify(res.error, null, 2));
    }
    //
    expect(res.ok).toBe(true);
  });

  test("multi-line-string", () => {
    const multiLineStringSchema = MultiLineStringGeometry();
    const validator = jsonschema(multiLineStringSchema);

    const res = validator.tryFrom(MULTI_LINE_STRING_GEOM);
    if (!res.ok) {
      console.log(JSON.stringify(res.error, null, 2));
    }
    //
    expect(res.ok).toBe(true);
  });

  test("multi-polygon", () => {
    const multiPolygonSchema = MultiPolygonGeometry();
    const validator = jsonschema(multiPolygonSchema);

    const res = validator.tryFrom(MULTI_POLYGON_GEOM);
    if (!res.ok) {
      console.log(JSON.stringify(res.error, null, 2));
    }
    //
    expect(res.ok).toBe(true);
  });

  test("geometry-collection", () => {
    const geometryCollectionSchema = GeometryCollection();
    const validator = jsonschema(geometryCollectionSchema);

    const res = validator.tryFrom(GEOMETRY_COLLECTION);
    if (!res.ok) {
      console.log(JSON.stringify(res.error, null, 2));
    }
    //
    expect(res.ok).toBe(true);
  });
  test("geometry-collection-2d", () => {
    const geometryCollectionSchema = GeometryCollection2d();
    const validator = jsonschema(geometryCollectionSchema);

    const res = validator.tryFrom(GEOMETRY_COLLECTION);
    if (!res.ok) {
      console.log(JSON.stringify(res.error, null, 2));
    }
    expect(res.ok).toBe(true);
  });
  test("feature-collection-val", () => {
    const featureCollectionSchema = FeatureCollection();
    const validator = jsonschema(featureCollectionSchema);

    const res = validator.tryFrom(FEATURE_COLLECTION);
    if (!res.ok) {
      console.log(JSON.stringify(res.error, null, 2));
    }
    //
    expect(res.ok).toBe(true);
  });

  const geometrySchema = Geometry();
  test.each([
    { name: "PointGeometry", data: POINT_GEOMETRY },
    { name: "LineStringGeometry", data: LINE_STRING_GEOMETRY },
    { name: "PolygonGeometry", data: POLYGON_GEOM },
    { name: "MultiPointGeometry", data: MULTI_POINT_GEOMETRY },
    { name: "MultiLineStringGeometry", data: MULTI_LINE_STRING_GEOM },
    { name: "MultiPolygonGeometry", data: MULTI_POLYGON_GEOM },
    { name: "GeometryCollection", data: GEOMETRY_COLLECTION },
  ])("geojson-geometry-validation-$name", ({ data }) => {
    const validator = jsonschema(geometrySchema);
    const res = validator.tryFrom(data);
    if (!res.ok) {
      console.log(
        res.error,
        // JSON.stringify(res.error, null, 2),
      );
    }
    //
    expect(res.ok).toBe(true);
  });

  const geojsonschema = geobox.Index();
  test.each([
    { name: "PointGeometry", data: POINT_GEOMETRY },
    { name: "LineStringGeometry", data: LINE_STRING_GEOMETRY },
    { name: "PolygonGeometry", data: POLYGON_GEOM },
    { name: "MultiPointGeometry", data: MULTI_POINT_GEOMETRY },
    { name: "MultiLineStringGeometry", data: MULTI_LINE_STRING_GEOM },
    { name: "MultiPolygonGeometry", data: MULTI_POLYGON_GEOM },
    { name: "GeometryCollection", data: GEOMETRY_COLLECTION },
    { name: "FeatureCollection", data: FEATURE_COLLECTION },
  ])("all-should-be-good-validation-$name", ({ data }) => {
    const validator = jsonschema(geojsonschema);
    const res = validator.tryFrom(data);
    //
    expect(res.ok).toBe(true);
  });
});
