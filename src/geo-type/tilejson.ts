import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { UInt32 } from "./int.js";
import { Latitude, Longitude } from "./lnglat.js";

export function Semver() {
  return Type.String({
    pattern: String.raw`\d+\.\d+\.\d+\w?[\w\d]*`,
  });
}

export function Tilejson100Version(options?: TSchemaOptions) {
  return Type.Literal("1.0.0", { ...options });
}
export function Tilejson200Version(options?: TSchemaOptions) {
  return Type.Literal("2.0.0", { ...options });
}
export function Tilejson201Version(options?: TSchemaOptions) {
  return Type.Literal("2.0.1", { ...options });
}
export function Tilejson210Version(options?: TSchemaOptions) {
  return Type.Literal("2.1.0", { ...options });
}
export function Tilejson220Version(options?: TSchemaOptions) {
  return Type.Literal("2.2.0", { ...options });
}
export function Tilejson300Version(options?: TSchemaOptions) {
  return Type.Literal("3.0.0", { ...options });
}

export function TilejsonVersion(options?: TSchemaOptions) {
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
export function TilejsonZoom(options?: TSchemaOptions) {
  return Type.Integer({
    minimum: 0,
    maximum: 30,
    ...options,
  });
}

// raster tiles
export function FormatJpg(options?: TSchemaOptions) {
  return Type.Literal("jpg", options);
}
export function FormatPng(options?: TSchemaOptions) {
  return Type.Literal("png", options);
}
export function FormatWebp(options?: TSchemaOptions) {
  return Type.Literal("webp", options);
}
export function FormatRaster(options?: TSchemaOptions) {
  return Type.Union([FormatJpg(), FormatPng(), FormatWebp()], options);
}
// vector tiles
export function FormatPbf(options?: TSchemaOptions) {
  return Type.Literal("pbf", options);
}

// scheme
export function SchemeTms(options?: TSchemaOptions) {
  return Type.Literal("tms", options);
}
export function SchemeXyz(options?: TSchemaOptions) {
  return Type.Literal("xyz", options);
}
export function Scheme(options?: TSchemaOptions) {
  return Type.Union([SchemeTms(), SchemeXyz()], {
    default: "xyz",
    ...options,
  });
}

export function Format(options?: TSchemaOptions) {
  return Type.Union(
    [FormatJpg(), FormatPng(), FormatWebp(), FormatPbf()],
    options,
  );
}
export function Bounds(options?: TSchemaOptions) {
  return Type.Tuple([Longitude(), Latitude(), Longitude(), Latitude()], {
    default: [-180, -85.051_128_779_806_59, 180, 85.051_128_779_806_6],
    ...options,
  });
}
export function Center(options?: TSchemaOptions) {
  return Type.Tuple([Longitude(), Latitude(), TilejsonZoom()], {
    default: [0, 0, 0],
    ...options,
  });
}

export function Terrain(options?: TSchemaOptions) {
  return Type.Union(
    [
      Type.Literal("mapbox"),
      Type.Literal("terrarium"),
      Type.Object({
        r: Type.Number(),
        g: Type.Number(),
        b: Type.Number(),
        o: Type.Number(),
      }),
    ],
    {
      description:
        "terrain metadata; mapbox, terrarium, or custom scalars+offset",
      ...options,
    },
  );
}

export function Tilejson220(options?: TSchemaOptions) {
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

export function VectorLayer(options?: TSchemaOptions) {
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

export function VectorLayers(options?: TSchemaOptions) {
  return Type.Array(VectorLayer(), {
    default: [],
    ...options,
  });
}

export function Tilejson300Raster(options?: TSchemaOptions) {
  return Type.Object(
    {
      // MUST
      name: Type.String(),
      format: FormatRaster(),
      tilejson: Tilejson300Version(),
      tiles: Type.Array(Type.String(), {
        default: [],
      }),

      // OPTIONAL
      vector_layers: Type.Optional(VectorLayers()),
      // COMMON
      id: Type.Optional(Type.String()),
      terrain: Type.Optional(Terrain()),
      tilesize: Type.Optional(
        Type.Integer({
          minimum: 0,
        }),
      ),
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

// any alphanumeric string as well as `-`, `_` and `.` but no spaces
const TILEJSON_ID_RE = /^[\w.-]+$/;
export function TilejsonId() {
  return Type.String({
    pattern: TILEJSON_ID_RE.source,
  });
}

export function Tilejson300Vector(options?: TSchemaOptions) {
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
      id: Type.Optional(TilejsonId()),
      terrain: Type.Optional(Terrain()),
      tilesize: Type.Optional(
        Type.Integer({
          minimum: 0,
        }),
      ),
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

export function Tilejson300(options?: TSchemaOptions) {
  return Type.Union([Tilejson300Raster(), Tilejson300Vector()], {
    ...options,
  });
}

export function Tilejson(options?: TSchemaOptions) {
  return Type.Object(
    {
      // MUST
      name: Type.String(),
      format: Format(),
      tilejson: TilejsonVersion(),
      tiles: Type.Array(Type.String(), {
        default: [],
      }),
      maxzoom: TilejsonZoom(),
      minzoom: TilejsonZoom(),
      bounds: Bounds(),
      vector_layers: VectorLayers(),

      // OPTIONAL
      id: Type.Optional(TilejsonId()),
      terrain: Type.Optional(Terrain()),
      tilesize: Type.Optional(
        Type.Integer({
          minimum: 0,
        }),
      ),
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
 * UTileJson - More sane and strict `TileJson`
 */

export function ZoomSet(options?: TSchemaOptions) {
  return UInt32({
    description:
      "Zooms represented as an unsigned 32 bit int; 0-30 inclusive. 0b0000_0000_0000_0000_0000_0000_0000_0111 -> [0, 1, 2]",
    ...options,
  });
}
export function Zooms(options?: TSchemaOptions) {
  return Type.Union([
    Type.Array(
      Type.Integer({
        minimum: 0,
        maximum: 30,
      }),
      {
        uniqueItems: true,
        ...options,
      },
    ),
    ZoomSet(options),
  ]);
}

export function RasterTileSize(options?: TSchemaOptions) {
  return Type.Integer({
    minimum: 256,
    maximum: 4096,
    multipleOf: 2,
    default: 256,
    description: "Tile size in pixels",
    ...options,
  });
}

function _UTilejsonCommonProps() {
  return {
    // MUST
    name: Type.String(),
    tilejson: TilejsonVersion(),
    tiles: Type.Array(Type.String(), {
      default: [],
    }),
    maxzoom: TilejsonZoom(),
    minzoom: TilejsonZoom(),
    bounds: Bounds(),
    zooms: Type.Optional(Zooms()),

    // OPTIONAL
    id: Type.Optional(TilejsonId()),
    terrain: Type.Optional(Terrain()),
    tilesize: Type.Optional(
      Type.Integer({
        minimum: 0,
      }),
    ),
    center: Type.Optional(Type.Union([Center(), Type.Null()])),
    attribution: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    data: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    fillzoom: Type.Optional(Type.Union([TilejsonZoom(), Type.Null()])),
    grids: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    legend: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    scheme: Type.Optional(Type.Union([Scheme(), Type.Null()])),
    template: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    version: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  };
}
export function UTilejsonCommon(options?: TSchemaOptions) {
  return Type.Object(
    {
      ..._UTilejsonCommonProps(),
    },
    {
      additionalProperties: true,
      ...options,
    },
  );
}

export function UTilejsonRaster(options?: TSchemaOptions) {
  return Type.Object(
    {
      format: FormatRaster(),
      ..._UTilejsonCommonProps(),
    },
    {
      additionalProperties: true,
      ...options,
    },
  );
}

export function UTilejsonVector(options?: TSchemaOptions) {
  return Type.Object(
    {
      format: FormatPbf(),
      vector_layers: VectorLayers(),
      ..._UTilejsonCommonProps(),
    },
    {
      additionalProperties: true,
      ...options,
    },
  );
}

/**
 * Stricter `TileJson` schema with `raster` and `vector` types
 * The spreading of the `UTilejsonCommon` properties is less fancy but results in more
 * readable types... :/
 */
export function UTilejson(options?: TSchemaOptions) {
  return Type.Union([UTilejsonRaster(options), UTilejsonVector(options)]);
}

/**
 * ```ts
 * export function UTilejsonRaster(options?: SchemaOptions) {
 *   return Type.Intersect(
 *     [
 *       Type.Object({
 *         format: FormatRaster(),
 *         tilesize: Type.Optional(
 *           RasterTileSize(
 *           ),
 *         ),
 *       }),
 *       UTilejsonCommon(),
 *     ],
 *     {
 *       additionalProperties: true,
 *       ...options,
 *     },
 *   );
 * }
 *
 * export function UTilejsonVector(options?: SchemaOptions) {
 *   return Type.Intersect(
 *     [
 *       Type.Object({
 *         format: FormatPbf(),
 *         vector_layers: VectorLayers(),
 *       }),
 *       UTilejsonCommon(),
 *     ],
 *     {
 *       additionalProperties: true,
 *       ...options,
 *     },
 *   );
 * }
 * ```
 */
