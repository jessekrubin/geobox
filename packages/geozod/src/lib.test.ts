import { z } from "zod";
import * as turf from "@turf/turf";
import { assert, expect, test } from "vitest";
import * as geoz from "./geojson.js";

test("test point schema builder", () => {
  const p = turf.point([0, 0]);
  const pointSchema = geoz.pointFeature();
  assert.equal(pointSchema.safeParse(p).success, true);
  const parsedPointSimple = pointSchema.safeParse(p);
  if (parsedPointSimple.success) {
    const t = parsedPointSimple.data;
    expect(t.geometry.coordinates).toEqual([0, 0]);
  }
});

test("properties schema", () => {
  const p = turf.point([0, 0], {
    dingo: "bash",
  });

  const pointSchema = geoz.pointFeature({
    properties: z.object({ dingo: z.string() }),
  });

  assert.equal(pointSchema.safeParse(p).success, true);

  const parsedPointSimple = pointSchema.safeParse(p);
  if (parsedPointSimple.success) {
    const t = parsedPointSimple.data;
    // keep to make eslint is happy and can see the type of t
    expect(t.geometry.coordinates).toEqual([0, 0]);
  }
});

test("coordinates-schema", () => {
  const p = turf.point([0, 0]);
  const pointSchema = geoz.pointFeature({
    coordinate: z.tuple([z.number(), z.number()]),
  });
  assert.equal(pointSchema.safeParse(p).success, true);
  const parsedPointSimple = pointSchema.safeParse(p);
  if (parsedPointSimple.success) {
    const t = parsedPointSimple.data;
    const coordinates = t.geometry.coordinates;
    // keep to make eslint is happy and can see the type of t
    expect(t.geometry.coordinates).toEqual([0, 0]);
    expect(coordinates.length).toEqual(2);
  }
});
