export type TilejsonRasterFormat = "png" | "jpg" | "webp";
export type TilejsonVectorFormat = "pbf";

export type Nullable<T> = T | null;

export type VectorLayer = {
  id: string;
  fields: Record<string, string>;
  description?: string | null;
  maxzoom?: number | null;
  minzoom?: number | null;
};

export type VectorLayers = VectorLayer[];

export type TilejsonCommon = {
  // required
  name: string;
  format: TilejsonRasterFormat | TilejsonVectorFormat;
  tilejson: string;
  tiles: string[];
  // eslint-disable-next-line camelcase
  vector_layers: VectorLayers;

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
  vector_layers?: VectorLayers;
} & TilejsonCommon;

export type Tilejson300Vector = {
  format: TilejsonVectorFormat;
  vector_layers: VectorLayers;
} & TilejsonCommon;

export type Tilejson300 = Tilejson300Raster | Tilejson300Vector;

export type DeckglTileJson = {
  tilejson: string;
  tiles: string[];
  // eslint-disable-next-line camelcase, @typescript-eslint/no-explicit-any
  vector_layers: any[];
  attribution?: string;
  scheme?: string;
  maxzoom?: number;
  minzoom?: number;
  version?: string;
};
