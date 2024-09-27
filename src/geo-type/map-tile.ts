import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export const MIN_ZOOM = 0;
export const MAX_ZOOM = 31;
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
  | 31;
export function isZoom(x: unknown): x is Zoom {
  return (
    typeof x === "number" &&
    Number.isInteger(x) &&
    x >= MIN_ZOOM &&
    x <= MAX_ZOOM
  );
}

export type ZoomRange = {
  minZoom: number;
  maxZoom: number;
};

export function TileZoom(zoom: number, options?: SchemaOptions) {
  if (!isZoom(zoom)) {
    throw new Error(`Invalid zoom: ${zoom}`);
  }
  return Type.Literal(zoom, options);
}

export function TileZoomRange(options?: SchemaOptions & ZoomRange) {
  return Type.Integer({
    minimum: MIN_ZOOM,
    maximum: MAX_ZOOM,
    ...options,
  });
}

export function TileZoomXY(zoom: number, options?: SchemaOptions) {
  if (!isZoom(zoom)) {
    throw new Error(`Invalid zoom: ${zoom}`);
  }
  return Type.Integer({
    minimum: 0,
    maximum: 2 ** zoom - 1,
    ...options,
  });
}

export function TileAtZoom(zoom: number, options?: SchemaOptions) {
  if (!isZoom(zoom)) {
    throw new Error(`Invalid zoom: ${zoom}`);
  }
  return Type.Object(
    {
      z: Type.Literal(zoom),
      x: TileZoomXY(zoom),
      y: TileZoomXY(zoom),
    },
    options,
  );
}
