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

export type Coordinate2d = [x: Longitude, y: Latitude];
export type Coordinate3d = [x: Longitude, y: Latitude, z: number];
export type Coordinate = [x: Longitude, y: Latitude] | [x: Longitude, y: Latitude, z: number];
export type BBox2d = [west: Longitude, south: Latitude, east: Longitude, north: Latitude];
export type BBox3d = [west: Longitude, south: Latitude, east: Longitude, north: Latitude, minZ: number, maxZ: number];
export type BBox =
  | [west: Longitude, south: Latitude, east: Longitude, north: Latitude]
  | [west: Longitude, south: Latitude, east: Longitude, north: Latitude, minZ: number, maxZ: number];

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
export type LineStringCoordinates<TCoordinate extends Coordinate = Coordinate> = [
  TCoordinate,
  TCoordinate,
  ...TCoordinate[],
];

export type PolygonCoordinatesRing<TCoordinate extends Coordinate = Coordinate> = [
  TCoordinate,
  TCoordinate,
  TCoordinate,
  TCoordinate,
  ...TCoordinate[],
];
export type PolygonCoordinates<TCoordinate extends Coordinate = Coordinate> = [PolygonCoordinatesRing<TCoordinate>];

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

export type FeatureGeneric<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystemNullable,
> = {
  Coordinate: TCoordinate;
  Geometry: Geometry<TCoordinate>;
  Properties: TProperties;
  BBox: TBBox;
  Crs: TCrs;
};

/**
 * POSSIBLE TYPE FORMAT GOING FORWARD? uses generic-obj
 */
// export type FeatureV2<T extends Partial<FeatureGeneric> = FeatureGeneric> = {
//   type: FeatureType;
//   geometry: T['Geometry'];
//   id?: string | number;
//   bbox?: T['BBox'];
//   crs?: T['Crs'];
//   properties?: T['Properties'];
// };

export type Feature<
  TGeometry extends Geometry = Geometry,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystemNullable,
> = {
  type: FeatureType;
  geometry: TGeometry;
  id?: string | number;
  bbox?: TBBox;
  crs?: TCrs;
  properties?: TProperties;
};

export type PointFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystemNullable,
> = Feature<PointGeometry<TCoordinate>, TProperties, TBBox, TCrs>;

export type LineStringFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystemNullable,
> = Feature<LineStringGeometry<TCoordinate>, TProperties, TBBox, TCrs>;

export type PolygonFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystemNullable,
> = Feature<PolygonGeometry<TCoordinate>, TProperties, TBBox, TCrs>;

export type MultiPointFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystemNullable,
> = Feature<MultiPointGeometry<TCoordinate>, TProperties, TBBox, TCrs>;

export type MultiLineStringFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystemNullable,
> = Feature<MultiLineStringGeometry<TCoordinate>, TProperties, TBBox, TCrs>;

export type MultiPolygonFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystemNullable,
> = Feature<MultiPolygonGeometry<TCoordinate>, TProperties, TBBox, TCrs>;

// 2d Feature object types

export type PointFeature2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<PointGeometry2d, TProperties, TBBox, TCrs>;
export type LineStringFeature2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<LineStringGeometry2d, TProperties, TBBox, TCrs>;
export type PolygonFeature2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<PolygonGeometry2d, TProperties, TBBox, TCrs>;
export type MultiPointFeature2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<MultiPointGeometry2d, TProperties, TBBox, TCrs>;
export type MultiLineStringFeature2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<MultiLineStringGeometry2d, TProperties, TBBox, TCrs>;
export type MultiPolygonFeature2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<MultiPolygonGeometry2d, TProperties, TBBox, TCrs>;

// 3d Feature object types
export type PointFeature3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<PointGeometry3d, TProperties, TBBox, TCrs>;
export type LineStringFeature3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<LineStringGeometry3d, TProperties, TBBox, TCrs>;
export type PolygonFeature3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<PolygonGeometry3d, TProperties, TBBox, TCrs>;
export type MultiPointFeature3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<MultiPointGeometry3d, TProperties, TBBox, TCrs>;
export type MultiLineStringFeature3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<MultiLineStringGeometry3d, TProperties, TBBox, TCrs>;
export type MultiPolygonFeature3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = Feature<MultiPolygonGeometry3d, TProperties, TBBox, TCrs>;

export type FeatureCollection<
  TFeature extends Feature = Feature,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = {
  type: FeatureCollectionType;
  features: TFeature[];
  properties?: TProperties;

  bbox?: TBBox;
  crs?: TCrs;
};

export type PointFeatureCollection<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<PointFeature<Coordinate, TProperties>, TProperties, TBBox, TCrs>;
export type LineStringFeatureCollection<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<LineStringFeature<Coordinate, TProperties>, TProperties, TBBox, TCrs>;
export type PolygonFeatureCollection<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<PolygonFeature<Coordinate, TProperties>, TProperties, TBBox, TCrs>;
export type MultiPointFeatureCollection<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<MultiPointFeature<Coordinate, TProperties>, TProperties, TBBox, TCrs>;
export type MultiLineStringFeatureCollection<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<MultiLineStringFeature<Coordinate, TProperties>, TProperties, TBBox, TCrs>;
export type MultiPolygonFeatureCollection<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<MultiPolygonFeature<Coordinate, TProperties>, TProperties, TBBox, TCrs>;

// 2d FeatureCollection object types
export type PointFeatureCollection2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox2d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<PointFeature2d<TProperties>, TProperties, TBBox, TCrs>;
export type LineStringFeatureCollection2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox2d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<LineStringFeature2d<TProperties>, TProperties, TBBox, TCrs>;
export type PolygonFeatureCollection2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox2d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<PolygonFeature2d<TProperties>, TProperties, TBBox, TCrs>;
export type MultiPointFeatureCollection2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox2d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<MultiPointFeature2d<TProperties>, TProperties, TBBox, TCrs>;
export type MultiLineStringFeatureCollection2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox2d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<MultiLineStringFeature2d<TProperties>, TProperties, TBBox, TCrs>;
export type MultiPolygonFeatureCollection2d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox2d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<MultiPolygonFeature2d<TProperties>, TProperties, TBBox, TCrs>;

// 3d FeatureCollection object types
export type PointFeatureCollection3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox3d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<PointFeature3d<TProperties>, TProperties, TBBox, TCrs>;
export type LineStringFeatureCollection3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox3d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<LineStringFeature3d<TProperties>, TProperties, TBBox, TCrs>;
export type PolygonFeatureCollection3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox3d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<PolygonFeature3d<TProperties>, TProperties, TBBox, TCrs>;
export type MultiPointFeatureCollection3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox3d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<MultiPointFeature3d<TProperties>, TProperties, TBBox, TCrs>;
export type MultiLineStringFeatureCollection3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox3d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<MultiLineStringFeature3d<TProperties>, TProperties, TBBox, TCrs>;
export type MultiPolygonFeatureCollection3d<
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
  TBBox extends BBox3d | undefined = undefined,
  TCrs extends CoordinateReferenceSystem | undefined | null = undefined,
> = FeatureCollection<MultiPolygonFeature3d<TProperties>, TProperties, TBBox, TCrs>;

// 3d FeatureCollection object types
export type GeometryCollection<
  TGeometry extends Geometry = Geometry,
  TCrs extends CoordinateReferenceSystem | undefined | null = CoordinateReferenceSystemNullable,
> = {
  type: GeometryCollectionType;
  geometries: TGeometry[];
  crs?: TCrs;
};
