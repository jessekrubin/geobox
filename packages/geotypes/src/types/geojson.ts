import type { Fmt, IsUndefined, ExtendsUndefined } from "../utility-types.js";

/* eslint-disable @typescript-eslint/no-unused-vars */
export type Longitude = number;
export type Latitude = number;

/**
 * WGS84 longitude
 * @minimum -180
 * @maximum 180
 */
export type LongitudeWgs84 = number;

/**
 * WGS84 latitude
 * @minimum -90
 * @maximum 90
 */
export type LatitudeWgs84 = number;

export type Coordinate2d = [x: Longitude, y: Latitude] | readonly [x: Longitude, y: Latitude];
export type Coordinate3d = [x: Longitude, y: Latitude, z: number] | readonly [x: Longitude, y: Latitude, z: number];
export type Coordinate =
  | [x: Longitude, y: Latitude]
  | [x: Longitude, y: Latitude, z: number]
  | readonly [x: Longitude, y: Latitude]
  | readonly [x: Longitude, y: Latitude, z: number];
export type BBox2d =
  | [west: Longitude, south: Latitude, east: Longitude, north: Latitude]
  | readonly [west: Longitude, south: Latitude, east: Longitude, north: Latitude];
export type BBox3d =
  | [west: Longitude, south: Latitude, east: Longitude, north: Latitude, minZ: number, maxZ: number]
  | readonly [west: Longitude, south: Latitude, east: Longitude, north: Latitude, minZ: number, maxZ: number];
export type BBox =
  | [west: Longitude, south: Latitude, east: Longitude, north: Latitude]
  | readonly [west: Longitude, south: Latitude, east: Longitude, north: Latitude]
  | [west: Longitude, south: Latitude, east: Longitude, north: Latitude, minZ: number, maxZ: number]
  | readonly [west: Longitude, south: Latitude, east: Longitude, north: Latitude, minZ: number, maxZ: number];

// 'type' property literals
export type PointGeometryType = "Point";
export type LineStringGeometryType = "LineString";
export type PolygonGeometryType = "Polygon";
export type MultiPointGeometryType = "MultiPoint";
export type MultiLineStringGeometryType = "MultiLineString";
export type MultiPolygonGeometryType = "MultiPolygon";

export type GeometryType = "Point" | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon";

export type FeatureType = "Feature";
export type FeatureCollectionType = "FeatureCollection";
export type GeometryCollectionType = "GeometryCollection";

export type PointCoordinates<TCoordinate extends Coordinate = Coordinate> = TCoordinate;
/**
 * A LineString is an array of two or more positions.
 * const lineString: LineStringCoordinates = [ [100.0, 0.0], [101.0, 1.0] ];
 */
export type LineStringCoordinates<TCoordinate extends Coordinate = Coordinate> = [
  TCoordinate,
  TCoordinate,
  ...TCoordinate[],
];

export type LinearRing<TCoordinate extends Coordinate = Coordinate> = [
  TCoordinate,
  TCoordinate,
  TCoordinate,
  TCoordinate,
  ...TCoordinate[],
];

/**
 * A Polygon is an array of LinearRings. The first element in the array represents the exterior ring.
 * Any subsequent elements represent interior rings (or holes).
 * const polygon: PolygonCoordinates = [
 *  [
 *     [100.0, 0.0],
 *     [101.0, 0.0],
 *     [101.0, 1.0],
 *     [100.0, 1.0],
 *     [100.0, 0.0]
 *   ]
 * ];
 */
export type PolygonCoordinates<TCoordinate extends Coordinate = Coordinate> = [LinearRing<TCoordinate>];

export type MultiPointCoordinates<TCoordinate extends Coordinate = Coordinate> = TCoordinate[];
export type MultiLineStringCoordinates<TCoordinate extends Coordinate = Coordinate> = [
  LineStringCoordinates<TCoordinate>,
  ...LineStringCoordinates<TCoordinate>[],
];
export type MultiPolygonCoordinates<TCoordinate extends Coordinate = Coordinate> = [
  PolygonCoordinates<TCoordinate>,
  ...PolygonCoordinates<TCoordinate>[],
];

// Geometry object types
export type PointGeometry<TCoordinate extends Coordinate = Coordinate> = {
  type: PointGeometryType;
  coordinates: PointCoordinates<TCoordinate>;
};
export type LineStringGeometry<TCoordinate extends Coordinate = Coordinate> = {
  type: LineStringGeometryType;
  coordinates: LineStringCoordinates<TCoordinate>;
};
export type PolygonGeometry<TCoordinate extends Coordinate = Coordinate> = {
  type: PolygonGeometryType;
  coordinates: PolygonCoordinates<TCoordinate>;
};
export type MultiPointGeometry<TCoordinate extends Coordinate = Coordinate> = {
  type: MultiPointGeometryType;
  coordinates: MultiPointCoordinates<TCoordinate>;
};
export type MultiLineStringGeometry<TCoordinate extends Coordinate = Coordinate> = {
  type: MultiLineStringGeometryType;
  coordinates: MultiLineStringCoordinates<TCoordinate>;
};
export type MultiPolygonGeometry<TCoordinate extends Coordinate = Coordinate> = {
  type: MultiPolygonGeometryType;
  coordinates: MultiPolygonCoordinates<TCoordinate>;
};

// 2d Geometry object types
export type PointGeometry2d = PointGeometry<Coordinate2d>;
export type LineStringGeometry2d = LineStringGeometry<Coordinate2d>;
export type PolygonGeometry2d = PolygonGeometry<Coordinate2d>;
export type MultiPointGeometry2d = MultiPointGeometry<Coordinate2d>;
export type MultiLineStringGeometry2d = MultiLineStringGeometry<Coordinate2d>;
export type MultiPolygonGeometry2d = MultiPolygonGeometry<Coordinate2d>;

// 3d Geometry object types
export type PointGeometry3d = PointGeometry<Coordinate3d>;
export type LineStringGeometry3d = LineStringGeometry<Coordinate3d>;
export type PolygonGeometry3d = PolygonGeometry<Coordinate3d>;
export type MultiPointGeometry3d = MultiPointGeometry<Coordinate3d>;
export type MultiLineStringGeometry3d = MultiLineStringGeometry<Coordinate3d>;
export type MultiPolygonGeometry3d = MultiPolygonGeometry<Coordinate3d>;

export type Geometry<TCoordinate extends Coordinate = Coordinate> =
  | PointGeometry<TCoordinate>
  | LineStringGeometry<TCoordinate>
  | PolygonGeometry<TCoordinate>
  | MultiPointGeometry<TCoordinate>
  | MultiLineStringGeometry<TCoordinate>
  | MultiPolygonGeometry<TCoordinate>;
export type Geometry2d = Geometry<Coordinate2d>;
export type Geometry3d = Geometry<Coordinate3d>;

export type GeoJsonProperties = Record<string, unknown> | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export type GeoJsonPropertiesDefault = { [name: string]: any } | null;

export type NamedCoordinateReferenceSystem = {
  type: "name";
  properties: {
    name: string;
  };
};
export type LinkedCoordinateReferenceSystem = {
  type: "link";
  properties: {
    href: string;
    type: string;
  };
};

export type CoordinateReferenceSystem = NamedCoordinateReferenceSystem | LinkedCoordinateReferenceSystem;
export type CoordinateReferenceSystemNullable = CoordinateReferenceSystem | null | undefined;

export type FeatureGenericOptions<
  // TProperties = GeoJsonProperties | undefined,
  TFeatureId extends string | number | undefined = string | number | undefined,
  TBBox extends BBox | undefined = BBox | undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystem | undefined,
> = {
  // Properties: TProperties;
  Id: TFeatureId;
  BBox: TBBox;
  Crs: TCrs;
};

export type FeatureGenericGeometry<
  TCoordinate extends Coordinate = Coordinate,
  TGeometry extends Geometry<TCoordinate> = Geometry<TCoordinate>,
> = {
  Coordinate: TCoordinate;
  Geometry: TGeometry;
};

export type FeatureGeneric<
  TFeatureId extends string | number | undefined = string | number | undefined,
  TCoordinate extends Coordinate = Coordinate,
  TGeometry extends Geometry<TCoordinate> = Geometry<TCoordinate>,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties | undefined,
  TBBox extends BBox | undefined = BBox | undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystem | undefined,
> = FeatureGenericGeometry<TCoordinate, TGeometry> & FeatureGenericOptions<TFeatureId, TBBox, TCrs>;


// type FeatureIdOption<TFeatureId extends string | number | undefined = undefined> =
//   ExtendsUndefined<TFeatureId> extends true
//   ? {
//     Id?: string | number;
//   }
//   : {
//     Id: TFeatureId;
//   };
// type FeatureBBoxOption<TBBox extends BBox | undefined = undefined> = ExtendsUndefined<TBBox> extends true
//   ? {
//     BBox?: BBox;
//   }
//   : {
//     BBox: TBBox;
//   };
// type FeatureCrsOption<TCrs extends CoordinateReferenceSystem | undefined | null> = ExtendsUndefined<TCrs> extends true
//   ? {
//     Crs?: CoordinateReferenceSystem | null;
//   }
//   : {
//     Crs: TCrs;
//   };
// type FeatureOptionsGeneric<
//   TFeatureId extends string | number | undefined = undefined,
//   TBBox extends BBox | undefined = undefined,
//   TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
// > = FeatureIdOption<TFeatureId> & FeatureBBoxOption<TBBox> & FeatureCrsOption<TCrs>;

export type FeatureOptions<TOptions extends Partial<FeatureGenericOptions> | undefined = undefined> =
  IsUndefined<TOptions> extends true ? {
    id?: string | number;
    bbox?: BBox;
    crs?: CoordinateReferenceSystem | null;
  } :
  Fmt<
    ("Id" extends keyof TOptions ? { id: TOptions["Id"] } : { id?: string | number }) &
    ("BBox" extends keyof TOptions ? { bbox: TOptions["BBox"] } : { bbox?: BBox }) &
    ("Crs" extends keyof TOptions ? { crs: TOptions["Crs"] } : { crs?: CoordinateReferenceSystem | null })>  // & ("Properties" extends keyof TOptions ? { properties: TOptions["Properties"] } : { properties?: GeoJsonProperties }) &

// {
//   // type ExampleOptions = FeatureOptionsGeneric;

//   type FeatureOptionsNothing = FeatureOptions;
//   type ExampleOptionsWithId = FeatureOptions<{
//     Id: string;
//   }>;
// }

// type FeatureProperties<TProperties> = IsUnknown<TProperties> extends true? {
//   properties?: GeoJsonProperties | null;
// } : IsUndefined<TProperties> extends true ? {
//   properties?: GeoJsonProperties | null;
// } : ExtendsUndefined<TProperties> extends true ? {
//   properties?: TProperties;
// } : {
//   properties: TProperties;
// };
type FeatureProperties<TProperties> = IsUndefined<TProperties> extends true ? {
  properties?: GeoJsonProperties | null;
} : ExtendsUndefined<TProperties> extends true ? {
  properties?: TProperties;
} : {
  properties: TProperties;
};
// }: IsUndefined<TProperties> extends true ? { properties?: GeoJsonProperties | null } : ExtendsUndefined<TProperties> extends true ? { properties?: TProperties } :
//   { properties: TProperties };

export type Feature<
  TGeometry extends Geometry = Geometry,
  TProperties extends GeoJsonProperties | null | undefined | unknown = GeoJsonProperties | null | undefined,
  TFeatureOptions extends Partial<FeatureGenericOptions> | undefined = undefined,
> = {
  type: FeatureType;
  geometry: TGeometry;
  // id?: string | number;
  // bbox?: TBBox;
  // crs?: TCrs;
  // properties?: TProperties;
  // properties: TProperties;
} & Fmt<FeatureOptions<TFeatureOptions> & FeatureProperties<TProperties>>

export type FeatureCollection<
  TGeometry extends Geometry = Geometry,
  TProperties extends GeoJsonProperties | null | undefined | unknown = GeoJsonProperties | null | undefined,
  TFeatureOptions extends Partial<FeatureGenericOptions> | undefined = undefined,
> = {
  type: FeatureCollectionType;
  features: Feature<TGeometry, TProperties, TFeatureOptions>[];
} & Fmt<FeatureOptions<TFeatureOptions> & FeatureProperties<TProperties>>
// ExtendsUndefined<TProperties> extends true
// ? { properties?: TProperties } :
// IsUndefined<TProperties> extends true
// ? { properties?: GeoJsonProperties | null }
// : { properties: TProperties }
// )>;
// )
// >
//  & ("Properties" extends keyof TFeatureOptions ? { properties: TFeatureOptions["Properties"] } : { properties?: GeoJsonProperties })>;

// id: "Id" extends keyof FeatureOptions ? FeatureOptions["Id"] : string | number | undefined;
// bbox: "BBox" extends keyof FeatureOptions ? FeatureOptions["BBox"] : BBox | undefined;
// crs: "Crs" extends keyof FeatureOptions ? FeatureOptions["Crs"] : CoordinateReferenceSystem | undefined;

// {
//   type FeatureWithId = Feature<PointGeometry, undefined, { Id: string }>;
//   const featureWithNoProperties: FeatureWithId = {
//     type: "Feature",
//     geometry: {
//       type: "Point",
//       coordinates: [0, 0],
//     },
//     id: "some-id",
//   };
//   const validFeature: FeatureWithId = {
//     type: "Feature",
//     geometry: {
//       type: "Point",
//       coordinates: [0, 0],
//     },
//     properties: {
//       howdy: "partner",
//     },
//     id: "some-id",
//   };

//   // @ts-expect-error id is required
//   const invalidFeature: FeatureWithId = {
//     type: "Feature",
//     geometry: {
//       type: "Point",
//       coordinates: [0, 0],
//     },
//     properties: {
//       howdy: "partner",
//     },
//   };


//   type FeatureWithProperties = Feature<PointGeometry, { howdy: 'doody' } | undefined>;
//   type FeatureWithPropertiesProperties = FeatureWithProperties['properties'];

//   const featureWithProperties: FeatureWithProperties = {
//     type: "Feature",
//     geometry: {
//       type: "Point",
//       coordinates: [0, 0],
//     },
//     properties: {
//       howdy: "doody",
//     },
//   };

// }


export type PointFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties | undefined,
  FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
> = Feature<PointGeometry<TCoordinate>, TProperties, FeatureOptions>;

// export type PointFeature2d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<PointGeometry<Coordinate2d>, FeatureOptions>;
// export type PointFeature3d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<PointGeometry<Coordinate3d>, FeatureOptions>;

// export type LineStringFeature<
//   TCoordinate extends Coordinate = Coordinate,
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<LineStringGeometry<TCoordinate>, FeatureOptions>;
// export type LineStringFeature2d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<LineStringGeometry<Coordinate2d>, FeatureOptions>;
// export type LineStringFeature3d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<LineStringGeometry<Coordinate3d>, FeatureOptions>;

// export type PolygonFeature<
//   TCoordinate extends Coordinate = Coordinate,
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<PolygonGeometry<TCoordinate>, FeatureOptions>;
// export type PolygonFeature2d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<PolygonGeometry<Coordinate2d>, FeatureOptions>;
// export type PolygonFeature3d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<PolygonGeometry<Coordinate3d>, FeatureOptions>;

// export type MultiPointFeature<
//   TCoordinate extends Coordinate = Coordinate,
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<MultiPointGeometry<TCoordinate>, FeatureOptions>;
// export type MultiPointFeature2d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<MultiPointGeometry<Coordinate2d>, FeatureOptions>;
// export type MultiPointFeature3d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<MultiPointGeometry<Coordinate3d>, FeatureOptions>;

// export type MultiLineStringFeature<
//   TCoordinate extends Coordinate = Coordinate,
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<MultiLineStringGeometry<TCoordinate>, FeatureOptions>;
// export type MultiLineStringFeature2d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<MultiLineStringGeometry<Coordinate2d>, FeatureOptions>;
// export type MultiLineStringFeature3d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<MultiLineStringGeometry<Coordinate3d>, FeatureOptions>;

// export type MultiPolygonFeature<
//   TCoordinate extends Coordinate = Coordinate,
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<MultiPolygonGeometry<TCoordinate>, FeatureOptions>;
// export type MultiPolygonFeature2d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<MultiPolygonGeometry<Coordinate2d>, FeatureOptions>;
// export type MultiPolygonFeature3d<
//   FeatureOptions extends Partial<FeatureGenericOptions> = FeatureGenericOptions,
// > = Feature<MultiPolygonGeometry<Coordinate3d>, FeatureOptions>;

// // export type PointFeature<T extends Partial<FeatureGenericWithCoordinate> = FeatureGeneric> = Feature<T & {
// //   Geometry: PointGeometry<
// //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// //   >
// // }>;

// // export type Feature<T extends Partial<FeatureGeneric> = FeatureGeneric> = {
// //   type: FeatureType;
// //   geometry: T['Geometry'] extends keyof T ? Geometry<T['Coordinate'] extends Coordinate ? T['Coordinate'] : FeatureGeneric['Coordinate']> : Geometry<
// //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// //   >;
// //   $coord: T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate;
// //   // geometry: T['Geometry'];
// //   id?: 'Id' extends keyof T ? T['Id'] : string | number | undefined;
// //   bbox?: 'BBox' extends keyof T ? T['BBox'] : BBox;
// //   crs?: 'Crs' extends keyof T ? T['Crs'] : CoordinateReferenceSystem | undefined;
// //   properties?: 'Properties' extends keyof T ? T['Properties'] : GeoJsonProperties | undefined;
// // };

// // // type fcoord = Feature['geometry']['coordinates']

// // export type FeatureGeneric2d<
// //   TFeatureId extends string | number | undefined = string | number | undefined,
// //   TGeometry extends Geometry<Coordinate2d> = Geometry<Coordinate2d>,
// //   TProperties extends GeoJsonProperties | undefined = GeoJsonProperties | undefined,
// //   TBBox extends BBox | undefined = BBox | undefined,
// //   TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystem | undefined
// // > = {
// //   Coordinate: Coordinate2d;
// //   Geometry: TGeometry;
// // } & FeatureGenericOptions<TFeatureId, TProperties, TBBox, TCrs>;
// // export type Feature2d<T extends Partial<FeatureGeneric2d> = FeatureGeneric2d> = Feature<T>;

// // export type FeatureGeneric3d<
// //   TFeatureId extends string | number | undefined = string | number | undefined,
// //   TGeometry extends Geometry<Coordinate3d> = Geometry<Coordinate3d>,
// //   TProperties extends GeoJsonProperties | undefined = GeoJsonProperties | undefined,
// //   TBBox extends BBox | undefined = BBox | undefined,
// //   TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystem | undefined
// // > = {
// //   Coordinate: Coordinate3d;
// //   Geometry: TGeometry;
// // } & FeatureGenericOptions<TFeatureId, TProperties, TBBox, TCrs>;

// // export type Feature3d<T extends Partial<FeatureGeneric3d> = FeatureGeneric3d> = Feature<T>;

// // // export type PointFeature2d<T extends Partial<FeatureGeneric2d> = FeatureGeneric2d> = FeatureV2<T & {
// // //   Geometry: PointGeometry<
// // //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// // //   >;
// // // export type PointFeature2d<T extends Partial<FeatureGeneric2d> = FeatureGeneric2d> = FeatureV2<T & {
// // //   Geometry: PointGeometry<
// // //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// // //   >;
// // // }>;

// // // export type Feature2d<T extends Partial<Omit<FeatureGeneric, 'Coordinate'>> = > = FeatureV2<T & {
// // // export type PointFeatureV2<T extends Partial<FeatureGeneric> = FeatureGeneric> = FeatureV2<T> & {
// // //   geometry: PointGeometry<
// // //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// // //   >;
// // //   properties: T['Properties'] extends GeoJsonProperties ? T['Properties'] : GeoJsonProperties;

// // // };
// // // export type FeatureGenericOmitCoordinate = Omit<FeatureGeneric, 'Coordinate'>;
// // export type FeatureGenericWithCoordinate = Omit<FeatureGeneric, 'Geometry'>;
// // // export type GeometryFeatureGeneric<
// // // T extends Partial<

// // export type FeatureGenericOmitCoordinateGeometry = Omit<FeatureGeneric, 'Coordinate' | 'Geometry'>;

// // export type PointFeature<T extends Partial<FeatureGenericWithCoordinate> = FeatureGeneric> = Feature<T & {
// //   Geometry: PointGeometry<
// //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// //   >
// // }>

// // export type PointFeature2d<T extends Partial<FeatureGenericOptions> = FeatureGenericOptions> = Feature<T & {
// //   Geometry: PointGeometry2d;
// // }>;

// // export type PointFeature3d<T extends Partial<FeatureGenericOptions> = FeatureGenericOptions> = Feature<T & {
// //   Geometry: PointGeometry3d;
// // }>;

// // export type MultiPointFeature<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: MultiPointGeometry<
// //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// //   >
// // }>
// // export type MultiPointFeature2d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: MultiPointGeometry2d;
// // }>;
// // export type MultiPointFeature3d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: MultiPointGeometry3d;
// // }>;
// // export type LineStringFeature<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: LineStringGeometry<
// //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// //   >
// // }>
// // export type LineStringFeature2d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: LineStringGeometry2d;
// // }>;
// // export type LineStringFeature3d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: LineStringGeometry3d;
// // }>;
// // export type MultiLineStringFeature<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: MultiLineStringGeometry<
// //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// //   >
// // }>
// // export type MultiLineStringFeature2d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: MultiLineStringGeometry2d;
// // }>;
// // export type MultiLineStringFeature3d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: MultiLineStringGeometry3d;
// // }>;
// // export type PolygonFeature<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: PolygonGeometry<
// //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// //   >
// // }>
// // export type PolygonFeature2d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: PolygonGeometry2d;
// // }>;
// // export type PolygonFeature3d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: PolygonGeometry3d;
// // }>;

// // export type MultiPolygonFeature<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: MultiPolygonGeometry<
// //     T['Coordinate'] extends Coordinate ? T['Coordinate'] : Coordinate
// //   >
// // }>
// // export type MultiPolygonFeature2d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: MultiPolygonGeometry2d;
// // }>;

// // export type MultiPolygonFeature3d<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: MultiPolygonGeometry3d;
// // }>;

// // export type GeometryCollection<G extends Geometry = Geometry> = {
// //   type: 'GeometryCollection';
// //   geometries: G[];
// //   bbox?: BBox;
// // };

// // export type GeometryCollectionFeature<T extends Partial<FeatureGeneric> = FeatureGeneric> = Feature<T & {
// //   Geometry: GeometryCollection<
// //     T['Geometry'] extends Geometry ? T['Geometry'] : Geometry
// //   >
// // }>

// // // export type FeatureCollectionGeneric<T extends
// // // export type FeatureCollectionGeneric<T extends Partial<FeatureGeneric> = FeatureGeneric> = FeatureCollection<T>;
// // export type FeatureCollection<T extends Partial<FeatureGeneric> = FeatureGeneric> = {
// //   type: 'FeatureCollection';
// //   features: Feature<T>[];
// //   bbox?: BBox;
// // };

// // export type FeatureCollectionGeneric<
// //   // TFeatureCollectionId extends string | number | undefined = string | number | undefined,
// //   TFeature extends Feature = Feature,
// //   TProperties extends GeoJsonProperties | undefined = GeoJsonProperties | undefined,
// //   TBBox extends BBox | undefined = BBox | undefined,
// //   TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystem | undefined
// // > = {
// //   type: 'FeatureCollection';
// //   features: TFeature[];
// //   properties?: TProperties;
// //   bbox?: TBBox;
// //   crs?: TCrs;
// // };
