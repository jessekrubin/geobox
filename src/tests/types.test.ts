import { expect, test } from "vitest";

test("bbox-options", () => {
  type BBoxOptionsX<T> =
    | { x: T; xmin?: T; xmax?: never }
    | { x: T; xmin?: never; xmax?: T }
    | { x?: never; xmin: T; xmax: T }
    | { x?: never; xmin?: T; xmax?: never }
    | { x?: never; xmin?: never; xmax?: T };
  type BBoxOptionsY<T> =
    | { y: T; ymin?: T; ymax?: never }
    | { y: T; ymin?: never; ymax?: T }
    | { y?: never; ymin: T; ymax: T }
    | { y?: never; ymin?: T; ymax?: never }
    | { y?: never; ymin?: never; ymax?: T };
  type BBoxOptionsZ<T> =
    | { z: T; zmin?: T; zmax?: never }
    | { z: T; zmin?: never; zmax?: T }
    | { z?: never; zmin: T; zmax: T }
    | { z?: never; zmin?: T; zmax?: never }
    | { z?: never; zmin?: never; zmax?: T };

  type BBoxOpts = BBoxOptionsX<number> &
    BBoxOptionsY<number> &
    BBoxOptionsZ<number>;
  const bboxX0: BBoxOpts = {};
  const bboxX1: BBoxOpts = { x: 10 };
  const bboxX2: BBoxOpts = { x: 10, xmin: 0 };
  const bboxX3: BBoxOpts = { x: 10, xmax: 20 };
  const bboxX4: BBoxOpts = { xmin: 0, xmax: 20 };
  // @ts-expect-error - should bc xmin & xmax means x is not allowed
  const bboxX5: BBoxOpts = { x: 10, xmin: 0, xmax: 20 };

  expect(bboxX0).toEqual({});
  expect(bboxX1).toEqual({ x: 10 });
  expect(bboxX2).toEqual({ x: 10, xmin: 0 });
  expect(bboxX3).toEqual({ x: 10, xmax: 20 });
  expect(bboxX4).toEqual({ xmin: 0, xmax: 20 });
  expect(bboxX5).toEqual({ x: 10, xmin: 0, xmax: 20 });
});
