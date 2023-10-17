import { describe, expect, test } from "vitest";
import * as gj from "./geojson.js";

describe("geojson-point", () => {
  test("point", () => {
    const point = gj.point([0, 0]);
    const expected = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0, 0],
      },
      properties: {},
    };
    expect(point).toEqual(expected);
  });

  test("point with properties", () => {
    const point = gj.point([0, 0], { dingo: "bash" });
    const expected = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0, 0],
      },
      properties: {
        dingo: "bash",
      },
    };
    expect(point).toEqual(expected);
  });

  test("invalid coords", () => {
    // @ts-expect-error - invalid coords
    expect(() => gj.point([0, 0, 0, 0])).toThrow();
  });
});

// describe("geojson-line", () => {
//   test("line", () => {
//     const line = gj.lineString([
//       [0, 0],
//       [1, 1],
//     ]);
//     const expected = {
//       type: "Feature",
//       geometry: {
//         type: "LineString",
//         coordinates: [
//           [0, 0],
//           [1, 1],
//         ],
//       },
//       properties: {},
//     };
//     expect(line).toEqual(expected);
//   });

//   test("line with properties", () => {
//     const line = gj.lineString(
//       [
//         [0, 0],
//         [1, 1],
//       ],
//       { dingo: "bash" },
//     );
//     const expected = {
//       type: "Feature",
//       geometry: {
//         type: "LineString",

//         coordinates: [
//           [0, 0],
//           [1, 1],
//         ],
//       },
//       properties: {
//         dingo: "bash",
//       },
//     };
//     expect(line).toEqual(expected);
//   });

//   test("invalid coords", () => {
//     expect(() =>
//       gj.lineString([
//         [0, 0],
//         [1, 1, 1, 123],
//       ]),
//     ).toThrow();
//   });
// });

// describe("geojson-polygon", () => {
//   test("polygon", () => {
//     const polygon = gj.polygon([
//       [
//         [0, 0],
//         [1, 1],
//         [0, 1],
//         [0, 0],
//       ],
//     ]);
//     const expected = {
//       type: "Feature",
//       geometry: {
//         type: "Polygon",
//         coordinates: [
//           [
//             [0, 0],
//             [1, 1],
//             [0, 1],
//             [0, 0],
//           ],
//         ],
//       },
//       properties: {},
//     };
//     expect(polygon).toEqual(expected);
//   });

//   test("polygon with properties", () => {
//     const polygon = gj.polygon(
//       [
//         [
//           [0, 0],
//           [1, 1],
//           [0, 1],
//           [0, 0],
//         ],
//       ],
//       { dingo: "bash" },
//     );
//     const expected = {
//       type: "Feature",
//       geometry: {
//         type: "Polygon",
//         coordinates: [
//           [
//             [0, 0],
//             [1, 1],
//             [0, 1],
//             [0, 0],
//           ],
//         ],
//       },
//       properties: {
//         dingo: "bash",
//       },
//     };
//     expect(polygon).toEqual(expected);
//   });

//   test("polygon with bbox", () => {
//     const polygon = gj.polygon(
//       [
//         [
//           [0, 0],
//           [1, 1],
//           [0, 1],
//           [0, 0],
//         ],
//       ],
//       undefined,
//       { bbox: [0, 0, 1, 1] },
//     );
//     const expected = {
//       type: "Feature",
//       geometry: {
//         type: "Polygon",
//         coordinates: [
//           [
//             [0, 0],
//             [1, 1],
//             [0, 1],
//             [0, 0],
//           ],
//         ],
//       },
//       properties: {},

//       bbox: [0, 0, 1, 1],
//     };
//     expect(polygon).toEqual(expected);
//   });

//   test("invalid coords", () => {
//     // @ts-expect-error - invalid coords
//     expect(() =>
//       gj.polygon([
//         [
//           [0, 0],
//           [1, 1, 1, 123],
//           [0, 1],
//           [0, 0],
//         ],
//       ]),
//     ).toThrow();
//   });

//   test("invalid coords length", () => {
//     // @ts-expect-error - invalid coords
//     expect(() =>
//       gj.polygon([
//         [
//           [0, 0],
//           [1, 1, 1, 123],
//           [0, 1],
//         ],
//       ]),
//     ).toThrow();
//   });

//   test("invalid bbox length", () => {
//     // @ts-expect-error - invalid coords
//     expect(() =>
//       gj.polygon(
//         [
//           [
//             [0, 0],
//             [1, 1, 1],
//             [0, 1],
//             [0, 0],
//           ],
//         ],
//         undefined,
//         { bbox: [0, 0, 0] },
//       ),
//     ).toThrow();
//   });
// });
