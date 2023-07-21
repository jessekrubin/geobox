import type {
  BBox,
  BBox2d,
  BBox3d,
  Coordinate,
  Coordinate2d,
  Coordinate3d,
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  LineStringCoordinates,
  LineStringFeature,
  PolygonGeometry,
  PolygonGeometry2d,
  PolygonGeometry3d,
  LineStringGeometry,
  LineStringGeometry2d,
  LineStringGeometry3d,
  MultiLineStringCoordinates,
  MultiLineStringFeature,
  MultiLineStringGeometry,
  MultiLineStringGeometry2d,
  MultiLineStringGeometry3d,
  MultiPointCoordinates,
  MultiPointFeature,
  MultiPointGeometry,
  MultiPointGeometry2d,
  MultiPointGeometry3d,
  MultiPolygonCoordinates,
  MultiPolygonFeature,
  MultiPolygonGeometry,
  PointFeature,
  PointGeometry,
  PointGeometry2d,
  PointGeometry3d,
  PolygonCoordinates,
  PolygonFeature,
} from "@jsse/geotypes";

// } from "./geojson-types.js";
// export * from "./geojson-types.js";

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
      typeof el[2] === "number",
  );
export const isCoordinates = (value: unknown): value is Coordinate[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(
    (el) =>
      Array.isArray(el) &&
      ((el.length === 2 && typeof el[0] === "number" && typeof el[1] === "number") ||
        (el.length === 3 && typeof el[0] === "number" && typeof el[1] === "number" && typeof el[2] === "number")),
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

export const featureProperties = <TProperties extends GeoJsonProperties | undefined = GeoJsonProperties>(properties?: TProperties): TProperties => {
  if (properties === undefined) {
    return {} as TProperties;
  }
  return properties;
};

const optsBbox = (bbox: unknown): BBox => {
  if (!isBBox(bbox)) {
    throw new Error(
      `Invalid bbox: ${JSON.stringify(
        bbox,
      )}; must be [number, number, number, number] or [number, number, number, number, number, number]`,
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
    `Invalid coordinates: ${JSON.stringify(coordinates)}; must be [number, number] or [number, number, number]`,
  );
};

export const isLineStringCoordinates = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: TCoordinate[],
): coordinates is LineStringCoordinates<TCoordinate> => {
  return isCoordinates(coordinates) && coordinates.length >= 2;
};
export const lineStringCoordinates = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: TCoordinate[],
): LineStringCoordinates<TCoordinate> => {
  if (coordinates.length < 2) {
    throw new Error(`Invalid coordinates: ${JSON.stringify(coordinates)}; must be an array of two or more coordinates`);
  }
  if (!isLineStringCoordinates(coordinates)) {
    throw new Error(
      `Invalid coordinates: ${JSON.stringify(
        coordinates,
      )}; must be an array of [number, number] or [number, number, number]`,
    );
  }
  return coordinates;
};

export const isPolygonCoordinates = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: unknown,
): coordinates is PolygonCoordinates<TCoordinate> => {
  // return Array.isArray(coordinates) && coordinates.every((el) => isPolygonInnerCoordinates(el)
  return (
    Array.isArray(coordinates) &&
    coordinates.every(
      (value) => Array.isArray(value) && value.length >= 4 && value.every((value) => isCoordinate(value)),
    ) &&
    coordinates[0].length === coordinates[coordinates.length - 1].length &&
    coordinates[0].every((el: Coordinate, index: number) => el === coordinates[coordinates.length - 1][index])
  );
};

export const polygonCoordinates = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: unknown,
): PolygonCoordinates<TCoordinate> => {
  if (!isPolygonCoordinates<TCoordinate>(coordinates)) {
    throw new Error(`Invalid polygon coordinates: ${JSON.stringify(coordinates)}`);
  }
  return coordinates;
};

export const pointGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: TCoordinate,
): PointGeometry<TCoordinate> => {
  return {
    type: "Point",
    coordinates: pointCoordinates(coordinates),
  };
};
export const pointGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: TCoordinate,
): PointGeometry2d => pointGeometry(coordinates);
export const pointGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: TCoordinate,
): PointGeometry3d => pointGeometry(coordinates);

export const lineStringGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: LineStringCoordinates<TCoordinate>,
): LineStringGeometry<TCoordinate> => {
  return {
    type: "LineString",
    coordinates: lineStringCoordinates(coordinates),
  };
};
export const lineStringGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: LineStringCoordinates<TCoordinate>,
): LineStringGeometry2d => lineStringGeometry(coordinates);
export const lineStringGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: LineStringCoordinates<TCoordinate>,
): LineStringGeometry3d => lineStringGeometry(coordinates);

export const polygonGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: PolygonCoordinates<TCoordinate>,
): PolygonGeometry<TCoordinate> => ({
  type: "Polygon",
  coordinates: polygonCoordinates(coordinates),
});
export const polygonGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: PolygonCoordinates<TCoordinate>,
): PolygonGeometry2d => polygonGeometry(coordinates);
export const polygonGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: PolygonCoordinates<TCoordinate>,
): PolygonGeometry3d => polygonGeometry(coordinates);

export const multiPointGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: MultiPointCoordinates<TCoordinate>,
): MultiPointGeometry<TCoordinate> => ({
  type: "MultiPoint",
  coordinates,
});
export const multiPointGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: MultiPointCoordinates<TCoordinate>,
): MultiPointGeometry2d => multiPointGeometry(coordinates);
export const multiPointGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: MultiPointCoordinates<TCoordinate>,
): MultiPointGeometry3d => multiPointGeometry(coordinates);

export const multiLineStringGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: MultiLineStringCoordinates<TCoordinate>,
): MultiLineStringGeometry<TCoordinate> => ({
  type: "MultiLineString",
  coordinates,
});
export const multiLineStringGeometry2d = <TCoordinate extends Coordinate2d = Coordinate2d>(
  coordinates: MultiLineStringCoordinates<TCoordinate>,
): MultiLineStringGeometry2d => multiLineStringGeometry(coordinates);
export const multiLineStringGeometry3d = <TCoordinate extends Coordinate3d = Coordinate3d>(
  coordinates: MultiLineStringCoordinates<TCoordinate>,
): MultiLineStringGeometry3d => multiLineStringGeometry(coordinates);

export const multiPolygonGeometry = <TCoordinate extends Coordinate = Coordinate>(
  coordinates: MultiPolygonCoordinates<TCoordinate>,
): MultiPolygonGeometry<TCoordinate> => ({
  type: "MultiPolygon",
  coordinates,
});

export const point = <TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties>(
  coordinates: TCoordinate,
  properties?: TProperties,
  options?: FeatureOptions,
): PointFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: pointGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const lineString = <TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties>(
  coordinates: LineStringCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions,
): LineStringFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: lineStringGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const polygon = <TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties>(
  coordinates: PolygonCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions,
): PolygonFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: polygonGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const multiPoint = <TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties>(
  coordinates: MultiPointCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions,
): MultiPointFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: multiPointGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const multiLineString = <TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties>(
  coordinates: MultiLineStringCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions,
): MultiLineStringFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: multiLineStringGeometry(coordinates),
  properties: featureProperties(properties),
  ...featureOptions(options),
});

export const multiPolygon = <TCoordinate extends Coordinate = Coordinate, TProperties extends GeoJsonProperties | undefined = GeoJsonProperties>(
  coordinates: MultiPolygonCoordinates<TCoordinate>,
  properties?: TProperties,
  options?: FeatureOptions,
): MultiPolygonFeature<TCoordinate, TProperties> => ({
  type: "Feature",
  geometry: multiPolygonGeometry(coordinates),
  properties,
  ...featureOptions(options),
});

export const featureCollection = <TFeature extends Feature = Feature>(
  features: TFeature[],
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
