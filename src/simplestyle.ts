/**
 * Reference: https://raw.githubusercontent.com/mapbox/simplestyle-spec/master/1.1.0/README.md
 */
import { Type } from "./typebox.js";

export const SimpleStyleMarkerSizeSmall = () => Type.Literal("small");
export const SimpleStyleMarkerSizeMedium = () => Type.Literal("medium");
export const SimpleStyleMarkerSizeLarge = () => Type.Literal("large");

export const SimpleStyleMarkerSize = () =>
  Type.Union([SimpleStyleMarkerSizeSmall(), SimpleStyleMarkerSizeMedium(), SimpleStyleMarkerSizeLarge()], {
    default: SimpleStyleMarkerSizeMedium(),
  });

export const SimpleStyleProperties = () =>
  Type.Object({
    title: Type.Optional(
      Type.String({
        default: "",
        title: "Title",
        description: "A title to show when this item is clicked or hovered over",
      }),
    ),
    description: Type.Optional(
      Type.String({
        default: "",
        title: "Description",
        description: "A description to show when this item is clicked or hovered over",
      }),
    ),
    "marker-size": Type.Optional(SimpleStyleMarkerSize()),
    "marker-symbol": Type.Optional(
      Type.String({
        default: "",
        title: "Marker Symbol",
        description:
          'A symbol to position in the center of this icon if not provided or "", no symbol is overlaid and only the marker is shown Allowed values include - Icon ID - An integer 0 through 9 - A lowercase character "a" through "z"',
      }),
    ),
    "marker-color": Type.Optional(
      Type.String({
        default: "#7e7e7e",
        title: "Marker Color",
        description: "The marker's color; value must follow COLOR RULES",
      }),
    ),
    stroke: Type.Optional(
      Type.String({
        default: "#555555",
        title: "Stroke",
        description:
          "the color of a line as part of a polygon, polyline, or multigeometry value must follow COLOR RULES",
      }),
    ),
    "stroke-opacity": Type.Optional(
      Type.Number({
        default: 1.0,
        title: "Stroke Opacity",
        description:
          "the opacity of the line component of a polygon, polyline, or multigeometry value must be a floating point number greater than or equal to zero and less or equal to than one",
        minimum: 0.0,
        maximum: 1.0,
      }),
    ),
    "stroke-width": Type.Optional(
      Type.Number({
        default: 2,
        title: "Stroke Width",
        description:
          "the width of the line component of a polygon, polyline, or multigeometry value must be a floating point number greater than or equal to 0",
        minimum: 0,
      }),
    ),
    fill: Type.Optional(
      Type.String({
        default: "#555555",
        title: "Fill",
        description: "the color of the interior of a polygon value must follow COLOR RULES",
      }),
    ),
    "fill-opacity": Type.Optional(
      Type.Number({
        default: 0.6,
        title: "Fill Opacity",
        maximum: 1.0,
        minimum: 0.0,
        description:
          "the opacity of the interior of a polygon. Implementations may choose to set this to 0 for line features value must be a floating point number greater than or equal to zero and less or equal to than one",
      }),
    ),
  });
