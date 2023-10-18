import { z } from "zod";
import { latitude, longitude } from "./geojson.js";

export const tilejsonSemver = () => z.string().regex(/\d+\.\d+\.\d+\w?[\w\d]*/);

export const tilejsonVersionLike = () => z.union([tilejsonSemver(), z.string()]);
export const tilejsonZoom = () => z.number().int().min(0).max(30);

// raster tiles
export const tilejsonFormatJpg = () => z.literal("jpg");
export const tilejsonFormatPng = () => z.literal("png");
// vector tiles
export const tilejsonFormatPbf = () => z.literal("pbf");
export const tilejsonFormat = () => z.union([tilejsonFormatJpg(), tilejsonFormatPng(), tilejsonFormatPbf()]);

// scheme
export const tilejsonSchemeTms = () => z.literal("tms");
export const tilejsonSchemeXyz = () => z.literal("xyz");
export const tilejsonScheme = () => z.union([tilejsonSchemeTms(), tilejsonSchemeXyz()]).default("xyz");

export const tilejsonBounds = () =>
  z
    .tuple([longitude(), latitude(), longitude(), latitude()])
    .default([-180, -85.051_128_779_806_59, 180, 85.051_128_779_806_6]);
export const tilejsonCenter = () => z.tuple([longitude(), latitude(), tilejsonZoom()]).default([0, 0, 0]);

export const tilejson220 = () =>
  z
    .object({
      // MUST
      name: z.string(),
      format: tilejsonFormat(),
      tilejson: z.string().default("2.2.0"),
      tiles: z.array(z.string()).default([]),
      // OPTIONAL
      attribution: z.union([z.string(), z.null()]).optional(),
      bounds: z.union([tilejsonBounds(), z.null()]).optional(),
      center: z.union([tilejsonCenter(), z.null()]).optional(),
      data: z.union([z.array(z.string()), z.null()]).optional(),
      description: z.union([z.string(), z.null()]).optional(),
      grids: z.union([z.array(z.string()), z.null()]).optional(),
      legend: z.union([z.string(), z.null()]).optional(),
      maxzoom: z.union([z.number(), z.null()]).optional(),
      minzoom: z.union([z.number(), z.null()]).optional(),
      scheme: z.union([tilejsonScheme(), z.null()]).optional(),
      template: z.union([z.string(), z.null()]).optional(),
      version: z.union([tilejsonVersionLike(), z.null()]).optional(),
    })
    .nonstrict();

export const tilejsonVectorLayer = () =>
  z
    .object({
      id: z.string(),
      fields: z.record(z.string()),
      description: z.union([z.string(), z.null()]).optional(),
      maxzoom: z.union([tilejsonZoom(), z.null()]).optional(),
      minzoom: z.union([tilejsonZoom(), z.null()]).optional(),
    })
    .nonstrict();

export const tilejsonVectorLayers = () => z.array(tilejsonVectorLayer()).default([]);

export const tilejson300Raster = () =>
  z
    .object({
      // MUST
      name: z.string(),
      format: z.union([z.literal("png"), z.literal("jpg")]),
      tilejson: z.string().default("3.0.0"),
      tiles: z.array(z.string()).default([]),
      // OPTIONAL
      vector_layers: tilejsonVectorLayers().optional(),
      // COMMON
      attribution: z.union([z.string(), z.null()]).optional(),
      bounds: z.union([tilejsonBounds(), z.null()]).optional(),
      center: z.union([tilejsonCenter(), z.null()]).optional(),
      data: z.union([z.array(z.string()), z.null()]).optional(),
      description: z.union([z.string(), z.null()]).optional(),
      fillzoom: z.union([tilejsonZoom(), z.null()]).optional(),
      grids: z.union([z.array(z.string()), z.null()]).optional(),
      legend: z.union([z.string(), z.null()]).optional(),
      maxzoom: z.union([tilejsonZoom(), z.null()]).optional(),
      minzoom: z.union([tilejsonZoom(), z.null()]).optional(),
      scheme: z.union([tilejsonScheme(), z.null()]).optional(),
      template: z.union([z.string(), z.null()]).optional(),
      version: z.union([z.string(), z.null()]).optional(),
    })
    .nonstrict();

export const tilejson300Vector = () =>
  z
    .object({
      // MUST
      name: z.string(),
      format: z.literal("pbf"),
      tilejson: z.string().default("3.0.0"),
      tiles: z.array(z.string()).default([]),
      // required for vector tiles
      vector_layers: tilejsonVectorLayers(),
      // OPTIONAL
      attribution: z.union([z.string(), z.null()]).optional(),
      bounds: z.union([z.array(z.number()), z.null()]).optional(),
      center: z.union([z.array(z.number()), z.null()]).optional(),
      data: z.union([z.array(z.string()), z.null()]).optional(),
      description: z.union([z.string(), z.null()]).optional(),
      fillzoom: z.union([tilejsonZoom(), z.null()]).optional(),
      grids: z.union([z.array(z.string()), z.null()]).optional(),
      legend: z.union([z.string(), z.null()]).optional(),
      maxzoom: z.union([tilejsonZoom(), z.null()]).optional(),
      minzoom: z.union([tilejsonZoom(), z.null()]).optional(),
      scheme: z.union([tilejsonScheme(), z.null()]).optional(),
      template: z.union([z.string(), z.null()]).optional(),
      version: z.union([z.string(), z.null()]).optional(),
    })
    .nonstrict();

export const Tilejson300 = () => z.union([tilejson300Raster(), tilejson300Vector()]);
