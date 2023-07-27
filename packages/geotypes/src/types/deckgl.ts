export type DeckglTilejson = {
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
