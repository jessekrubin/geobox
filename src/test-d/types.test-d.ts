/* eslint-disable no-console */
import type { Static } from "typebox";
import { Type } from "typebox";
import { Compile } from "typebox/compile";
import { assertType, expectTypeOf, test } from "vitest";
import * as geobox from "../index.js";

test("test point schema builder", () => {
  const pDingo: {
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
    properties: {
      dingo: string;
    };
  } = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      dingo: "bash",
    },
  };
  const pointSchemaBabydog = geobox.PointFeature({
    properties: Type.Object({ dingo: Type.String() }),
  });

  type PointFeatureBabydog = Static<typeof pointSchemaBabydog>;
  type PointFeatureBabydogBBox = PointFeatureBabydog["bbox"];

  type BabydogProperties = PointFeatureBabydog["properties"];

  // @ts-expect-error invalid properties
  const _badProps: BabydogProperties = { dingo: 123 };
  const _goodProps: BabydogProperties = {
    dingo: "bash",
  };

  const _bbox2: PointFeatureBabydogBBox = [0, 0, 0, 0];
  const _bbox3: PointFeatureBabydogBBox = [0, 0, 0, 0, 0, 0];

  const _bboxUndef: PointFeatureBabydogBBox = undefined;

  const _bboxBad = { a: 123 } satisfies PointFeatureBabydogBBox;

  console.debug({
    _bbox2,
    _bbox3,
    _bboxUndef,
    _bboxBad,
  });

  const pointSchemaDingoValidator = Compile(pointSchemaBabydog);
  if (pointSchemaDingoValidator.Check(pDingo)) {
    const t = pDingo;
    assertType<{
      type: "Feature";
      geometry: {
        type: "Point";
        coordinates: [number, number];
      };
      properties: {
        dingo: string;
      };
    }>(t);

    expectTypeOf(t.properties).toEqualTypeOf<{
      dingo: string;
    }>();

    // eslint-disable-next-line unused-imports/no-unused-vars,@typescript-eslint/no-unused-vars
    const pointSchemaBabydog2d = geobox.PointFeature2d({
      properties: Type.Object({ dingo: Type.String() }),
    });
    type _PointFeatureBabydog2d = Static<typeof pointSchemaBabydog2d>;

    const _test2dpoint: _PointFeatureBabydog2d["geometry"]["coordinates"] = [
      0, 0,
    ];

    console.debug({
      _test2dpoint,
    });

    // @ts-expect-error invalid coord
    const _test2dpointBad: _PointFeatureBabydog2d["geometry"]["coordinates"] = [
      0, 0, 0,
    ];
  }
});
