import { z } from "zod";

const simplestyleTitle = z.string({ description: "A title to show when this item is clicked or hovered over" });
const simplestyleDescription = z.string({
  description: "A description to show when this item is clicked or hovered over",
});
const simplestyleMarkerSymbol = z.string({
  description:
    'A symbol to position in the center of this icon if not provided or "", no symbol is overlaid and only the marker is shown Allowed values include - Icon ID - An integer 0 through 9 - A lowercase character "a" through "z"',
});
const simplestyleMarkerColor = z.string({ description: "The marker's color; value must follow COLOR RULES" });
const simplestyleStroke = z.string({
  description: "The color of a line as part of a polygon, polyline, or multigeometry value must follow COLOR RULES",
});
const simplestyleStrokeOpacity = z
  .number({
    description:
      "The opacity of the line component of a polygon, polyline, or multigeometry value must be a floating point number greater than or equal to zero and less or equal to than one",
  })
  .min(0)
  .max(1)
  .refine((value) => value >= 0 && value <= 1);
const StrokeWidth = z
  .number({
    description:
      "The width of the line component of a polygon, polyline, or multigeometry value must be a floating point number greater than or equal to 0",
  })
  .min(0)
  .refine((value) => value >= 0);
const Fill = z.string({ description: "The color of the interior of a polygon value must follow COLOR RULES" });
const simplestyleFillOpacity = z
  .number({
    description:
      "The opacity of the interior of a polygon. Implementations may choose to set this to 0 for line features value must be a floating point number greater than or equal to zero and less or equal to than one",
  })
  .min(0)
  .max(1)
  .refine((value) => value >= 0 && value <= 1);

const simplestyleMarkerSize = z.enum(["small", "medium", "large"], {
  description: "The marker's size; values can be 'small', 'medium', 'large'",
});
export const simplestyleProperties = () =>
  z.object({
    title: simplestyleTitle.optional(),
    description: simplestyleDescription.optional(),
    "marker-size": simplestyleMarkerSize.optional(),
    "marker-symbol": simplestyleMarkerSymbol.optional(),
    "marker-color": simplestyleMarkerColor.optional(),
    stroke: simplestyleStroke.optional(),
    "stroke-opacity": simplestyleStrokeOpacity.optional(),
    "stroke-width": StrokeWidth.optional(),
    fill: Fill.optional(),
    "fill-opacity": simplestyleFillOpacity.optional(),
  });

export { simplestyleProperties as simplestyle };
