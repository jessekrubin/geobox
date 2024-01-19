import { expect, test } from "vitest";
import Fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as geobox from "../index.js";

test("fastify-typebox-geobox", async () => {
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
