import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { Tms2dPoint } from "./2d-point.js";
import { TmsCrs } from "./crs.js";

export function Tms2dBoundingBox(options?: TSchemaOptions) {
  return Type.Object(
    {
      lowerLeft: Tms2dPoint(),
      upperRight: Tms2dPoint(),
      crs: Type.Optional(TmsCrs()),
      orderedAxes: Type.Optional(
        Type.Array(Type.String(), {
          minItems: 2,
          maxItems: 2,
        }),
      ),
    },
    {
      ...options,
      title: "2DBoundingBox",
      description:
        "Minimum bounding rectangle surrounding a 2D resource in the CRS indicated elsewhere",
    },
  );
}
