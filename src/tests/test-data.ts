export const POINT_GEOMETRY = {
  type: "Point",
  coordinates: [30, 10],
};
export const LINE_STRING_GEOMETRY = {
  type: "LineString",
  coordinates: [
    [30, 10],
    [10, 30],
    [40, 40],
  ],
};

export const POLYGON_GEOM = {
  type: "Polygon",
  coordinates: [
    [
      [35, 10],
      [45, 45],
      [15, 40],
      [10, 20],
      [35, 10],
    ],
  ],
};

export const MULTI_POINT_GEOMETRY = {
  type: "MultiPoint",
  coordinates: [
    [10, 40],
    [40, 30],
    [20, 20],
    [30, 10],
  ],
};

export const MULTI_LINE_STRING_GEOM = {
  type: "MultiLineString",
  coordinates: [
    [
      [10, 10],
      [20, 20],
      [10, 40],
    ],
    [
      [40, 40],
      [30, 30],
      [40, 20],
    ],
  ],
};

export const MULTI_POLYGON_GEOM = {
  type: "MultiPolygon",
  coordinates: [
    [
      [
        [30, 20],
        [45, 40],
        [10, 40],
        [30, 20],
      ],
    ],
    [
      [
        [15, 5],
        [40, 10],
        [10, 20],
        [5, 10],
        [15, 5],
      ],
    ],
  ],
};

export const GEOMETRY_COLLECTION = {
  type: "GeometryCollection",
  geometries: [
    {
      type: "Point",
      coordinates: [40, 10],
    },
    {
      type: "LineString",
      coordinates: [
        [10, 10],
        [20, 20],
        [10, 40],
      ],
    },
  ],
};

export const FEATURE_COLLECTION = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [102, 0.5],
      },
      properties: {
        prop0: "value0",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [102, 0],
          [103, 1],
          [104, 0],
          [105, 1],
        ],
      },
      properties: {
        prop0: "value0",
        prop1: 0,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [100, 0],
            [101, 0],
            [101, 1],
            [100, 1],
            [100, 0],
          ],
        ],
      },
      properties: {
        prop0: "value0",
        prop1: {
          this: "that",
        },
      },
    },
  ],
};
