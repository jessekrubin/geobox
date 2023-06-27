import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import * as turf from "@turf/turf";
import { assert, expect, test } from "vitest";
import * as geobox from "./geojson-schemas.js";

test("test point schema builder", () => {
  const p = turf.point([0, 0]);

  const pointSchema = geobox.PointFeature();
  const pointSchemaValidator = TypeCompiler.Compile(pointSchema);

  assert.equal(pointSchemaValidator.Check(p), true);
  if (pointSchemaValidator.Check(p)) {
    const t = p;
    // keep to make eslint is happy and can see the type of t
    expect(t.geometry.coordinates).toEqual([0, 0]);
  }

  const pDingo = turf.point([0, 0], { dingo: "bash" }); // My dog bash aka 'babydog'
  const pointSchemaBabydog = geobox.PointFeature(Type.Object({ dingo: Type.String() }));
  const pointSchemaDingoValidator = TypeCompiler.Compile(pointSchemaBabydog);
  if (pointSchemaDingoValidator.Check(pDingo)) {
    const t = pDingo;
    expect(t.properties).toEqual({ dingo: "bash" });
  }

  assert.equal(pointSchemaDingoValidator.Check(pDingo), true);
  assert.equal(pointSchemaDingoValidator.Check(p), false);

  const badpoint = { ...p, properties: [123] };
  expect(pointSchemaDingoValidator.Check(badpoint)).toBe(false);
});
