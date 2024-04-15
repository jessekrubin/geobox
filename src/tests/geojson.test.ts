import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { assert, expect, test } from "vitest";
import * as geobox from "../geojson-schema.js";
import { jsonschema } from "../result-box.js";

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

/**
 * Nested geometry collection
 *
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

test("no-properties-schema", () => {
  const pointSchema = geobox.PointFeature();
  const pointSchemaValidator = TypeCompiler.Compile(pointSchema);

  assert.equal(pointSchemaValidator.Check(simplePointFeature), true);
  if (pointSchemaValidator.Check(simplePointFeature)) {
    const t = simplePointFeature;
    // keep to make eslint is happy and can see the type of t
    expect(t.geometry.coordinates).toEqual([0, 0]);
  }
});

test("point-with-properties-schema", () => {
  const pointSchemaBabydog = geobox.PointFeature({
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
  const pointSchemaBabydog = geobox.PointFeature2d({
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
  const geometryCollectionSchema = geobox.GeometryCollection();
  const validator = jsonschema(geometryCollectionSchema);

  const res = validator.tryFrom(nestedGeometryCollection);
  console.log(res);
  console.log(JSON.stringify(res, null, 2));
  expect(res.ok).toBe(true);
});
