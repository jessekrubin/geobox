import type { SchemaOptions } from "../typebox.js";
import { Type } from "../typebox.js";
import type { TUnionVec4Vec6, TVec4, TVec6 } from "../types.js";

export type TBBox2d = TVec4;
export type TBBox3d = TVec6;
export type TBBox = TUnionVec4Vec6;
export type TBBoxSchema = TBBox | TBBox2d | TBBox3d;

export function BBox2d(options?: SchemaOptions): TBBox2d {
  return Type.Tuple(
    [Type.Number(), Type.Number(), Type.Number(), Type.Number()],
    {
      title: "bbox-2d",
      description: "Bounding Box: [minX, minY, maxX, maxY]",
      ...options,
    },
  );
}

export function BBox3d(options?: SchemaOptions): TBBox3d {
  return Type.Tuple(
    [
      Type.Number(),
      Type.Number(),
      Type.Number(),
      Type.Number(),
      Type.Number(),
      Type.Number(),
    ],
    {
      title: "bbox-3d",
      description: "Bounding Box: [minX, minY, minZ, maxX, maxY, maxZ]",
      ...options,
    },
  );
}

export function BBox(options?: SchemaOptions) {
  return Type.Union([BBox2d(), BBox3d()], {
    title: "bbox",
    description:
      "Bounding Box: [minX, minY, maxX, maxY] or [minX, minY, minZ, maxX, maxY, maxZ]",
    ...options,
  });
}
