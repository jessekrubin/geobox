import type { SchemaOptions } from "./typebox.js";
import { Type } from "./typebox.js";
import { Latitude, Longitude } from "./coord.js";

export function Semver() {
  return Type.String({
    pattern: "\\d+\\.\\d+\\.\\d+\\w?[\\w\\d]*",
  });
}

export function Tilejson100Version(options?: SchemaOptions) {
  return Type.Literal("1.0.0", { ...options });
}
export function Tilejson200Version(options?: SchemaOptions) {
  return Type.Literal("2.0.0", { ...options });
}
export function Tilejson201Version(options?: SchemaOptions) {
  return Type.Literal("2.0.1", { ...options });
}
export function Tilejson210Version(options?: SchemaOptions) {
  return Type.Literal("2.1.0", { ...options });
}
export function Tilejson220Version(options?: SchemaOptions) {
  return Type.Literal("2.2.0", { ...options });
}
export function Tilejson300Version(options?: SchemaOptions) {
  return Type.Literal("3.0.0", { ...options });
}

export function TilejsonVersion(options?: SchemaOptions) {
  return Type.Union(
    [
      Tilejson100Version(),
      Tilejson200Version(),
      Tilejson201Version(),
      Tilejson210Version(),
      Tilejson220Version(),
      Tilejson300Version(),
    ],
    { default: "3.0.0", ...options },
  );
}

export function VersionLike() {
  return Type.Union([Semver(), Type.String({})]);
}
export function TilejsonZoom(options?: SchemaOptions) {
  return Type.Integer({
    minimum: 0,
    maximum: 30,
    ...options,
  });
}

// raster tiles
export function FormatJpg(options?: SchemaOptions) {
  return Type.Literal("jpg", options);
}
export function FormatPng(options?: SchemaOptions) {
  return Type.Literal("png", options);
}
// vector tiles
export function FormatPbf(options?: SchemaOptions) {
  return Type.Literal("pbf", options);
}
export function TilejsonFormat(options?: SchemaOptions) {
  return Type.Union([FormatJpg(), FormatPng(), FormatPbf()], options);
}

// scheme
export function SchemeTms(options?: SchemaOptions) {
  return Type.Literal("tms", options);
}
export function SchemeXyz(options?: SchemaOptions) {
  return Type.Literal("xyz", options);
}
export function Scheme(options?: SchemaOptions) {
  return Type.Union([SchemeTms(), SchemeXyz()], {
    default: "xyz",
    ...options,
  });
}

export function Format() {
  return Type.Union([FormatJpg(), FormatPng(), FormatPbf()]);
}

export function Bounds(options?: SchemaOptions) {
  return Type.Tuple([Longitude(), Latitude(), Longitude(), Latitude()], {
    default: [-180, -85.05112877980659, 180, 85.0511287798066],
    ...options,
  });
}
export function Center(options?: SchemaOptions) {
  return Type.Tuple([Longitude(), Latitude(), TilejsonZoom()], {
    default: [0, 0, 0],
    ...options,
  });
}

export function Tilejson220(options?: SchemaOptions) {
  return Type.Object(
    {
      // MUST
      name: Type.String(),
      format: Format(),
      tilejson: Tilejson220Version(),
      tiles: Type.Array(Type.String(), {
        default: [],
      }),
      // OPTIONAL
      attribution: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      bounds: Type.Optional(Type.Union([Bounds(), Type.Null()])),
      center: Type.Optional(Type.Union([Center(), Type.Null()])),
      data: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
      description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      grids: Type.Optional(
        Type.Union([Type.Array(Type.String()), Type.Null()]),
      ),
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
}

export function VectorLayer(options?: SchemaOptions) {
  return Type.Object(
    {
      id: Type.String(),
      fields: Type.Record(Type.String(), Type.Optional(Type.String())),
      description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      maxzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      minzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
    },
    {
      additionalProperties: true,
      ...options,
    },
  );
}

export function VectorLayers(options?: SchemaOptions) {
  return Type.Array(VectorLayer(), {
    default: [],
    ...options,
  });
}

export function Tilejson300Raster(options?: SchemaOptions) {
  return Type.Object(
    {
      // MUST
      name: Type.String(),
      format: Type.Union([Type.Literal("png"), Type.Literal("jpg")]),
      tilejson: Tilejson300Version(),
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
      grids: Type.Optional(
        Type.Union([Type.Array(Type.String()), Type.Null()]),
      ),
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
}

export function Tilejson300Vector(options?: SchemaOptions) {
  return Type.Object(
    {
      // MUST
      name: Type.String(),
      format: Type.Literal("pbf"),
      tilejson: Tilejson300Version(),
      tiles: Type.Array(Type.String(), {
        default: [],
      }),
      // required for vector tiles
      vector_layers: VectorLayers(),
      // OPTIONAL
      attribution: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      bounds: Type.Optional(
        Type.Union([Type.Array(Type.Number()), Type.Null()]),
      ),
      center: Type.Optional(
        Type.Union([Type.Array(Type.Number()), Type.Null()]),
      ),
      data: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
      description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      fillzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      grids: Type.Optional(
        Type.Union([Type.Array(Type.String()), Type.Null()]),
      ),
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
}

export function Tilejson300(options?: SchemaOptions) {
  return Type.Union([Tilejson300Raster(), Tilejson300Vector()], {
    ...options,
  });
}

export function TilejsonLike(options?: SchemaOptions) {
  return Type.Object(
    {
      // MUST
      name: Type.String(),
      format: TilejsonFormat(),
      tilejson: TilejsonVersion(),
      tiles: Type.Array(Type.String(), {
        default: [],
      }),
      maxzoom: TilejsonZoom(),
      minzoom: TilejsonZoom(),
      bounds: Bounds(),
      vector_layers: VectorLayers(),

      // OPTIONAL
      center: Type.Optional(Type.Union([Center(), Type.Null()])),
      attribution: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      data: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
      description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      fillzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
      grids: Type.Optional(
        Type.Union([Type.Array(Type.String()), Type.Null()]),
      ),
      legend: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      scheme: Type.Optional(Type.Union([Scheme(), Type.Null()])),
      template: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      version: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    },
    {
      additionalProperties: true,
      ...options,
    },
  );
}

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
