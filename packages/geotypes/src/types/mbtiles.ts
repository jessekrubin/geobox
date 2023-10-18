export type MbtilesMetadataRow = {
  name: string;
  value: string;
};
export type MbtilesMetadata = MbtilesMetadataRow[];

export type MbtilesTilesRow<TTileData = unknown> = {
  zoom_level: number;
  tile_column: number;
  tile_row: number;
  tile_data: TTileData;
};
