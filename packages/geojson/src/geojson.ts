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
export type PointGeometry<TCoordinates extends Coordinate = Coordinate> = {
  type: PointGeometryType;
  coordinates: PointCoordinates<TCoordinates>;
};
export type LineStringGeometry<TCoordinates extends Coordinate> = {
  type: LineStringGeometryType;
  coordinates: LineStringCoordinates<TCoordinates>;
};
export type PolygonGeometry<TCoordinates extends Coordinate> = {
  type: PolygonGeometryType;
  coordinates: PolygonCoordinates<TCoordinates>;
};
export type MultiPointGeometry<TCoordinates extends Coordinate> = {
  type: MultiPointGeometryType;
  coordinates: MultiPointCoordinates<TCoordinates>;
};
export type MultiLineStringGeometry<TCoordinates extends Coordinate> = {
  type: MultiLineStringGeometryType;
  coordinates: MultiLineStringCoordinates<TCoordinates>;
};
export type MultiPolygonGeometry<TCoordinates extends Coordinate> = {
  type: MultiPolygonGeometryType;
  coordinates: MultiPolygonCoordinates<TCoordinates>;
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

export type FeatureOptions = {
  id?: string | number;
  bbox?: BBox;
};

export const isCoordinate2d = (value: unknown): value is Coordinate2d =>
  Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
export const isCoordinate3d = (value: unknown): value is Coordinate3d =>
  Array.isArray(value) &&
  value.length === 3 &&
  typeof value[0] === "number" &&
  typeof value[1] === "number" &&
  typeof value[2] === "number";
export const isCoordinate = (value: unknown): value is Coordinate =>
  Array.isArray(value) &&
  ((value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number") ||
    (value.length === 3 &&
      typeof value[0] === "number" &&
      typeof value[1] === "number" &&
      typeof value[2] === "number"));

export const isCoordinates2d = (value: unknown): value is Coordinate2d[] =>
  Array.isArray(value) && value.length > 0 && value.every((v) => isCoordinate2d(v));
export const isCoordinates3d = (value: unknown): value is Coordinate3d[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(
    (el) =>
      Array.isArray(el) &&
      el.length === 3 &&
      typeof el[0] === "number" &&
      typeof el[1] === "number" &&
      typeof el[2] === "number"
  );
export const isCoordinates = (value: unknown): value is Coordinate[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(
    (el) =>
      Array.isArray(el) &&
      ((el.length === 2 && typeof el[0] === "number" && typeof el[1] === "number") ||
        (el.length === 3 && typeof el[0] === "number" && typeof el[1] === "number" && typeof el[2] === "number"))
  );

export const isBBox2d = (value: unknown): value is BBox2d =>
  Array.isArray(value) &&
  value.length === 4 &&
  typeof value[0] === "number" &&
  Number.isFinite(value[0]) &&
  typeof value[1] === "number" &&
  Number.isFinite(value[1]) &&
  typeof value[2] === "number" &&
  Number.isFinite(value[2]) &&
  typeof value[3] === "number" &&
  Number.isFinite(value[3]);
export const isBBox3d = (value: unknown): value is BBox3d =>
  Array.isArray(value) &&
  value.length === 6 &&
  typeof value[0] === "number" &&
  Number.isFinite(value[0]) &&
  typeof value[1] === "number" &&
  Number.isFinite(value[1]) &&
  typeof value[2] === "number" &&
  Number.isFinite(value[2]) &&
  typeof value[3] === "number" &&
  Number.isFinite(value[3]) &&
  typeof value[4] === "number" &&
  Number.isFinite(value[4]) &&
  typeof value[5] === "number" &&
  Number.isFinite(value[5]);

export const isBBox = (value: unknown): value is BBox2d =>
  (Array.isArray(value) &&
    value.length === 4 &&
    typeof value[0] === "number" &&
    Number.isFinite(value[0]) &&
    typeof value[1] === "number" &&
    Number.isFinite(value[1]) &&
    typeof value[2] === "number" &&
    Number.isFinite(value[2]) &&
    typeof value[3] === "number" &&
    Number.isFinite(value[3])) ||
  (Array.isArray(value) &&
    value.length === 6 &&
    typeof value[0] === "number" &&
    Number.isFinite(value[0]) &&
    typeof value[1] === "number" &&
    Number.isFinite(value[1]) &&
    typeof value[2] === "number" &&
    Number.isFinite(value[2]) &&
    typeof value[3] === "number" &&
    Number.isFinite(value[3]) &&
    typeof value[4] === "number" &&
    Number.isFinite(value[4]) &&
    typeof value[5] === "number" &&
    Number.isFinite(value[5]));

export const featureProperties = <TProperties = GeoJsonProperties>(properties?: TProperties): TProperties => {
  if (properties === undefined) {
    return {} as TProperties;
  }
  return properties;
};

const optsBbox = (bbox: unknown): BBox => {
  if (!isBBox(bbox)) {
    throw new Error(
      `Invalid bbox: ${JSON.stringify(
        bbox
      )}; must be [number, number, number, number] or [number, number, number, number, number, number]`
    );
  }
  return bbox;
};
const optsId = (id: unknown): string | number => {
  if (typeof id !== "string" && typeof id !== "number") {
    throw new Error(`Invalid id: ${JSON.stringify(id)}; must be string or number`);
  }
  return id;
};

export const featureOptions = (options?: FeatureOptions) => {
  if (options === undefined || (options.id === undefined && options.bbox === undefined)) {
    return {};
  }
  if (options.id === undefined && options.bbox !== undefined) {
    return { bbox: optsBbox(options.bbox) };
  }
  if (options.id !== undefined && options.bbox === undefined) {
    return { id: optsId(options.id) };
  }
  return { id: optsId(optsId), bbox: optsBbox(options.bbox) };
};

export const pointCoordinates = <TCoordinate extends Coordinate = Coordinate>(coordinates: TCoordinate) => {
  if (isCoordinate(coordinates)) {
    return coordinates;
  }
  throw new Error(
    `Invalid coordinates: ${JSON.stringify(coordinates)}; must be [number, number] or [number, number, number]`
  );
};

export const isLineStringCoordinates = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: TCoordinate[]
): coordinates is LineStringCoordinates<TCoordinate> => {
  return isCoordinates(coordinates) && coordinates.length >= 2;
};
export const lineStringCoordinates = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: TCoordinate[]
): LineStringCoordinates<TCoordinate> => {
  if (coordinates.length < 2) {
    throw new Error(`Invalid coordinates: ${JSON.stringify(coordinates)}; must be an array of two or more coordinates`);
  }
  if (!isLineStringCoordinates(coordinates)) {
    throw new Error(
      `Invalid coordinates: ${JSON.stringify(
        coordinates
      )}; must be an array of [number, number] or [number, number, number]`
    );
  }
  return coordinates;
};

export const isPolygonCoordinates = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: unknown
): coordinates is PolygonCoordinates<TCoordinate> => {
  // return Array.isArray(coordinates) && coordinates.every((el) => isPolygonInnerCoordinates(el)
  return (
    Array.isArray(coordinates) &&
    coordinates.every(
      (value) => Array.isArray(value) && value.length >= 4 && value.every((value) => isCoordinate(value))
    ) &&
    coordinates[0].length === coordinates[coordinates.length - 1].length &&
    coordinates[0].every((el: Coordinate, index: number) => el === coordinates[coordinates.length - 1][index])
  );
};

export const polygonCoordinates = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: unknown
): PolygonCoordinates<TCoordinate> => {
  if (!isPolygonCoordinates<TCoordinate>(coordinates)) {
    throw new Error(`Invalid polygon coordinates: ${JSON.stringify(coordinates)}`);
  }
  return coordinates;
};

export const pointGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: TCoordinate
): PointGeometry<TCoordinate> => {
  return {
    type: "Point",
    coordinates: pointCoordinates(coordinates),
  };
};
export const pointGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: TCoordinate
): PointGeometry2d => pointGeometry(coordinates);
export const pointGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: TCoordinate
): PointGeometry3d => pointGeometry(coordinates);

export const lineStringGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: LineStringCoordinates<TCoordinate>
): LineStringGeometry<TCoordinate> => {
  return {
    type: "LineString",
    coordinates: lineStringCoordinates(coordinates),
  };
};
export const lineStringGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: LineStringCoordinates<TCoordinate>
): LineStringGeometry2d => lineStringGeometry(coordinates);
export const lineStringGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: LineStringCoordinates<TCoordinate>
): LineStringGeometry3d => lineStringGeometry(coordinates);

export const polygonGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: PolygonCoordinates<TCoordinate>
): PolygonGeometry<TCoordinate> => ({
  type: "Polygon",
  coordinates: polygonCoordinates(coordinates),
});
export const polygonGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: PolygonCoordinates<TCoordinate>
): PolygonGeometry2d => polygonGeometry(coordinates);
export const polygonGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: PolygonCoordinates<TCoordinate>
): PolygonGeometry3d => polygonGeometry(coordinates);

export const multiPointGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: MultiPointCoordinates<TCoordinate>
): MultiPointGeometry<TCoordinate> => ({
  type: "MultiPoint",
  coordinates,
});
export const multiPointGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: MultiPointCoordinates<TCoordinate>
): MultiPointGeometry2d => multiPointGeometry(coordinates);
export const multiPointGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: MultiPointCoordinates<TCoordinate>
): MultiPointGeometry3d => multiPointGeometry(coordinates);

export const multiLineStringGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: MultiLineStringCoordinates<TCoordinate>
): MultiLineStringGeometry<TCoordinate> => ({
  type: "MultiLineString",
  coordinates,
});
export const multiLineStringGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: MultiLineStringCoordinates<TCoordinate>
): MultiLineStringGeometry2d => multiLineStringGeometry(coordinates);
export const multiLineStringGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: MultiLineStringCoordinates<TCoordinate>
): MultiLineStringGeometry3d => multiLineStringGeometry(coordinates);

export const multiPolygonGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: MultiPolygonCoordinates<TCoordinate>
): MultiPolygonGeometry<TCoordinate> => ({
  type: "MultiPolygon",
  coordinates,
});

export const point = <TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties>(
  coordinates: TCoordinate,
  properties?: TProperties,
  options?: FeatureOptions
): PointFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: pointGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const lineString = <TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties>(
  coordinates: LineStringCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions
): LineStringFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: lineStringGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const polygon = <TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties>(
  coordinates: PolygonCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions
): PolygonFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: polygonGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const multiPoint = <TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties>(
  coordinates: MultiPointCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions
): MultiPointFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: multiPointGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const multiLineString = <TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties>(
  coordinates: MultiLineStringCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions
): MultiLineStringFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: multiLineStringGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const multiPolygon = <TCoordinate extends Coordinate = Coordinate, TProperties = GeoJsonProperties>(
  coordinates: MultiPolygonCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions
): MultiPolygonFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: multiPolygonGeometry(coordinates),
  properties,
  ...featureOptions(options),
});

export const featureCollection = <TFeature extends Feature = Feature>(
  features: TFeature[]
): FeatureCollection<TFeature> => ({
  type: "FeatureCollection",
  features,
});

export {
  point as pointFeature,
  lineString as lineStringFeature,
  polygon as polygonFeature,
  multiPoint as multiPointFeature,
  multiLineString as multiLineStringFeature,
  multiPolygon as multiPolygonFeature,
  featureCollection as featureCollectionFeature,
};
