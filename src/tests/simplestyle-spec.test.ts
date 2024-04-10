import { expect, test } from "vitest";
import { Kind, OptionalKind } from "@sinclair/typebox";
import * as geobox from "../index.js";

/**
 * FROM: https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
 */
const SIMPLESTYLE_SPEC_EG = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0, 0],
      },
      properties: {
        // OPTIONAL: default ""
        // A title to show when this item is clicked or
        // hovered over
        title: "A title",

        // OPTIONAL: default ""
        // A description to show when this item is clicked or
        // hovered over
        description: "A description",

        // OPTIONAL: default "medium"
        // specify the size of the marker. sizes
        // can be different pixel sizes in different
        // implementations
        // Value must be one of
        // "small"
        // "medium"
        // "large"
        "marker-size": "medium",

        // OPTIONAL: default ""
        // a symbol to position in the center of this icon
        // if not provided or "", no symbol is overlaid
        // and only the marker is shown
        // Allowed values include
        // - Icon ID
        // - An integer 0 through 9
        // - A lowercase character "a" through "z"
        "marker-symbol": "bus",

        // OPTIONAL: default "7e7e7e"
        // the marker's color
        //
        // value must follow COLOR RULES
        "marker-color": "#fff",

        // OPTIONAL: default "555555"
        // the color of a line as part of a polygon, polyline, or
        // multigeometry
        //
        // value must follow COLOR RULES
        stroke: "#555555",

        // OPTIONAL: default 1.0
        // the opacity of the line component of a polygon, polyline, or
        // multigeometry
        //
        // value must be a floating point number greater than or equal to
        // zero and less or equal to than one
        "stroke-opacity": 1,

        // OPTIONAL: default 2
        // the width of the line component of a polygon, polyline, or
        // multigeometry
        //
        // value must be a floating point number greater than or equal to 0
        "stroke-width": 2,

        // OPTIONAL: default "555555"
        // the color of the interior of a polygon
        //
        // value must follow COLOR RULES
        fill: "#555555",

        // OPTIONAL: default 0.6
        // the opacity of the interior of a polygon. Implementations
        // may choose to set this to 0 for line features.
        //
        // value must be a floating point number greater than or equal to
        // zero and less or equal to than one
        "fill-opacity": 0.5,
      },
    },
  ],
};

const schema = geobox.simplestyle.SimpleStyleProperties();
const c = geobox.jsonschema(schema);

test("simplestyle-spec-properrties", () => {
  const parsed = c.parse(SIMPLESTYLE_SPEC_EG.features[0].properties);
  expect(parsed).toEqual({
    title: "A title",
    description: "A description",
    "marker-size": "medium",
    "marker-symbol": "bus",
    "marker-color": "#fff",
    stroke: "#555555",
    "stroke-opacity": 1,
    "stroke-width": 2,
    fill: "#555555",
    "fill-opacity": 0.5,
  });

  expect(c.is(parsed)).toBe(true);
});

test("invalid color", () => {
  const invalidColors = {
    ...SIMPLESTYLE_SPEC_EG.features[0].properties,
    "marker-color": "red",
    stroke: "11111111111111",
    fill: "555555",
  };
  expect(c.is(invalidColors)).toBe(false);
  const maybe = c.tryFrom(invalidColors);
  if (maybe.success) {
    throw new Error("Expected failure");
  }
  // maybe.success
  const expected = [
    {
      type: 53,
      schema: {
        default: "#7e7e7e",
        title: "Marker Color",
        description: "The marker's color; value must follow COLOR RULES",
        pattern: "^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$",
        type: "string",
        [Kind]: "String",
        [OptionalKind]: "Optional",
      },
      path: "/marker-color",
      value: "red",
      message: "Expected string to match '^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$'",
    },
    {
      type: 53,
      schema: {
        default: "#555555",
        title: "Stroke",
        description:
          "the color of a line as part of a polygon, polyline, or multigeometry value must follow COLOR RULES",
        pattern: "^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$",
        type: "string",
        [Kind]: "String",
        [OptionalKind]: "Optional",
      },
      path: "/stroke",
      value: "11111111111111",
      message: "Expected string to match '^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$'",
    },
  ];
  expect(maybe.error.errors).toEqual(expected);
});
