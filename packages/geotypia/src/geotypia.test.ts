import {
  describe, expect, it, test,

} from 'vitest'
import * as geotypia from './index.js'

const geojsonPoint = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [0, 0],
  },
  properties: {
    howdy: "partner",
  },
};

describe("geojson-types", () => {

  test("should validate a point", () => {
    const pointFeature = geojsonPoint;
    expect(geotypia.isPointGeometry(pointFeature.geometry)).toBe(true);
  });

  test("invalid point", () => {
    const invalidPoint = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0],
      },
      properties: {
        howdy: "partner",
      },
    };
    expect(geotypia.isPointGeometry(invalidPoint.geometry)).toBe(false);
  })

  test("throws on invalid point", () => {
    const invalidPoint = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0],
      },
      properties: {
        howdy: "partner",
      },
    };
    expect(() => geotypia.assertPointGeometry3d(invalidPoint.geometry)).toThrow();
  })


})
