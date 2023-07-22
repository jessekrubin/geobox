/**
 * A title to show when this item is clicked or hovered over
 */
type Title = string;
/**
 * A description to show when this item is clicked or hovered over
 */
type Description = string;
/**
 * A symbol to position in the center of this icon if not provided or "", no symbol is overlaid and only the marker is shown Allowed values include - Icon ID - An integer 0 through 9 - A lowercase character "a" through "z"
 */
type MarkerSymbol = string;
/**
 * The marker's color; value must follow COLOR RULES
 */
type MarkerColor = string;
/**
 * the color of a line as part of a polygon, polyline, or multigeometry value must follow COLOR RULES
 */
type Stroke = string;
/**
 * the opacity of the line component of a polygon, polyline, or multigeometry value must be a floating point number greater than or equal to zero and less or equal to than one
 */
type StrokeOpacity = number;
/**
 * the width of the line component of a polygon, polyline, or multigeometry value must be a floating point number greater than or equal to 0
 */
type StrokeWidth = number;
/**
 * the color of the interior of a polygon value must follow COLOR RULES
 */
type Fill = string;
/**
 * the opacity of the interior of a polygon. Implementations may choose to set this to 0 for line features value must be a floating point number greater than or equal to zero and less or equal to than one
 */
type FillOpacity = number;

export type SimpleStyleProperties = {
  title?: Title;
  description?: Description;
  "marker-size"?: "small" | "medium" | "large";
  "marker-symbol"?: MarkerSymbol;
  "marker-color"?: MarkerColor;
  stroke?: Stroke;
  "stroke-opacity"?: StrokeOpacity;
  "stroke-width"?: StrokeWidth;
  fill?: Fill;
  "fill-opacity"?: FillOpacity;
  [k: string]: unknown;
};
