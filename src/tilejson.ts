import type { SchemaOptions } from "./typebox.js";
import { Type } from "./typebox.js";
import { Latitude, Longitude } from "./geojson-schema.js";
import { tilejson } from "./index.js";

export const Semver = () =>
  Type.String({
    pattern: "\\d+\\.\\d+\\.\\d+\\w?[\\w\\d]*",
  });

export const VersionLike = () => Type.Union([Semver(), Type.String({})]);
export const TilejsonZoom = (options?: SchemaOptions) =>
  Type.Integer({
    minimum: 0,
    maximum: 30,
    ...options,
  });

// raster tiles
export const FormatJpg = (options?: SchemaOptions) => Type.Literal("jpg", options);
export const FormatPng = (options?: SchemaOptions) => Type.Literal("png", options);
// vector tiles
export const FormatPbf = (options?: SchemaOptions) => Type.Literal("pbf", options);

// scheme
export const SchemeTms = (options?: SchemaOptions) => Type.Literal("tms", options);
export const SchemeXyz = (options?: SchemaOptions) => Type.Literal("xyz", options);
export const Scheme = (options?: SchemaOptions) =>
  Type.Union([SchemeTms(), SchemeXyz()], {
    default: "xyz",
    ...options,
  });

export const Format = () => Type.Union([FormatJpg(), FormatPng(), FormatPbf()]);

export const Bounds = (options?: SchemaOptions) =>
  Type.Tuple([Longitude(), Latitude(), Longitude(), Latitude()], {
    default: [-180, -85.051_128_779_806_59, 180, 85.051_128_779_806_6],
    ...options,
  });
export const Center = (options?: SchemaOptions) =>
  Type.Tuple([Longitude(), Latitude(), TilejsonZoom()], {
    default: [0, 0, 0],
    ...options,
  });

export const Tilejson220 = (options?: SchemaOptions) =>
  Type.Object(
    {
      // MUST
      name: Type.String(),
      format: Format(),
      tilejson: Type.String({ default: "2.2.0" }),
      tiles: Type.Array(Type.String(), {
        default: [],
      }),
      // OPTIONAL
      attribution: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      bounds: Type.Optional(Type.Union([Bounds(), Type.Null()])),
      center: Type.Optional(Type.Union([Center(), Type.Null()])),
      data: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
      description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      grids: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
      legend: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      maxzoom: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
      minzoom: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
      scheme: Type.Optional(Type.Union([Scheme(), Type.Null()])),
      template: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      version: Type.Optional(Type.Union([VersionLike(), Type.Null()])),
    },
    {
      additionalProperties: true,
      ...options,
    },
  );

export const VectorLayer = (options?: SchemaOptions) =>
  Type.Object(
    {
      id: Type.String(),

      fields: Type.Record(Type.String(), Type.String()),
      description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      maxzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      minzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
    },
    {
      additionalProperties: true,
      ...options,
    },
  );

export const VectorLayers = (options?: SchemaOptions) =>
  Type.Array(VectorLayer(), {
    default: [],
    ...options,
  });

export const Tilejson300Raster = (options?: SchemaOptions) =>
  Type.Object(
    {
      // MUST
      name: Type.String(),
      format: Type.Union([Type.Literal("png"), Type.Literal("jpg")]),
      tilejson: Type.String({ default: "3.0.0" }),
      tiles: Type.Array(Type.String(), {
        default: [],
      }),

      // OPTIONAL
      vector_layers: Type.Optional(VectorLayers()),
      // COMMON
      attribution: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      bounds: Type.Optional(Type.Union([Bounds(), Type.Null()])),
      center: Type.Optional(Type.Union([Center(), Type.Null()])),
      data: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
      description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      fillzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      grids: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
      legend: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      maxzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      minzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      scheme: Type.Optional(Type.Union([Scheme(), Type.Null()])),
      template: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      version: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    },
    {
      additionalProperties: true,
      ...options,
    },
  );

export const Tilejson300Vector = (options?: SchemaOptions) =>
  Type.Object(
    {
      // MUST
      name: Type.String(),
      format: Type.Literal("pbf"),
      tilejson: Type.String({ default: "3.0.0" }),
      tiles: Type.Array(Type.String(), {
        default: [],
      }),
      // required for vector tiles
      vector_layers: VectorLayers(),
      // OPTIONAL
      attribution: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      bounds: Type.Optional(Type.Union([Type.Array(Type.Number()), Type.Null()])),
      center: Type.Optional(Type.Union([Type.Array(Type.Number()), Type.Null()])),
      data: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
      description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      fillzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      grids: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
      legend: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      maxzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      minzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      scheme: Type.Optional(Type.Union([Scheme(), Type.Null()])),
      template: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      version: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    },
    {
      additionalProperties: true,
      ...options,
    },
  );

export const Tilejson300 = (options?: SchemaOptions) =>
  Type.Union([Tilejson300Raster(), Tilejson300Vector()], {
    ...options,
  });

/**
 * Experimental
 */
// export const Tilejson300Raster = () =>
//   Type.Composite([
//     Type.Object({
//       // MUST
//       format: Type.Union([Type.Literal("png"), Type.Literal("jpg")]),
//     }),
//     Tilejson300Base(),
//   ]);
// export const Tilejson300Vector = () =>
//   Type.Composite([
//     Type.Object({
//       format: Type.Literal("pbf"),
//       vector_layers: VectorLayers(),
//     }),
//     Tilejson300Base(),
//   ]);
// export const Tilejson300 = (options?: SchemaOptions) => Type.Union([Tilejson300Raster(), Tilejson300Vector()],
//   {
//     ...options,
//   });
