import type { SchemaOptions, TSchema } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

function SpriteStretch() {
  return Type.Array(Type.Tuple([Type.Integer(), Type.Integer()]), {
    description:
      "stretchX/stretchY: An array of two-element arrays, consisting of two numbers that represent the from position and the to position of areas that can be stretched.",
  });
}

function SpriteTextFit(options?: SchemaOptions) {
  return Type.Union(
    [
      Type.Literal("stretchOrShrink", {
        description:
          "The image will be resized on the specified axis to tightly fit the content rectangle to target text. This is the same as not being defined.",
      }),
      Type.Literal("stretchOnly", {
        description:
          "The image will be resized on the specified axis to fit the content rectangle to the target text, but will not fall below the aspect ratio of the original content rectangle if the other axis is set to proportional.",
      }),
      Type.Literal("proportional", {
        description:
          "The image will be resized on the specified axis to fit the content rectangle to the target text and will resize the other axis to maintain the aspect ratio of the content rectangle.",
      }),
    ],
    options,
  );
}

export function SpriteEntry(options?: SchemaOptions) {
  return Type.Object(
    {
      height: Type.Integer({
        description: "Height of the icon in pixels.",
      }),
      pixel_ratio: Type.Integer({
        description: "Pixel ratio of the sprite. Defaults to 1.",
      }),
      width: Type.Integer({
        description: "Width of the icon in pixels.",
      }),
      x: Type.Integer({
        description: "X coordinate of the icon image in the sprite.",
      }),
      y: Type.Integer({
        description: "Y coordinate of the icon image in the sprite.",
      }),
      content: Type.Optional(
        Type.Tuple(
          [Type.Integer(), Type.Integer(), Type.Integer(), Type.Integer()],
          {
            description:
              "Content rect: content: An array of four numbers, with the first two specifying the left, top corner, and the last two specifying the right, bottom corner. If present, and if the icon uses icon-text-fit, the symbol's text will be fit inside the content box.",
          },
        ),
      ),
      stretchX: Type.Optional(SpriteStretch()),
      stretchY: Type.Optional(SpriteStretch()),
      sdf: Type.Optional(
        Type.Boolean({
          description:
            "sdf: Boolean. If true then the image is handled as a signed-distance field (SDF) and its color can be set at runtime using the icon-color and icon-halo-color properties. Defaults to false.",
          default: false,
        }),
      ),
      mask: Type.Optional(
        Type.Boolean({
          description:
            "mask: Boolean. If true then the image is treated as a mask. Defaults to false. (USED BY DECK.GL)",
        }),
      ),

      textFitWidth: Type.Optional(
        SpriteTextFit({
          description:
            "If `icon-text-fit` is used in a layer with this image, this option defines constraints on the horizontal scaling of the image.",
        }),
      ),
      textFitHeight: Type.Optional(
        SpriteTextFit({
          description:
            "If `icon-text-fit` is used in a layer with this image, this option defines constraints on the vertical scaling of the image.",
        }),
      ),
    },
    options,
  );
}

/**
 * Returns a schema for sprite.json file as described by maplibro (maplibre but for bros)
 * @param key
 * @param options
 * @returns martins sprite catalog entry json schema (typebox)
 */
export function SpriteJson(key?: TSchema, options?: SchemaOptions) {
  return Type.Record(key || Type.String(), SpriteEntry(), options);
}
