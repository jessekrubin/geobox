import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { assertType, expectTypeOf, test } from "vitest";
import {
  PointFeature,
  PointFeature2d
} from "../geo-type/_geojson/point-feature.js";

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
  const pointSchemaBabydog = PointFeature({
    properties: Type.Object({ dingo: Type.String() }),
  });

  type PointFeatureBabydog = Static<typeof pointSchemaBabydog>;
  type PointFeatureBabydogBBox = PointFeatureBabydog["bbox"];
  const _bbox2: PointFeatureBabydogBBox = [0, 0, 0, 0];
  const _bbox3: PointFeatureBabydogBBox = [0, 0, 0, 0, 0, 0];
  const _bboxUndef: PointFeatureBabydogBBox = undefined;

  // @ts-expect-error invalid bbox...
  const _bboxBad = { a: 123 } satisfies PointFeatureBabydogBBox;

  // eslint-disable-next-line no-console
  console.debug({
    _bbox2,
    _bbox3,
    _bboxUndef,
    _bboxBad,
  });

  const pointSchemaDingoValidator = TypeCompiler.Compile(pointSchemaBabydog);
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

    const pointSchemaBabydog2d = PointFeature2d({
      properties: Type.Object({ dingo: Type.String() }),
    });
    const pointSchemaBabydog2dValidator =
      TypeCompiler.Compile(pointSchemaBabydog2d);
    type PointFeatureBabydog2d = Static<typeof pointSchemaBabydog2d>;
    if (pointSchemaBabydog2dValidator.Check(pDingo)) {
      const t = pDingo;
    }
    // assertType<
    //   {
    //     type: "Feature";
    //     geometry: {
    //       type: "Point";
    //       coordinates: [number, number];
    //     };
    //     properties: {
    //       dingo: string;
    //     };
    //   }
    // >(t);
  }
});
