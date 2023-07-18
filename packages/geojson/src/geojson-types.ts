export type Coordinate2d = [number, number];
export type Coordinate3d = [number, number, number];
export type Coordinate = Coordinate2d | Coordinate3d;
export type BBox2d = [number, number, number, number];
export type BBox3d = [number, number, number, number, number, number];
export type BBox = BBox2d | BBox3d;

// 'type' property literals
export type PointGeometryType = "Point";
export type LineStringGeometryType = "LineString";
export type PolygonGeometryType = "Polygon";
export type MultiPointGeometryType = "MultiPoint";
export type MultiLineStringGeometryType = "MultiLineString";
export type MultiPolygonGeometryType = "MultiPolygon";
export type GeometryType =
  | PointGeometryType
  | LineStringGeometryType
  | PolygonGeometryType
  | MultiPointGeometryType
  | MultiLineStringGeometryType
  | MultiPolygonGeometryType;
export type FeatureType = "Feature";
export type FeatureCollectionType = "FeatureCollection";
export type GeometryCollectionType = "GeometryCollection";

export type PointCoordinates<TCoordinate extends Coordinate = Coordinate> = TCoordinate;
export type LineStringCoordinates<TCoordinate extends Coordinate = Coordinate> = [
  TCoordinate,
  TCoordinate,
  ...TCoordinate[]
];

export type PolygonCoordinatesRing<TCoordinate extends Coordinate = Coordinate> = [
  TCoordinate,
  TCoordinate,
  TCoordinate,
  TCoordinate,
  ...TCoordinate[]
];
export type PolygonCoordinates<TCoordinate extends Coordinate = Coordinate> = [PolygonCoordinatesRing<TCoordinate>];

export type MultiPointCoordinates<TCoordinate extends Coordinate = Coordinate> = TCoordinate[];
export type MultiLineStringCoordinates<TCoordinate extends Coordinate = Coordinate> = [
  LineStringCoordinates<TCoordinate>,
  ...LineStringCoordinates<TCoordinate>[]
];
export type MultiPolygonCoordinates<TCoordinate extends Coordinate = Coordinate> = [
  PolygonCoordinates<TCoordinate>,
  ...PolygonCoordinates<TCoordinate>[]
];

// Geometry object types
export type PointGeometry<TCoordinate extends Coordinate = Coordinate> = {
  type: PointGeometryType;
  coordinates: PointCoordinates<TCoordinate>;
};
export type LineStringGeometry<TCoordinate extends Coordinate> = {
  type: LineStringGeometryType;
  coordinates: LineStringCoordinates<TCoordinate>;
};
export type PolygonGeometry<TCoordinate extends Coordinate> = {
  type: PolygonGeometryType;
  coordinates: PolygonCoordinates<TCoordinate>;
};
export type MultiPointGeometry<TCoordinate extends Coordinate> = {
  type: MultiPointGeometryType;
  coordinates: MultiPointCoordinates<TCoordinate>;
};
export type MultiLineStringGeometry<TCoordinate extends Coordinate> = {
  type: MultiLineStringGeometryType;
  coordinates: MultiLineStringCoordinates<TCoordinate>;
};
export type MultiPolygonGeometry<TCoordinate extends Coordinate> = {
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

export type Geometry<TCoordinates extends Coordinate = Coordinate> =
  | PointGeometry<TCoordinates>
  | LineStringGeometry<TCoordinates>
  | PolygonGeometry<TCoordinates>
  | MultiPointGeometry<TCoordinates>
  | MultiLineStringGeometry<TCoordinates>
  | MultiPolygonGeometry<TCoordinates>;
export type Geometry2d = Geometry<Coordinate2d>;
export type Geometry3d = Geometry<Coordinate3d>;

export type GeoJsonProperties = Record<string, unknown> | null;
export type Feature<TGeometry extends Geometry = Geometry, TProperties = GeoJsonProperties> = {
  type: FeatureType;
  geometry: TGeometry;
  properties?: TProperties;
  id?: string | number;
};

export type PointFeature<TCoordinates extends Coordinate = Coordinate, TProperties = GeoJsonProperties> = Feature<
  PointGeometry<TCoordinates>,
  TProperties
>;
export type PointFeature2d<TProperties = GeoJsonProperties> = Feature<PointGeometry2d, TProperties>;
export type PointFeature3d<TProperties = GeoJsonProperties> = Feature<PointGeometry3d, TProperties>;

export type LineStringFeature<TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties> = Feature<
  LineStringGeometry<TCoordinate>,
  TProperties
>;
export type LineStringFeature2d<TProperties = GeoJsonProperties> = Feature<LineStringGeometry2d, TProperties>;
export type LineStringFeature3d<TProperties = GeoJsonProperties> = Feature<LineStringGeometry3d, TProperties>;

export type PolygonFeature<TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties> = Feature<
  PolygonGeometry<TCoordinate>,
  TProperties
>;
export type PolygonFeature2d<TProperties = GeoJsonProperties> = Feature<PolygonGeometry2d, TProperties>;
export type PolygonFeature3d<TProperties = GeoJsonProperties> = Feature<PolygonGeometry3d, TProperties>;

export type MultiPointFeature<TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties> = Feature<
  MultiPointGeometry<TCoordinate>,
  TProperties
>;

export type MultiLineStringFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties = GeoJsonProperties
> = Feature<MultiLineStringGeometry<TCoordinate>, TProperties>;

export type MultiPolygonFeature<TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties> = Feature<
  MultiPolygonGeometry<TCoordinate>,
  TProperties
>;

export type FeatureCollection<TFeature extends Feature = Feature> = {
  type: FeatureCollectionType;
  features: TFeature[];
};
