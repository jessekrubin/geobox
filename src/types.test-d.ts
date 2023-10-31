import { assertType, expectTypeOf, test } from "vitest";
import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import * as geobox from "./index.js";

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
