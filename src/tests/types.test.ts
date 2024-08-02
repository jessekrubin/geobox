import { expect, test } from "vitest";
import { Value } from "@sinclair/typebox/value";
import type { Static } from "@sinclair/typebox";
import * as geobox from "../index.js";

test("bbox-options", () => {
  type BBoxOptionsX<T> =
    | { x: T; xmin?: T; xmax?: never }
    | { x: T; xmin?: never; xmax?: T }
    | { x?: never; xmin: T; xmax: T }
    | { x?: never; xmin?: T; xmax?: never }
    | { x?: never; xmin?: never; xmax?: T };
  type BBoxOptionsY<T> =
    | { y: T; ymin?: T; ymax?: never }
    | { y: T; ymin?: never; ymax?: T }
    | { y?: never; ymin: T; ymax: T }
    | { y?: never; ymin?: T; ymax?: never }
    | { y?: never; ymin?: never; ymax?: T };
  type BBoxOptionsZ<T> =
    | { z: T; zmin?: T; zmax?: never }
    | { z: T; zmin?: never; zmax?: T }
    | { z?: never; zmin: T; zmax: T }
    | { z?: never; zmin?: T; zmax?: never }
    | { z?: never; zmin?: never; zmax?: T };

  type BBoxOpts = BBoxOptionsX<number> &
    BBoxOptionsY<number> &
    BBoxOptionsZ<number>;
  const bboxX0: BBoxOpts = {};
  const bboxX1: BBoxOpts = { x: 10 };
  const bboxX2: BBoxOpts = { x: 10, xmin: 0 };
  const bboxX3: BBoxOpts = { x: 10, xmax: 20 };
  const bboxX4: BBoxOpts = { xmin: 0, xmax: 20 };
  // @ts-expect-error - should bc xmin & xmax means x is not allowed
  const bboxX5: BBoxOpts = { x: 10, xmin: 0, xmax: 20 };

  expect(bboxX0).toEqual({});
  expect(bboxX1).toEqual({ x: 10 });
  expect(bboxX2).toEqual({ x: 10, xmin: 0 });
  expect(bboxX3).toEqual({ x: 10, xmax: 20 });
  expect(bboxX4).toEqual({ xmin: 0, xmax: 20 });
  expect(bboxX5).toEqual({ x: 10, xmin: 0, xmax: 20 });
});

test("utile.json", () => {
  const utilejsonSchema = geobox.tilejson.UTilejson();
  type UTilejson = Static<typeof utilejsonSchema>;

  const validRasterTilejson: UTilejson = {
    tilejson: "2.2.0",
    format: "png",
    name: "raster",
    tiles: ["http://example.com/{z}/{x}/{y}.png"],
    minzoom: 0,
    maxzoom: 22,
    bounds: [-180, -85.0511, 180, 85.0511],
    tilesize: 256,
  };
  const validVectorTilejson: UTilejson = {
    tilejson: "2.2.0",
    format: "pbf",
    name: "vector",
    tiles: ["http://example.com/{z}/{x}/{y}.pbf"],
    vector_layers: [
      {
        id: "telephone",
        fields: {
          phone_number: "the phone number",
          payment: "how to pay",
        },
      },
      {
        id: "bicycle_parking",
        fields: {
          year_installed: "the year the bike parking was installed",
        },
      },
      {
        id: "showers",
        fields: {
          water_temperature: "the maximum water temperature",
          wear_sandles: "whether you should wear sandles or not",
          wheelchair: "is the shower wheelchair friendly?",
        },
      },
    ],
    minzoom: 0,
    maxzoom: 22,
    bounds: [-180, -85.0511, 180, 85.0511],
  };

  // @ts-expect-error - should fail bc no vector_layers
  const invalidTilejson: UTilejson = {
    tilejson: "2.2.0",
    name: "pbf-bad",
    format: "pbf",
    tiles: ["http://example.com/{z}/{x}/{y}.png"],
    minzoom: 0,
    maxzoom: 22,
    bounds: [-180, -85.0511, 180, 85.0511],
  };

  for (const tilejson of [validRasterTilejson, validVectorTilejson]) {
    expect(Value.Check(utilejsonSchema, tilejson)).toBe(true);
  }
  expect(Value.Check(utilejsonSchema, invalidTilejson)).toBe(false);
});
