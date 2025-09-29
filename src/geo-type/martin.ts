/**
 * maplibre/martin server schemas
 */

import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";

/**
 * Returns a schema for martin tile catalog entry
 * @param options
 * @returns martins tile catalog entry json schema (typebox)
 */
export function TileCatalogEntry(options?: TSchemaOptions) {
  return Type.Object(
    {
      content_type: Type.String(),
      content_encoding: Type.Optional(Type.String()),
      name: Type.Optional(Type.String()),
      description: Type.Optional(Type.String()),
      attribution: Type.Optional(Type.String()),
    },
    options,
  );
}

/**
 * Returns a schema for martin tile catalog
 * @param options
 * @returns martins tile catalog json schema (typebox)
 */
export function TileCatalog(options?: TSchemaOptions) {
  return Type.Record(Type.String(), TileCatalogEntry(), options);
}

/**
 * Returns a schema for martin sprite catalog entry
 * @param options
 * @returns martins sprite catalog entry json schema (typebox)
 */
export function SpriteCatalog(options?: TSchemaOptions) {
  return Type.Record(
    Type.String(),
    Type.Object({
      images: Type.Array(Type.String()),
    }),
    options,
  );
}

/**
 * Returns a schema for martin font catalog entry
 * @param options
 * @returns martins font catalog entry json schema (typebox)
 */
export function FontCatalogEntry(options?: TSchemaOptions) {
  return Type.Object(
    {
      family: Type.String(),
      style: Type.String(),
      glyphs: Type.Integer(),
      start: Type.Integer(),
      end: Type.Integer(),
    },
    options,
  );
}

/**
 * Returns a schema for martin font catalog
 * @param options
 * @returns martins font catalog json schema (typebox)
 */
export function FontCatalog(options?: TSchemaOptions) {
  return Type.Record(Type.String(), FontCatalogEntry(), options);
}

/**
 * Returns a schema for martin server catalog
 * @param options
 * @returns martins server catalog json schema (typebox)
 */
export function MartinCatalog(options?: TSchemaOptions) {
  return Type.Object(
    {
      tiles: TileCatalog(),
      sprites: SpriteCatalog(),
      fonts: FontCatalog(),
    },
    {
      description: "Martin server catalog",
      ...options,
    },
  );
}
