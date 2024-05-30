import type { SchemaOptions, TNumber } from "../typebox.js";
import { Type } from "../typebox.js";
import type { TUnionVec4Vec6, TVec4, TVec6 } from "../types.js";

export type TBBox2d = TVec4;
export type TBBox3d = TVec6;
export type TBBox = TUnionVec4Vec6;
export type TBBoxSchema = TBBox | TBBox2d | TBBox3d;

export type BBoxSchemaOptions = {
  Tx?: TNumber;
  Ty?: TNumber;
  Tz?: TNumber;
} & SchemaOptions;

function _bboxOptions(options?: BBoxSchemaOptions): {
  Tx: TNumber;
  Ty: TNumber;
  Tz: TNumber;
  schemaOptions: SchemaOptions;
} {
  const {
    Tx = Type.Number(),
    Ty = Type.Number(),
    Tz = Type.Number(),
    ...schemaOptions
  } = options || {};
  return {
    Tx,
    Ty,
    Tz,
    schemaOptions,
  };
}

export function BBox2d(options?: BBoxSchemaOptions): TBBox2d {
  const { Tx, Ty, schemaOptions } = _bboxOptions(options);
  return Type.Tuple([Tx, Ty, Tx, Ty], {
    title: "bbox-2d",
    description: "Bounding Box: [minX, minY, maxX, maxY]",
    ...schemaOptions,
  });
}

export function BBox3d(options?: SchemaOptions): TBBox3d {
  const { Tx, Ty, Tz, schemaOptions } = _bboxOptions(options);
  return Type.Tuple([Tx, Ty, Tz, Tx, Ty, Tz], {
    title: "bbox-3d",
    description: "Bounding Box: [minX, minY, minZ, maxX, maxY, maxZ]",
    ...schemaOptions,
  });
}

export function BBox(options?: SchemaOptions) {
  return Type.Union([BBox2d(options), BBox3d(options)], {
    title: "bbox",
    description:
      "Bounding Box: [minX, minY, maxX, maxY] or [minX, minY, minZ, maxX, maxY, maxZ]",
    ...options,
  });
}

export function GeoBoundingBox(options?: BBoxSchemaOptions) {
  const { Tx = Type.Number(), Ty = Type.Number(), ..._options } = options || {};
  return Type.Object(
    {
      west: Tx,
      north: Ty,
      east: Tx,
      south: Ty,
    },
    {
      title: "geo-bounding-box",
      description: "GeoJSON Bounding Box",
      ..._options,
    },
  );
}

export function NonGeoBoundingBox(options?: BBoxSchemaOptions) {
  const { Tx = Type.Number(), Ty = Type.Number(), ..._options } = options || {};
  return Type.Object(
    {
      left: Tx,
      top: Ty,
      right: Tx,
      bottom: Ty,
    },
    {
      title: "non-geo-bounding-box",
      description: "Non-Geo Bounding Box",
      ..._options,
    },
  );
}
