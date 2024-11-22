import { expect, test } from "vitest";
import * as geobox from "../index.js";

const validator = new geobox.JsonSchemaValidator(geobox.Geoparquet());
const geoparquetMetadataExamplePoint = {
  geo: {
    columns: {
      geometry: {
        encoding: "point",
        geometry_types: ["Point"],
      },
    },
    primary_column: "geometry",
    version: "1.1.0",
  },
};

const geoparquetMetadataExample = {
  geo: {
    columns: {
      geometry: {
        bbox: [-180, -90, 180, 83.6451],
        covering: {
          bbox: {
            xmax: ["bbox", "xmax"],
            xmin: ["bbox", "xmin"],
            ymax: ["bbox", "ymax"],
            ymin: ["bbox", "ymin"],
          },
        },
        crs: {
          $schema: "https://proj.org/schemas/v0.6/projjson.schema.json",
          area: "World.",
          bbox: {
            east_longitude: 180,
            north_latitude: 90,
            south_latitude: -90,
            west_longitude: -180,
          },
          coordinate_system: {
            axis: [
              {
                abbreviation: "Lon",
                direction: "east",
                name: "Geodetic longitude",
                unit: "degree",
              },
              {
                abbreviation: "Lat",
                direction: "north",
                name: "Geodetic latitude",
                unit: "degree",
              },
            ],
            subtype: "ellipsoidal",
          },
          datum_ensemble: {
            accuracy: "2.0",
            ellipsoid: {
              inverse_flattening: 298.257_223_563,
              name: "WGS 84",
              semi_major_axis: 6_378_137,
            },
            id: {
              authority: "EPSG",
              code: 6326,
            },
            members: [
              {
                id: {
                  authority: "EPSG",
                  code: 1166,
                },
                name: "World Geodetic System 1984 (Transit)",
              },
              {
                id: {
                  authority: "EPSG",
                  code: 1152,
                },
                name: "World Geodetic System 1984 (G730)",
              },
              {
                id: {
                  authority: "EPSG",
                  code: 1153,
                },
                name: "World Geodetic System 1984 (G873)",
              },
              {
                id: {
                  authority: "EPSG",
                  code: 1154,
                },
                name: "World Geodetic System 1984 (G1150)",
              },
              {
                id: {
                  authority: "EPSG",
                  code: 1155,
                },
                name: "World Geodetic System 1984 (G1674)",
              },
              {
                id: {
                  authority: "EPSG",
                  code: 1156,
                },
                name: "World Geodetic System 1984 (G1762)",
              },
              {
                id: {
                  authority: "EPSG",
                  code: 1309,
                },
                name: "World Geodetic System 1984 (G2139)",
              },
            ],
            name: "World Geodetic System 1984 ensemble",
          },
          id: {
            authority: "OGC",
            code: "CRS84",
          },
          name: "WGS 84 (CRS84)",
          scope: "Not known.",
          type: "GeographicCRS",
        },
        edges: "planar",
        encoding: "WKB",
        geometry_types: ["Polygon", "MultiPolygon"],
      },
    },
    primary_column: "geometry",
    version: "1.1.0",
  },
};

test("geoparquet metadata example point", () => {
  const res = validator.tryFrom(geoparquetMetadataExamplePoint.geo);
  if (!res.ok) {
    console.error(res.error);
  }
  expect(res.ok).toEqual(true);
});

test("geoparquet metadata example", () => {
  const res = validator.tryFrom(geoparquetMetadataExample.geo);
  if (!res.ok) {
    console.error(res.error);
  }
  expect(res.ok).toEqual(true);
});
