import { describe, expect, test } from "vitest";
import { PointFeature } from "../geo-type/geojson/point-feature.js";
import * as geobox from "../index.js";

describe("jsonschema", () => {
  const rawSchema = PointFeature();
  const s = geobox.jsonschema(rawSchema);

  test("jsonschema", () => {
    expect(s).toBeDefined();
    expect(s.schema).toBeDefined();

    expect(s.schema).toEqual(rawSchema);

    expect(
      s.assert({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 0],
        },
        properties: {},
      }),
    ).toBeUndefined();

    expect(() =>
      s.assert({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [0, 0],
        },
        properties: {
          dingo: "bash",
        },
      }),
    ).toThrowError();
  });
});

describe("json-schema-destructure", () => {
  const rawSchema = PointFeature();
  const s = geobox.jsonschema(rawSchema);
  const {
    schema,
    typeguard,
    is,
    from,
    parse,
    tryFrom,
    safeParse,
    strictSchema,
  } = s;
  test("destructure", () => {
    expect(schema).toBeDefined();
    expect(typeguard).toBeDefined();
    expect(from).toBeDefined();
    expect(parse).toBeDefined();
    expect(tryFrom).toBeDefined();
    expect(safeParse).toBeDefined();
    expect(strictSchema).toBeDefined();
  });
  test("is", () => {
    expect(
      is({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 0],
        },
        properties: {},
      }),
    ).toBe(true);
    expect(
      is({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [0, 0],
        },
        properties: {
          dingo: "bash",
        },
      }),
    ).toBe(false);
  });
});
