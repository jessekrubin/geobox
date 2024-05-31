import type { SchemaOptions, TNumber } from "../typebox.js";
import { Type } from "../typebox.js";
import type { TUnionVec4Vec6, TVec4, TVec6 } from "../types.js";

export type TBBox2d = TVec4;
export type TBBox3d = TVec6;
export type TBBox = TUnionVec4Vec6;
export type TBBoxSchema = TBBox | TBBox2d | TBBox3d;

/**
 * Bounding Box Options for X
 *
 * Overly complicated version:
 *
 * ```
 * export type BBoxOptionsX<T> =
 *   | { x: T; xmin?: T; xmax?: never }
 *   | { x: T; xmin?: never; xmax?: T }
 *   | { x?: never; xmin: T; xmax: T }
 *   | { x?: never; xmin?: T; xmax?: never }
 *   | { x?: never; xmin?: never; xmax?: T };
 * export type BBoxOptionsY<T> =
 *   | { y: T; ymin?: T; ymax?: never }
 *   | { y: T; ymin?: never; ymax?: T }
 *   | { y?: never; ymin: T; ymax: T }
 *   | { y?: never; ymin?: T; ymax?: never }
 *   | { y?: never; ymin?: never; ymax?: T };
 * export type BBoxOptionsZ<T> =
 *   | { z: T; zmin?: T; zmax?: never }
 *   | { z: T; zmin?: never; zmax?: T }
 *   | { z?: never; zmin: T; zmax: T }
 *   | { z?: never; zmin?: T; zmax?: never }
 *   | { z?: never; zmin?: never; zmax?: T };
 *
 * export type BBoxSchemaOptions =
 *   BBoxOptionsX<TNumber>
 *   & BBoxOptionsY<TNumber>
 *   & BBoxOptionsZ<TNumber>
 *   & SchemaOptions;
 * ```
 */
export type BBoxOptions<T> = {
  x?: T;
  xmin?: T;
  xmax?: T;
  y?: T;
  ymin?: T;
  ymax?: T;
  z?: T;
  zmin?: T;
  zmax?: T;
};
export type BBoxSchemaOptions = BBoxOptions<TNumber> & SchemaOptions;

/**
 * Bounding Box Options for x, y, z
 *
 * for each x, y, z, there are min/max/both options (eg(x): x, xmin, xmax);
 * you can specify any of the three, but no more than 2
 * @param options
 */
export function bboxOptions(options?: BBoxSchemaOptions): {
  xmin: TNumber;
  xmax: TNumber;
  ymin: TNumber;
  ymax: TNumber;
  zmin: TNumber;
  zmax: TNumber;
  schemaOptions: SchemaOptions;
} {
  const {
    xmin = options?.xmin || options?.x || Type.Number(),
    xmax = options?.xmax || options?.x || Type.Number(),
    ymin = options?.ymin || options?.y || Type.Number(),
    ymax = options?.ymax || options?.y || Type.Number(),
    zmin = options?.zmin || options?.z || Type.Number(),
    zmax = options?.zmax || options?.z || Type.Number(),
    ...schemaOptions
  } = options || {};

  return {
    xmin,
    xmax,
    ymin,
    ymax,
    zmin,
    zmax,
    schemaOptions,
  };
}

export function BBox2d(options?: BBoxSchemaOptions): TBBox2d {
  const { xmin, xmax, ymin, ymax, schemaOptions } = bboxOptions(options);
  return Type.Tuple([xmin, ymin, xmax, ymax], {
    title: "bbox-2d",
    description: "Bounding Box: [minx, miny, maxx, maxy]",
    ...schemaOptions,
  });
}

export function BBox3d(options?: BBoxSchemaOptions): TBBox3d {
  const { xmin, xmax, ymin, ymax, zmin, zmax, schemaOptions } =
    bboxOptions(options);

  return Type.Tuple([xmin, ymin, zmin, xmax, ymax, zmax], {
    title: "bbox-3d",
    description: "Bounding Box: [minx, miny, minz, maxx, maxy, maxz]",
    ...schemaOptions,
  });
}

export function BBox(options?: SchemaOptions) {
  const { xmin, xmax, ymin, ymax, zmin, zmax, schemaOptions } =
    bboxOptions(options);
  return Type.Union(
    [
      Type.Tuple([xmin, ymin, xmax, ymax]),
      Type.Tuple([xmin, ymin, zmin, xmax, ymax, zmax]),
    ],
    {
      title: "bbox",
      description:
        "Bounding Box: [minx, miny, maxx, maxy] | [minx, miny, minz, maxx, maxy, maxz]",
      ...schemaOptions,
    },
  );
}

export function GeoBoundingBox(options?: BBoxSchemaOptions) {
  const { xmin, xmax, ymin, ymax, schemaOptions } = bboxOptions(options);
  return Type.Object(
    {
      west: xmin,
      north: ymax,
      east: xmax,
      south: ymin,
    },
    {
      title: "geo-bounding-box",
      description: "GeoJSON Bounding Box",
      ...schemaOptions,
    },
  );
}

export function NonGeoBoundingBox(options?: BBoxSchemaOptions) {
  const { xmin, xmax, ymin, ymax, schemaOptions } = bboxOptions(options);

  return Type.Object(
    {
      left: xmin,
      top: ymax,
      right: xmax,
      bottom: ymin,
    },
    {
      title: "non-geo-bounding-box",
      description: "Non-Geo Bounding Box",
      ...schemaOptions,
    },
  );
}
