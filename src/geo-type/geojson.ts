/**
 * Turfbox = turf/geojson + typebox
 */
import type {
  AssertType,
  SchemaOptions,
  TNumber,
  TOptional,
  TSchema,
  TTuple,
  TUnion,
} from "../typebox.js";
import { Nullable, Type } from "../typebox.js";
import type { IsDefined } from "../types.js";
import {
  Coordinate,
  Latitude,
  LatitudeWgs84,
  Longitude,
  LongitudeWgs84,
} from "./coord.js";

export type TCoordinateSchema2d = TTuple<[TNumber, TNumber]>;
export type TCoordinateSchema3d = TTuple<[TNumber, TNumber, TNumber]>;
export type TCoordinateSchemaNd = TUnion<
  [TTuple<[TNumber, TNumber]>, TTuple<[TNumber, TNumber, TNumber]>]
>;
export type TCoordinateSchema =
  | TTuple<[TNumber, TNumber]>
  | TTuple<[TNumber, TNumber, TNumber]>
  | TUnion<[TTuple<[TNumber, TNumber]>, TTuple<[TNumber, TNumber, TNumber]>]>;

export type TBBoxSchema2d = TTuple<[TNumber, TNumber, TNumber, TNumber]>;
export type TBBoxSchema3d = TTuple<
  [TNumber, TNumber, TNumber, TNumber, TNumber, TNumber]
>;
export type TBBoxSchemaNd = TUnion<
  [
    TTuple<[TNumber, TNumber, TNumber, TNumber]>,
    TTuple<[TNumber, TNumber, TNumber, TNumber, TNumber, TNumber]>,
  ]
>;
export type TBBoxSchema =
  | TTuple<[TNumber, TNumber, TNumber, TNumber]>
  | TTuple<[TNumber, TNumber, TNumber, TNumber, TNumber, TNumber]>
  | TUnion<
      [
        TTuple<[TNumber, TNumber, TNumber, TNumber]>,
        TTuple<[TNumber, TNumber, TNumber, TNumber, TNumber, TNumber]>,
      ]
    >;

export const FeatureTypeLiteral = () => Type.Literal("Feature");

export function FeatureCollectionTypeLiteral() {
  return Type.Literal("FeatureCollection");
}

export function GeometryCollectionTypeLiteral() {
  return Type.Literal("GeometryCollection");
}

export const PointTypeLiteral = () => Type.Literal("Point");
export const MultiPointTypeLiteral = () => Type.Literal("MultiPoint");
export const LineStringTypeLiteral = () => Type.Literal("LineString");
export const MultiLineStringTypeLiteral = () => Type.Literal("MultiLineString");
export const PolygonTypeLiteral = () => Type.Literal("Polygon");
export const MultiPolygonTypeLiteral = () => Type.Literal("MultiPolygon");

export function GeoJSONType() {
  return Type.Union(
    [
      FeatureTypeLiteral(),
      FeatureCollectionTypeLiteral(),
      GeometryCollectionTypeLiteral(),
      PointTypeLiteral(),
      MultiPointTypeLiteral(),
      LineStringTypeLiteral(),
      MultiLineStringTypeLiteral(),
      PolygonTypeLiteral(),
      MultiPolygonTypeLiteral(),
    ],
    {
      title: "GeoJSON type",
      description:
        "GeoJSON type property: Feature, FeatureCollection, GeometryCollection, Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon",
    },
  );
}

export function FeatureId() {
  return Type.Union([Type.String(), Type.Number(), Type.Null()], {
    title: "Feature id",
    description: "Feature id",
  });
}

export function BBox2d(options?: SchemaOptions) {
  return Type.Tuple([Longitude(), Latitude(), Longitude(), Latitude()], {
    title: "GeoJSON BBox 2d",
    description: "bbox: [west, south, east, north]",
    ...options,
  });
}

export function BBox3d(options?: SchemaOptions) {
  return Type.Tuple([...Type.Rest(BBox2d()), Type.Number(), Type.Number()], {
    title: "GeoJSON BBox 3d",
    description: "bbox: [west, south, east, north, min-z, max-z]",
    ...options,
  });
}

export function BBox(options?: SchemaOptions) {
  return Type.Union([BBox2d(), BBox3d()], {
    title: "GeoJSON BBox",
    description:
      "bbox: [west, south, east, north] or [west, south, east, north, min-z, max-z]",
    ...options,
  });
}

export function BBox2dWgs84(options?: SchemaOptions) {
  return Type.Tuple(
    [LongitudeWgs84(), LatitudeWgs84(), LongitudeWgs84(), LatitudeWgs84()],
    {
      title: "GeoJSON BBox 2d WGS84",
      description: "bbox: [west, south, east, north]",
      ...options,
    },
  );
}

export function BBox3dWgs84(options?: SchemaOptions) {
  return Type.Tuple(
    [...Type.Rest(BBox2dWgs84()), Type.Number(), Type.Number()],
    {
      title: "GeoJSON BBox 3d WGS84",
      description: "bbox: [west, south, east, north, min-z, max-z]",
      ...options,
    },
  );
}

export function BBoxWgs84(options?: SchemaOptions) {
  return Type.Union([BBox2dWgs84(), BBox3dWgs84()], {
    title: "GeoJSON BBox WGS84",
    description:
      "bbox: [west, south, east, north] or [west, south, east, north, min-z, max-z]",
    ...options,
  });
}

export function GeojsonProperties(options?: SchemaOptions) {
  return Nullable(Type.Record(Type.String(), Type.Unknown()), {
    title: "GeoJSON properties",
    ...options,
  });
}

export function NamedCoordinateReferenceSystem(options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("name"),
      properties: Type.Object({
        name: Type.String(),
      }),
    },
    {
      title: "Named Coordinate Reference System",
      description: "Named Coordinate Reference System",
      ...options,
    },
  );
}

export function LinkedCoordinateReferenceSystem(options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("link"),
      properties: Type.Object({
        href: Type.String(),
        type: Type.String(),
      }),
    },
    {
      title: "Linked Coordinate Reference System",
      description: "Linked Coordinate Reference System",
      ...options,
    },
  );
}

export function CoordinateReferenceSystem(options?: SchemaOptions) {
  return Type.Optional(
    Type.Union(
      [NamedCoordinateReferenceSystem(), LinkedCoordinateReferenceSystem()],
      {
        title: "Coordinate Reference System",
        description: "Coordinate Reference System",
        ...options,
      },
    ),
  );
}

export type TCoordinateReferenceSystemSchema = ReturnType<
  typeof CoordinateReferenceSystem
>;

/**
 * type inference for coordinate(s)
 */
export type TGeojsonCoordinate<T extends TCoordinateSchema | undefined> =
  IsDefined<T> extends true ? AssertType<T> : ReturnType<typeof Coordinate>;

export function GeojsonCoordinate<
  T extends TCoordinateSchema | undefined = undefined,
>(schema?: T) {
  return (
    schema === undefined ? Coordinate() : schema
  ) as TGeojsonCoordinate<T>;
}

export const BBoxDefault = () => Type.Optional(BBox());
/** */
export type TGeojsonBoundingBox<T extends TBBoxSchema | undefined> =
  IsDefined<T> extends true
    ? AssertType<T>
    : TOptional<ReturnType<typeof BBox>>;

export function GeojsonBoudingBox<
  T extends TBBoxSchema | undefined = undefined,
>(schema?: T): TGeojsonBoundingBox<T> {
  return (
    schema === undefined ? Type.Optional(BBox()) : schema
  ) as TGeojsonBoundingBox<T>;
}

export type TGeometrySchemas<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
> = {
  coordinate?: TCoord;
  bbox?: TBBox;
};

export type TFeatureSchemas<
  TProperties extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCoordinateReferenceSystem extends
    | TCoordinateReferenceSystemSchema
    | undefined,
> = {
  properties?: TProperties;
  crs?: TCoordinateReferenceSystem;
} & TGeometrySchemas<TCoord, TBBox>;

export type TFeatureSchemasV2<
  TProperties extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCoordinateReferenceSystem extends
    | TCoordinateReferenceSystemSchema
    | undefined,
> = {
  properties?: TProperties;
  crs?: TCoordinateReferenceSystem;
} & TGeometrySchemas<TCoord, TBBox>;

/**
 * GeoJSON Point geometry schema builder
 * @param schemas object with coordinate and bbox schemas
 * @param options schema options from typebox
 * @returns geojson point geometry typebox schema
 */
export function PointGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Point"),
      coordinates: GeojsonCoordinate(schemas && schemas.coordinate),
      // bbox: Type.Optional(GeojsonBoudingBox(schemas && schemas.bbox)),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      title: "GeoJSON Point",
      description: "GeoJSON Point geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

export function PointGeometry2d(
  schemas?: TGeometrySchemas<TCoordinateSchema2d>,
  options?: SchemaOptions,
) {
  return PointGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    {
      $id: "point-geometry-2d",
      title: "GeoJSON Point 2d",
      ...options,
    },
  );
}

export function PointGeometry3d(
  schemas?: TGeometrySchemas<TCoordinateSchema3d>,
  options?: SchemaOptions,
) {
  return PointGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    {
      $id: "point-geometry-3d",
      title: "GeoJSON Point 3d",
      ...options,
    },
  );
}

export function LineStringGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("LineString"),
      coordinates: Type.Array(
        GeojsonCoordinate(schemas && schemas.coordinate),
        {
          minItems: 2,
        },
      ),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      $id: "line-string-geometry",
      title: "GeoJSON LineString",
      description: "GeoJSON LineString geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

export function PolygonGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Polygon"),
      coordinates: Type.Array(
        Type.Array(GeojsonCoordinate(schemas && schemas.coordinate), {
          minItems: 4,
        }),
        {
          minItems: 1,
        },
      ),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      $id: "polygon-geometry",
      title: "GeoJSON Polygon",
      description: "GeoJSON Polygon geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

export function PolygonGeometry2d(
  schemas?: TGeometrySchemas<TCoordinateSchema2d>,
  options?: SchemaOptions,
) {
  return PolygonGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    {
      $id: "polygon-geometry-2d",
      title: "GeoJSON Polygon 2d",
      ...options,
    },
  );
}

export function PolygonGeometry3d(
  schemas?: TGeometrySchemas<TCoordinateSchema3d>,
  options?: SchemaOptions,
) {
  return PolygonGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    { title: "GeoJSON Polygon 3d", ...options },
  );
}

export function MultiPointGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("MultiPoint"),
      coordinates: Type.Array(
        GeojsonCoordinate(schemas && schemas.coordinate),
        {
          minItems: 1,
          title: "MultiPoint coordinates",
        },
      ),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      $id: "multi-point-geometry",
      title: "GeoJSON MultiPoint",
      description: "GeoJSON MultiPoint geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

export function MultiLineStringGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("MultiLineString"),
      coordinates: Type.Array(
        Type.Array(GeojsonCoordinate(schemas && schemas.coordinate), {
          minItems: 2,
        }),
        {
          minItems: 1,
        },
      ),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      $id: "multi-line-string-geometry",
      title: "GeoJSON MultiLineString",
      description: "GeoJSON MultiLineString geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

export function MultiPolygonGeometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("MultiPolygon"),
      coordinates: Type.Array(
        Type.Array(
          Type.Array(GeojsonCoordinate(schemas && schemas.coordinate), {
            minItems: 4,
          }),
          {
            minItems: 1,
          },
        ),
        {
          minItems: 1,
        },
      ),
      bbox: GeojsonBoudingBox(schemas && schemas.bbox),
    },
    {
      $id: "multi-polygon-geometry",
      title: "GeoJSON MultiPolygon",
      description: "GeoJSON MultiPolygon geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

export function GeometryPrimitive<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Union(
    [
      PointGeometry(schemas),
      LineStringGeometry(schemas),
      PolygonGeometry(schemas),
      MultiPointGeometry(schemas),
      MultiLineStringGeometry(schemas),
      MultiPolygonGeometry(schemas),
    ],
    {
      title: "GeoJSON Geometry",
      description: "GeoJSON Geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

export function GeometryCollection(options?: SchemaOptions) {
  const s = Type.Recursive((This) =>
    Type.Object(
      {
        type: Type.Literal("GeometryCollection"),
        geometries: Type.Array(
          Type.Union([
            This,
            PointGeometry(),
            MultiPointGeometry(),
            LineStringGeometry(),
            MultiLineStringGeometry(),
            PolygonGeometry(),
            MultiPolygonGeometry(),
          ]),
        ),
        properties: Type.Optional(GeojsonProperties()),
        bbox: Type.Optional(BBox()),
      },
      {
        title: "GeoJSON GeometryCollection",
        description: "GeoJSON GeometryCollection",
        additionalProperties: false,
        ...options,
      },
    ),
  );
  return s;
}
export function Geometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Union([GeometryPrimitive(), GeometryCollection()], {
    title: "GeoJSON Geometry",
    description: "GeoJSON Geometry",
    additionalProperties: false,
    ...options,
  });
}

export function FeatureSchema(
  propertiesSchema?: ReturnType<typeof GeojsonProperties>,
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      geometry: Geometry(),
      properties: Type.Optional(propertiesSchema || GeojsonProperties()),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON Feature",
    },
  );
}

export type GeometrySchema =
  | ReturnType<typeof PointGeometry>
  | ReturnType<typeof LineStringGeometry>
  | ReturnType<typeof PolygonGeometry>
  | ReturnType<typeof MultiPointGeometry>
  | ReturnType<typeof MultiLineStringGeometry>
  | ReturnType<typeof MultiPolygonGeometry>;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type GeojsonProperties<T extends TSchema | undefined> =
  IsDefined<T> extends true
    ? AssertType<T>
    : ReturnType<typeof GeojsonProperties>;
export type GeojsonCrs<T extends TSchema | undefined> =
  IsDefined<T> extends true ? AssertType<T> : TCoordinateReferenceSystemSchema;

export function FeatureProperties<T extends TSchema | undefined>(schema?: T) {
  return (
    schema === undefined ? Type.Unknown() : schema
  ) as GeojsonProperties<T>;
}

export function FeatureCrs<T extends TSchema | undefined>(schema?: T) {
  return (
    schema === undefined ? Type.Optional(CoordinateReferenceSystem()) : schema
  ) as GeojsonCrs<T>;
}

export function Feature<
  Geom extends GeometrySchema,
  P extends TSchema | undefined,
>(geometry?: Geom, properties?: P, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      geometry: geometry || Geometry(),
      properties: FeatureProperties(properties),
    },
    options,
  );
}

export function FeatureCollection(
  feature?: ReturnType<typeof Feature>,
  options?: SchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("FeatureCollection"),
      features: Type.Array(
        feature ||
          Type.Object(
            {
              type: Type.Literal("Feature"),
              geometry: Geometry(),
              properties: GeojsonProperties(),
            },
            options,
          ),
      ),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON FeatureCollection",
      description: "GeoJSON FeatureCollection",
      additionalProperties: false,
      ...options,
    },
  );
}

export function GeoJSON() {
  return Type.Union(
    [
      FeatureCollection(),
      GeometryCollection(),
      PointGeometry(),
      LineStringGeometry(),
      PolygonGeometry(),
      MultiPointGeometry(),
      MultiLineStringGeometry(),
      MultiPolygonGeometry(),
    ],
    {
      title: "GeoJSON",
      description: "GeoJSON",
    },
  );
}

export function GeoJSON2d() {
  return Type.Union(
    [
      FeatureCollection(),
      GeometryCollection(),
      PointGeometry2d(),
      LineStringGeometry(),
      PolygonGeometry2d(),
      MultiPointGeometry(),
      MultiLineStringGeometry(),
      MultiPolygonGeometry(),
    ],
    {
      title: "GeoJSON 2d",
      description: "GeoJSON 2d",
    },
  );
}

export function PointFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(
  schemas?: TFeatureSchemas<TProps, TCoord, TBBox, TCrs>,
  options?: SchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: PointGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
      crs: FeatureCrs(schemas?.crs),
    },
    options,
  );
}

export function LineStringFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(
  schemas?: TFeatureSchemas<TProps, TCoord, TBBox, TCrs>,
  options?: SchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: LineStringGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
      crs: FeatureCrs(schemas?.crs),
    },
    options,
  );
}

export function PolygonFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(
  schemas?: TFeatureSchemas<TProps, TCoord, TBBox, TCrs>,
  options?: SchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: PolygonGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
      crs: FeatureCrs(schemas?.crs),
    },
    options,
  );
}

export function MultiPointFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(
  schemas?: TFeatureSchemas<TProps, TCoord, TBBox, TCrs>,
  options?: SchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiPointGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
      crs: FeatureCrs(schemas?.crs),
    },
    options,
  );
}

export function MultiLineStringFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(
  schemas?: TFeatureSchemas<TProps, TCoord, TBBox, TCrs>,
  options?: SchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiLineStringGeometry({
        coordinate: schemas?.coordinate,
        bbox: schemas?.bbox,
      }),
      properties: FeatureProperties(schemas?.properties),
      crs: FeatureCrs(schemas?.crs),
    },
    options,
  );
}

export function MultiPolygonFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(
  schemas?: TFeatureSchemas<TProps, TCoord, TBBox, TCrs>,
  options?: SchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiPolygonGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
      crs: FeatureCrs(schemas?.crs),
    },
    {
      title: "GeoJSON MultiPolygon Feature",
      ...options,
    },
  );
}

/**
 * =====================================================
 * 2d and 3d feature variants
 * =====================================================
 */
export type TFeatureSchemas2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
> = TFeatureSchemas<TProps, TCoordinateSchema2d, TBBox, TCrs>;

export type TFeatureSchemas3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
> = TFeatureSchemas<TProps, TCoordinateSchema3d, TBBox, TCrs>;

export function PointFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return PointFeature(schemas, options);
}

export function PointFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return PointFeature(schemas, options);
}

export function MultiPointFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return MultiPointFeature(schemas, options);
}

export function MultiPointFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return MultiPointFeature(schemas, options);
}

export function LineStringFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return LineStringFeature(schemas, options);
}

export function LineStringFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return LineStringFeature(schemas, options);
}

export function MultiLineStringFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return MultiLineStringFeature(schemas, options);
}

export function MultiLineStringFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return MultiLineStringFeature(schemas, options);
}

export function PolygonFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return PolygonFeature(schemas, options);
}

export function PolygonFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return PolygonFeature(schemas, options);
}

export function MultiPolygonFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return MultiPolygonFeature(schemas, options);
}

export function MultiPolygonFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox, TCrs>, options?: SchemaOptions) {
  return MultiPolygonFeature(schemas, options);
}

/**
 * Creates a set of GeoJSON Feature schemas for all geometry types.
 * @param schemas
 * @param options
 * @returns GeoJSON Feature schemas for all geometry types
 */
export function FeatureSet<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
  TCrs extends TCoordinateReferenceSystemSchema | undefined,
>(
  schemas?: TFeatureSchemas<TProps, TCoord, TBBox, TCrs>,
  options?: SchemaOptions,
) {
  return {
    point: PointFeature(schemas, options),
    line: LineStringFeature(schemas, options),
    polygon: PolygonFeature(schemas, options),
    multiPoint: MultiPointFeature(schemas, options),
    multiLine: MultiLineStringFeature(schemas, options),
    multiPolygon: MultiPolygonFeature(schemas, options),
  };
}

export {
  LineStringFeature as LineString,
  LineStringFeature2d as LineString2d,
  LineStringFeature3d as LineString3d,
  MultiLineStringFeature as MultiLineString,
  MultiLineStringFeature2d as MultiLineString2d,
  MultiLineStringFeature3d as MultiLineString3d,
  MultiPointFeature as MultiPoint,
  MultiPointFeature2d as MultiPoint2d,
  MultiPointFeature3d as MultiPoint3d,
  MultiPolygonFeature as MultiPolygon,
  MultiPolygonFeature2d as MultiPolygon2d,
  MultiPolygonFeature3d as MultiPolygon3d,
  PointFeature as Point,
  PointFeature2d as Point2d,
  PointFeature3d as Point3d,
  PolygonFeature as Polygon,
  PolygonFeature2d as Polygon2d,
  PolygonFeature3d as Polygon3d,
};
