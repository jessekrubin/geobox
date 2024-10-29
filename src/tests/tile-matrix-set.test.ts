import * as fs from "node:fs";
import { promises as fsp } from "node:fs";

import { describe, expect, test } from "vitest";
import * as geobox from "../index.js";
import { JsonSchemaValidator } from "../result-box.js";
import { resolveRepoPath } from "./_utils.js";

// const TILE_MATRIX_EXAMPLES = "./schemas/tms/v2/examples/tileset";
// const TILE_MATRIX_EXAMPLES_FILES = fs.readdirSync(resolveRepoPath(TILE_MATRIX_EXAMPLES));
const TILE_MATRIX_SET_EXAMPLES = "./schemas/tms/v2/examples/tilematrixset";
const TILE_MATRIX_SET_EXAMPLES_FILES = fs.readdirSync(
  resolveRepoPath(TILE_MATRIX_SET_EXAMPLES),
);
const TILE_SET_EXAMPLES = "./schemas/tms/v2/examples/tileset";
const TILE_SET_EXAMPLES_FILES = fs.readdirSync(
  resolveRepoPath(TILE_SET_EXAMPLES),
);

const TILE_MATRIX_SET_REGISTRY = "./test-data/tile-matrix-set/registry";
const TILE_MATRIX_SET_REGISTRY_FILES = fs.readdirSync(
  resolveRepoPath(TILE_MATRIX_SET_REGISTRY),
);

geobox.registerFormats();
const tileMatrixSetSchema = geobox.tms.TileMatrixSet();
const tileMatrixSetValidator = new JsonSchemaValidator(tileMatrixSetSchema);
const tileSetSchema = geobox.tms.TileSet();
const tileSetValidator = new JsonSchemaValidator(tileSetSchema);

test.each(TILE_MATRIX_SET_REGISTRY_FILES)("registry file %s", async (file) => {
  const raw = await fsp.readFile(
    resolveRepoPath(`${TILE_MATRIX_SET_REGISTRY}/${file}`),
    "utf8",
  );
  const parsed = JSON.parse(raw);
  const valres = tileMatrixSetValidator.safeParse(parsed);
  if (!valres.ok) {
    console.warn(valres.error);
  }
  expect(valres.ok).toBe(true);
});

describe("example-files", () => {
  describe("tile-matrix-set", () => {
    test.each(TILE_MATRIX_SET_EXAMPLES_FILES)(
      "tile-matrix-set-example-file %s",
      async (file) => {
        const raw = await fsp.readFile(
          resolveRepoPath(`${TILE_MATRIX_SET_EXAMPLES}/${file}`),
          "utf8",
        );
        const parsed = JSON.parse(raw);
        const valres = tileMatrixSetValidator.safeParse(parsed);
        if (!valres.ok) {
          console.warn(valres.error);
        }
        expect(valres.ok).toBe(true);
      },
    );
  });

  describe("tile-set", () => {
    test.each(TILE_SET_EXAMPLES_FILES)(
      "tile-matrix-example-file %s",
      async (file) => {
        const raw = await fsp.readFile(
          resolveRepoPath(`${TILE_SET_EXAMPLES}/${file}`),
          "utf8",
        );
        const parsed = JSON.parse(raw);
        const valres = tileSetValidator.safeParse(parsed);
        if (!valres.ok) {
          console.warn(valres.error);
        }
        expect(valres.ok).toBe(true);
      },
    );
  });
});
