import { Type } from "./typebox.js";
import type { SchemaOptions } from "./typebox.js";

export const MIN_ZOOM = 0 as const;
export const MAX_ZOOM = 32 as const;
export type Zoom =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32;
export const isZoom = (x: unknown): x is Zoom => {
  return typeof x === "number" && Number.isInteger(x) && x >= MIN_ZOOM && x <= MAX_ZOOM;
};

export type ZoomRange = {
  minZoom: number;
  maxZoom: number;
};

export const TileZoom = (zoom: number, options?: SchemaOptions) => {
  if (!isZoom(zoom)) {
    throw new Error(`Invalid zoom: ${zoom}`);
  }
  return Type.Literal(zoom, options);
};

export const TileZoomRange = (options?: SchemaOptions & ZoomRange) => {
  return Type.Integer({
    minimum: MIN_ZOOM,
    maximum: MAX_ZOOM,
    ...options,
  });
};

export const TileZoomXY = (zoom: number, options?: SchemaOptions) => {
  if (!isZoom(zoom)) {
    throw new Error(`Invalid zoom: ${zoom}`);
  }
  return Type.Integer({
    minimum: 0,
    maximum: 2 ** zoom - 1,
    ...options,
  });
};

export const TileAtZoom = (zoom: number, options?: SchemaOptions) => {
  if (!isZoom(zoom)) {
    throw new Error(`Invalid zoom: ${zoom}`);
  }
  return Type.Object(
    {
      z: Type.Literal(zoom),
      x: TileZoomXY(zoom),
      y: TileZoomXY(zoom),
      // z: TileZoom(zoom),
      // x: Type.Integer(
      //   {
      //     minimum: 0,
      //     maximum: 2 ** zoom - 1,
      //   }
      // ),
      // y: Type.Integer(
      //   {
      //     minimum: 0,
      //     maximum: 2 ** zoom - 1,
      //   }
      // ),
    },
    options,
  );
};
