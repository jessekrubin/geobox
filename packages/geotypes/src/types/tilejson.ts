import type { Nullable } from "../utypes.js";

export type TilejsonRasterFormat = "png" | "jpg" | "webp";
export type TilejsonVectorFormat = "pbf";
export type TilejsonFormat = TilejsonRasterFormat | TilejsonVectorFormat;

export type TilejsonVectorLayer = {
  id: string;
  fields: Record<string, string>;
  description?: string | null;
  maxzoom?: number | null;
  minzoom?: number | null;
};

export type TilejsonVectorLayers = TilejsonVectorLayer[];

export type TilejsonCommon<TFormat extends TilejsonFormat = TilejsonFormat> = {
  // required
  name: string;
  format: TFormat;
  tilejson: string;
  tiles: string[];

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
  vector_layers?: TilejsonVectorLayers;
} & TilejsonCommon<TilejsonRasterFormat>;

export type Tilejson300Vector = {
  vector_layers: TilejsonVectorLayers;
} & TilejsonCommon<TilejsonVectorFormat>;

export type Tilejson300 = Tilejson300Raster | Tilejson300Vector;
