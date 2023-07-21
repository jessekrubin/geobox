export type Coordinate2d = [x: number, y: number];
export type Coordinate3d = [x: number, y: number, z: number];
export type Coordinate = [x: number, y: number] | [x: number, y: number, z: number];
export type BBox2d = [west: number, south: number, east: number, north: number];
export type BBox3d = [
  west: number,
  south: number,
  east: number,
  north: number,
  minZ: number,
  maxZ: number,
];
export type BBox =
  | [west: number, south: number, east: number, north: number]
  | [
    west: number,
    south: number,
    east: number,
    north: number,
    minZ: number,
    maxZ: number,
  ];

// 'type' property literals
export type PointGeometryType = "Point";
export type LineStringGeometryType = "LineString";
export type PolygonGeometryType = "Polygon";
export type MultiPointGeometryType = "MultiPoint";
export type MultiLineStringGeometryType = "MultiLineString";
export type MultiPolygonGeometryType = "MultiPolygon";

export type GeometryType =
  | "Point"
  | "LineString"
  | "Polygon"
  | "MultiPoint"
  | "MultiLineString"
  | "MultiPolygon";

export type FeatureType = "Feature";
export type FeatureCollectionType = "FeatureCollection";
export type GeometryCollectionType = "GeometryCollection";

export type PointCoordinates<TCoordinate extends Coordinate = Coordinate> =
  TCoordinate;
export type LineStringCoordinates<TCoordinate extends Coordinate = Coordinate> =
  [
    TCoordinate,
    TCoordinate,
    ...TCoordinate[],
  ];

export type PolygonCoordinatesRing<
  TCoordinate extends Coordinate = Coordinate,
> = [
    TCoordinate,
    TCoordinate,
    TCoordinate,
    TCoordinate,
    ...TCoordinate[],
  ];
export type PolygonCoordinates<TCoordinate extends Coordinate = Coordinate> = [
  PolygonCoordinatesRing<TCoordinate>,
];

export type MultiPointCoordinates<TCoordinate extends Coordinate = Coordinate> =
  TCoordinate[];
export type MultiLineStringCoordinates<
  TCoordinate extends Coordinate = Coordinate,
> = [
    LineStringCoordinates<TCoordinate>,
    ...LineStringCoordinates<TCoordinate>[],
  ];
export type MultiPolygonCoordinates<
  TCoordinate extends Coordinate = Coordinate,
> = [
    PolygonCoordinates<TCoordinate>,
    ...PolygonCoordinates<TCoordinate>[],
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
export type Feature<
  TGeometry extends Geometry = Geometry,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
> = {
  type: FeatureType;
  geometry: TGeometry;
  properties?: TProperties;
  id?: string | number;
};

export type PointFeature<
  TCoordinates extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
> = Feature<
  PointGeometry<TCoordinates>,
  TProperties
>;

export type LineStringFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
> = Feature<
  LineStringGeometry<TCoordinate>,
  TProperties
>;


export type PolygonFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
> = Feature<
  PolygonGeometry<TCoordinate>,
  TProperties
>;

export type MultiPointFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
> = Feature<
  MultiPointGeometry<TCoordinate>,
  TProperties
>;

export type MultiLineStringFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
> = Feature<MultiLineStringGeometry<TCoordinate>, TProperties>;

export type MultiPolygonFeature<
  TCoordinate extends Coordinate = Coordinate,
  TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,
> = Feature<
  MultiPolygonGeometry<TCoordinate>,
  TProperties
>;


// 2d Feature object types
export type PointFeature2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<PointGeometry2d, TProperties>;
export type LineStringFeature2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<LineStringGeometry2d, TProperties>;
export type PolygonFeature2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<PolygonGeometry2d, TProperties>;
export type MultiPointFeature2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<MultiPointGeometry2d, TProperties>;
export type MultiLineStringFeature2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<MultiLineStringGeometry2d, TProperties>;
export type MultiPolygonFeature2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<MultiPolygonGeometry2d, TProperties>;

// 3d Feature object types
export type PointFeature3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<PointGeometry3d, TProperties>;
export type LineStringFeature3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<LineStringGeometry3d, TProperties>;
export type PolygonFeature3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<PolygonGeometry3d, TProperties>;
export type MultiPointFeature3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<MultiPointGeometry3d, TProperties>;
export type MultiLineStringFeature3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<MultiLineStringGeometry3d, TProperties>;
export type MultiPolygonFeature3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = Feature<MultiPolygonGeometry3d, TProperties>;


export type FeatureCollection<TFeature extends Feature = Feature> = {
  type: FeatureCollectionType;
  features: TFeature[];
};

export type PointFeatureCollection<TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<PointFeature<TCoordinate, TProperties>>;
export type LineStringFeatureCollection<TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<LineStringFeature<TCoordinate, TProperties>>;
export type PolygonFeatureCollection<TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<PolygonFeature<TCoordinate, TProperties>>;
export type MultiPointFeatureCollection<TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<MultiPointFeature<TCoordinate, TProperties>>;
export type MultiLineStringFeatureCollection<TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties,> = FeatureCollection<MultiLineStringFeature<TCoordinate, TProperties>>;
export type MultiPolygonFeatureCollection<TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<MultiPolygonFeature<TCoordinate, TProperties>>;

// 2d FeatureCollection object types
export type PointFeatureCollection2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<PointFeature2d<TProperties>>;
export type LineStringFeatureCollection2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<LineStringFeature2d<TProperties>>;
export type PolygonFeatureCollection2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<PolygonFeature2d<TProperties>>;
export type MultiPointFeatureCollection2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<MultiPointFeature2d<TProperties>>;
export type MultiLineStringFeatureCollection2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<MultiLineStringFeature2d<TProperties>>;
export type MultiPolygonFeatureCollection2d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<MultiPolygonFeature2d<TProperties>>;

// 3d FeatureCollection object types
export type PointFeatureCollection3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<PointFeature3d<TProperties>>;
export type LineStringFeatureCollection3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<LineStringFeature3d<TProperties>>;
export type PolygonFeatureCollection3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<PolygonFeature3d<TProperties>>;
export type MultiPointFeatureCollection3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<MultiPointFeature3d<TProperties>>;
export type MultiLineStringFeatureCollection3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<MultiLineStringFeature3d<TProperties>>;
export type MultiPolygonFeatureCollection3d<TProperties extends GeoJsonProperties | undefined = GeoJsonProperties> = FeatureCollection<MultiPolygonFeature3d<TProperties>>;
export type GeometryCollection<
  TGeometry extends Geometry = Geometry,
> = {
  type: GeometryCollectionType;
  geometries: TGeometry[];
};

