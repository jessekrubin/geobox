import { z } from "zod";

export type Coordinate2d = [number, number];
export type Coordinate3d = [number, number, number];
export type Coordinate = Coordinate2d | Coordinate3d;

// export type ZCoordinate2d = z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
// export type ZCoordinate3d = z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
// export type ZCoordinateNd = z.ZodUnion<[z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>]>;
// export type ZCoordinate = ZCoordinate2d | ZCoordinate3d | ZCoordinateNd;

// export type ZBBox2d = z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
// export type ZBBox3d = z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
// export type ZBBoxNd = z.ZodUnion<[z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber], null>, z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber], null>]>
// export type ZBBox = ZBBox2d | ZBBox3d | ZBBoxNd;

export type IsDefined<T> = Extract<T, undefined> extends never ? true : false;
export type AssertCoordinate<T, E extends ZCoordinate = ZCoordinate> = T extends E ? T : never;
export type ZGeojsonCoordinate<T extends ZCoordinate | undefined> = IsDefined<T> extends true
  ? AssertCoordinate<T, ZCoordinate>
  : ReturnType<typeof coordinate>;
export type AssertBBox<T, E extends ZBBox = ZBBox> = T extends E ? T : never;
export type ZGeojsonBoundingBox<T extends ZBBox | undefined> = IsDefined<T> extends true
  ? AssertBBox<T, ZBBox>
  : ReturnType<typeof bbox>;

export type AssertProperties<T, E extends z.ZodTypeAny = z.ZodTypeAny> = T extends E ? T : never;
export type ZGeojsonProperties<T extends z.ZodTypeAny | undefined> = IsDefined<T> extends true
  ? AssertProperties<T, z.ZodTypeAny>
  : ReturnType<typeof z.record>;

export type ZFid = z.ZodUnion<[z.ZodString, z.ZodNumber]> | z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
export type AssertFeatureId<T, E extends ZFid> = T extends E ? T : never;
export type ZGeojsonFeatureId<T extends ZFid | undefined> = IsDefined<T> extends true
  ? AssertFeatureId<T, ZFid>
  : ReturnType<typeof featureId>;

export const featureId = () => z.union([z.string(), z.number()]).optional();

export type LonLatOptionz = { min?: number; max?: number; description?: string };
export const latitude = (optionz?: LonLatOptionz) => {
  const { min = -90, max = 90 } = optionz ?? {};
  if (min > max) throw new Error("min must be less than max");
  const s = z.number({ description: optionz?.description ?? "Latitude" });
  if (optionz?.min !== undefined) s.min(min);
  if (optionz?.max !== undefined) s.max(max);
  return s;
};
export const longitude = (optionz?: LonLatOptionz) => {
  const { min = -180, max = 180 } = optionz ?? {};
  if (min > max) throw new Error("min must be less than max");
  const s = z.number({ description: optionz?.description ?? "Longitude" });
  if (optionz?.min !== undefined) s.min(min);
  if (optionz?.max !== undefined) s.max(max);
  return s;
};
export const latitudeWgs84 = () => z.number({ description: "Latitude WGS84" }).min(-90).max(90);
export const longitudeWgs84 = () => z.number({ description: "Longitude WGS84" }).min(-180).max(180);

export const coordinate2d = () => z.tuple([longitude(), latitude()]);
export const coordinate2dWgs84 = () => z.tuple([longitudeWgs84(), latitudeWgs84()]);
export const coordinate3d = () => z.tuple([longitude(), latitude(), z.number()]);
export const coordinate3dWgs84 = () => z.tuple([longitudeWgs84(), latitudeWgs84(), z.number()]);
export const coordinateNd = () => z.union([coordinate2d(), coordinate3d()]);
export const coordinate = () => z.union([coordinate2d(), coordinate3d()]);
export const coordinateWgs84 = () => z.union([coordinate2dWgs84(), coordinate3dWgs84()]);

export const bbox2d = () => z.tuple([longitude(), latitude(), longitude(), latitude()]);
export const bbox3d = () => z.tuple([longitude(), latitude(), longitude(), latitude(), z.number(), z.number()]);
export const bbox = () => z.union([bbox2d(), bbox3d()]);

export type ZFeatureId = ReturnType<typeof featureId>;
export type ZCoordinate2d = ReturnType<typeof coordinate2d>;
export type ZCoordinate3d = ReturnType<typeof coordinate3d>;
export type ZCoordinateNd = ReturnType<typeof coordinateNd>;
export type ZCoordinate = ZCoordinate2d | ZCoordinate3d | ZCoordinateNd;

export type ZBBox2d = ReturnType<typeof bbox2d>;
export type ZBBox3d = ReturnType<typeof bbox3d>;
export type ZBBoxNd = ReturnType<typeof bbox>;
export type ZBBox = ZBBox2d | ZBBox3d | ZBBoxNd;

export const geojsonCoordinate = <T extends ZCoordinate | undefined = undefined>(schema?: T) =>
  (schema === undefined ? coordinate() : schema) as ZGeojsonCoordinate<T>;
export const geojsonBoundingBox = <T extends ZBBox | undefined = undefined>(schema?: T) =>
  (schema === undefined ? bbox().optional() : schema) as ZGeojsonBoundingBox<T>;
export const geojsonProperties = <T extends z.ZodTypeAny | undefined = undefined>(schema?: T) =>
  (schema === undefined ? z.record(z.any()).optional() : schema) as ZGeojsonProperties<T>;
export const geojsonFeatureId = <T extends ZFid | undefined = undefined>(schema?: T) =>
  (schema === undefined ? featureId().optional() : schema) as ZGeojsonFeatureId<T>;

export type ZGeometrySchemaz<
  TCoord extends ZCoordinate | undefined = undefined,
  TBBox extends ZBBox | undefined = undefined
> = {
  coordinate?: TCoord;
  bbox?: TBBox;
};
export type ZFeatureSchemaz<
  TCoord extends ZCoordinate | undefined = undefined,
  TBBox extends ZBBox | undefined = undefined,
  TProps extends z.ZodTypeAny | undefined = undefined,
  TFeatureId extends ZFeatureId | undefined = undefined
> = {
  coordinate?: TCoord;
  bbox?: TBBox;
  properties?: TProps;
  featureId?: TFeatureId;
};

export const pointGeometry = <TCoord extends ZCoordinate | undefined, TBBox extends ZBBox | undefined>(
  schemaz?: ZGeometrySchemaz<TCoord, TBBox>
) =>
  z.object({
    type: z.literal("Point"),
    coordinates: geojsonCoordinate(schemaz?.coordinate),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const lineStringGeometry = <TCoord extends ZCoordinate | undefined, TBBox extends ZBBox | undefined>(
  schemaz?: ZGeometrySchemaz<TCoord, TBBox>
) =>
  z.object({
    type: z.literal("LineString"),
    coordinates: z.array(geojsonCoordinate(schemaz?.coordinate)),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const polygonGeometry = <TCoord extends ZCoordinate | undefined, TBBox extends ZBBox | undefined>(
  schemaz?: ZGeometrySchemaz<TCoord, TBBox>
) =>
  z.object({
    type: z.literal("Polygon"),
    coordinates: z.array(z.array(geojsonCoordinate(schemaz?.coordinate)).min(4)),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const multiPointGeometry = <TCoord extends ZCoordinate | undefined, TBBox extends ZBBox | undefined>(
  schemaz?: ZGeometrySchemaz<TCoord, TBBox>
) =>
  z.object({
    type: z.literal("MultiPoint"),
    coordinates: z.array(geojsonCoordinate(schemaz?.coordinate)),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const multiLineStringGeometry = <TCoord extends ZCoordinate | undefined, TBBox extends ZBBox | undefined>(
  schemaz?: ZGeometrySchemaz<TCoord, TBBox>
) =>
  z.object({
    type: z.literal("MultiLineString"),
    coordinates: z.array(z.array(geojsonCoordinate(schemaz?.coordinate))),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const multiPolygonGeometry = <TCoord extends ZCoordinate | undefined, TBBox extends ZBBox | undefined>(
  schemaz?: ZGeometrySchemaz<TCoord, TBBox>
) =>
  z.object({
    type: z.literal("MultiPolygon"),
    // coordinates: geojsonCoordinate(schemaz?.coordinate),
    coordinates: z.array(z.array(z.array(geojsonCoordinate(schemaz?.coordinate)).min(4))),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export type ZGeometrySchema =
  | ReturnType<typeof pointGeometry>
  | ReturnType<typeof lineStringGeometry>
  | ReturnType<typeof polygonGeometry>
  | ReturnType<typeof multiPointGeometry>
  | ReturnType<typeof multiLineStringGeometry>
  | ReturnType<typeof multiPolygonGeometry>;

export const feature = <TGeometry extends ZGeometrySchema, TProps extends z.ZodTypeAny | undefined = undefined>(
  geometrySchema: TGeometry,
  propertiesSchema?: TProps
) =>
  z.object({
    type: z.literal("Feature"),
    geometry: geometrySchema,
    properties: geojsonProperties(propertiesSchema),
    bbox: geojsonBoundingBox(),
  });

export const pointFeature = <
  TCoord extends ZCoordinate | undefined,
  TBBox extends ZBBox | undefined,
  TProps extends z.ZodTypeAny | undefined,
  TFeatureId extends ZFeatureId | undefined = undefined
>(
  schemaz?: ZFeatureSchemaz<TCoord, TBBox, TProps, TFeatureId>
) =>
  z.object({
    type: z.literal("Feature"),
    id: geojsonFeatureId(schemaz?.featureId),
    geometry: pointGeometry({ coordinate: schemaz?.coordinate, bbox: schemaz?.bbox }),
    properties: geojsonProperties(schemaz?.properties),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const lineStringFeature = <
  TCoord extends ZCoordinate | undefined,
  TBBox extends ZBBox | undefined,
  TProps extends z.ZodTypeAny | undefined,
  TFeatureId extends ZFeatureId | undefined = undefined
>(
  schemaz?: ZFeatureSchemaz<TCoord, TBBox, TProps, TFeatureId>
) =>
  z.object({
    type: z.literal("Feature"),
    geometry: lineStringGeometry({ coordinate: schemaz?.coordinate, bbox: schemaz?.bbox }),
    properties: geojsonProperties(schemaz?.properties),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const polygonFeature = <
  TCoord extends ZCoordinate | undefined,
  TBBox extends ZBBox | undefined,
  TProps extends z.ZodTypeAny | undefined,
  TFeatureId extends ZFeatureId | undefined = undefined
>(
  schemaz?: ZFeatureSchemaz<TCoord, TBBox, TProps, TFeatureId>
) =>
  z.object({
    type: z.literal("Feature"),
    geometry: polygonGeometry({ coordinate: schemaz?.coordinate, bbox: schemaz?.bbox }),
    properties: geojsonProperties(schemaz?.properties),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const multiPointFeature = <
  TCoord extends ZCoordinate | undefined,
  TBBox extends ZBBox | undefined,
  TProps extends z.ZodTypeAny | undefined,
  TFeatureId extends ZFeatureId | undefined = undefined
>(
  schemaz?: ZFeatureSchemaz<TCoord, TBBox, TProps, TFeatureId>
) =>
  z.object({
    type: z.literal("Feature"),
    geometry: multiPointGeometry({ coordinate: schemaz?.coordinate, bbox: schemaz?.bbox }),
    properties: geojsonProperties(schemaz?.properties),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const multiLineStringFeature = <
  TCoord extends ZCoordinate | undefined,
  TBBox extends ZBBox | undefined,
  TProps extends z.ZodTypeAny | undefined,
  TFeatureId extends ZFeatureId | undefined = undefined
>(
  schemaz?: ZFeatureSchemaz<TCoord, TBBox, TProps, TFeatureId>
) =>
  z.object({
    type: z.literal("Feature"),
    geometry: multiLineStringGeometry({ coordinate: schemaz?.coordinate, bbox: schemaz?.bbox }),
    properties: geojsonProperties(schemaz?.properties),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const multiPolygonFeature = <
  TCoord extends ZCoordinate | undefined,
  TBBox extends ZBBox | undefined,
  TProps extends z.ZodTypeAny | undefined,
  TFeatureId extends ZFeatureId | undefined = undefined
>(
  schemaz?: ZFeatureSchemaz<TCoord, TBBox, TProps, TFeatureId>
) =>
  z.object({
    type: z.literal("Feature"),
    geometry: multiPolygonGeometry({ coordinate: schemaz?.coordinate, bbox: schemaz?.bbox }),
    properties: geojsonProperties(schemaz?.properties),
    bbox: geojsonBoundingBox(schemaz?.bbox),
  });

export const geometriez = <TCoord extends ZCoordinate | undefined, TBBox extends ZBBox | undefined>(
  schemaz?: ZGeometrySchemaz<TCoord, TBBox>
) => {
  return {
    pointGeometry: pointGeometry(schemaz),
    lineStringGeometry: lineStringGeometry(schemaz),
    polygonGeometry: polygonGeometry(schemaz),
    multiPointGeometry: multiPointGeometry(schemaz),
    multiLineStringGeometry: multiLineStringGeometry(schemaz),
    multiPolygonGeometry: multiPolygonGeometry(schemaz),
  };
};

export const featurez = <
  TCoord extends ZCoordinate | undefined,
  TBBox extends ZBBox | undefined,
  TProps extends z.ZodTypeAny | undefined,
  TFeatureId extends ZFeatureId | undefined = undefined
>(
  schemaz?: ZFeatureSchemaz<TCoord, TBBox, TProps, TFeatureId>
) => {
  return {
    ...geometriez({
      coordinate: schemaz?.coordinate,
      bbox: schemaz?.bbox,
    }),
    pointFeature: pointFeature(schemaz),
    lineStringFeature: lineStringFeature(schemaz),
    polygonFeature: polygonFeature(schemaz),
    multiPointFeature: multiPointFeature(schemaz),
    multiLineStringFeature: multiLineStringFeature(schemaz),
    multiPolygonFeature: multiPolygonFeature(schemaz),
  };
};
