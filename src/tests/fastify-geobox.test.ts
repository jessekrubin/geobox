import { describe, expect, test } from "vitest";
import Fastify from "fastify";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as geobox from "../index.js";

describe("fastify-geobox", () => {
  const fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>();

  fastify.get(
    "/point",
    {
      schema: {
        response: {
          200: geobox.Point(),
        },
      },
    },
    (_req, _res) => {
      return {
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [0, 0] satisfies [number, number],
        },
        properties: {
          dingo: "bash",
        },
      };
    },
  );

  // from https://github.com/mapbox/tilejson-spec/blob/master/3.0.0/example/osm.json
  const tilejsonSchema = geobox.tilejson.TilejsonLike({
    additionalProperties: Type.String(),
  });
  const exampleTilejson300 = {
    tilejson: "3.0.0" as const,
    name: "OpenStreetMap",
    format: "pbf" as const,
    description: "A free editable map of the whole world.",
    version: "1.0.0",
    attribution: "(c) OpenStreetMap contributors, CC-BY-SA",
    scheme: "xyz" as const,
    tiles: [
      "https://a.tile.custom-osm-tiles.org/{z}/{x}/{y}.mvt",
      "https://b.tile.custom-osm-tiles.org/{z}/{x}/{y}.mvt",
      "https://c.tile.custom-osm-tiles.org/{z}/{x}/{y}.mvt",
    ],
    minzoom: 0,
    maxzoom: 18,
    bounds: [-180, -85, 180, 85] as [number, number, number, number],
    center: [0, 0, 2] as [number, number, number],
    fillzoom: 6,
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
          // "type": "the type of bike parking",
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
  };

  test("tilejson-schema-check", () => {
    const res = Value.Check(tilejsonSchema, exampleTilejson300);
    expect(res).toBe(true);
  });

  fastify.get(
    "/tilejson300",
    {
      schema: {
        response: {
          200: geobox.tilejson.TilejsonLike(),
        },
      },
    },
    (_req, _res) => {
      if (!Value.Check(tilejsonSchema, exampleTilejson300)) {
        throw new Error("bad tilejson");
      }
      return exampleTilejson300;
    },
  );

  const bboxQuerySchema = Type.Intersect([
    Type.Union([
      Type.Partial(
        geobox.GeoBoundingBox({
          xmin: geobox.LonWgs84({ default: -180 }),
          ymin: geobox.LatWgs84({ default: -90 }),
          xmax: geobox.LonWgs84({ default: 180 }),
          ymax: geobox.LatWgs84({ default: 90 }),
        }),
      ),
    ]),
    Type.Object({
      group: Type.Optional(Type.String()),
    }),
  ]);
  console.log(JSON.stringify(bboxQuerySchema, undefined, 2));

  fastify.get(
    "/bbox",
    {
      schema: {
        querystring: bboxQuerySchema,
      },
    },
    (_req, _res) => {
      const bbox = {
        west: _req.query.west,
        south: _req.query.south,
        east: _req.query.east,
        north: _req.query.north,
      };
      return bbox;
    },
  );

  test("bbox-schema", async () => {
    const r = await fastify.inject("/bbox");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = JSON.parse(r.payload);
    expect(data).toEqual({
      west: -180,
      south: -90,
      east: 180,
      north: 90,
    });
  });

  test("point-schema", async () => {
    const r = await fastify.inject("/point");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = JSON.parse(r.payload);
    expect(data).toEqual({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0, 0],
      },
      properties: {
        dingo: "bash",
      },
    });
  });
  test("tilejson-schema", async () => {
    const r = await fastify.inject("/tilejson300");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = JSON.parse(r.payload);
    expect(data).toEqual(exampleTilejson300);
  });
});
