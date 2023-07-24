import type { Nullable } from "../utility-types.js";

export type TilejsonRasterFormat = "png" | "jpg" | "webp";
export type TilejsonVectorFormat = "pbf";


export type TilejsonVectorLayer = {
  id: string;
  fields: Record<string, string>;
  description?: string | null;
  maxzoom?: number | null;
  minzoom?: number | null;
};

export type TilejsonVectorLayers = TilejsonVectorLayer[];

export type TilejsonCommon = {
  // required
  name: string;
  format: TilejsonRasterFormat | TilejsonVectorFormat;
  tilejson: string;
  tiles: string[];
  // eslint-disable-next-line camelcase
  vector_layers: TilejsonVectorLayers;

  // optional
  version?: Nullable<string>;
  description?: Nullable<string>;
  minzoom?: Nullable<number>;
  maxzoom?: Nullable<number>;
  bounds?: Nullable<number[]>;
  center?: Nullable<number[]>;
  attribution?: Nullable<string>;
  template?: Nullable<string>;
  scheme?: Nullable<string>;
  legend?: Nullable<string>;
  grids?: Nullable<string[]>;
  data?: Nullable<string[]>;
  fillzoom?: Nullable<number>;
};

export type Tilejson300Raster = {
  format: TilejsonRasterFormat;
  vector_layers?: TilejsonVectorLayers;
} & TilejsonCommon;

export type Tilejson300Vector = {
  format: TilejsonVectorFormat;
  vector_layers: TilejsonVectorLayers;
} & TilejsonCommon;

export type Tilejson300 = Tilejson300Raster | Tilejson300Vector;
