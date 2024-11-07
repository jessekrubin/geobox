/**
 * Turfbox = turf/geojson + typebox
 */
import type {
  AssertType,
  SchemaOptions,
  TOptional,
  TSchema,
} from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { IsDefined } from "../types.js";
import type { TBBoxSchema } from "./bbox.js";
import type { TCoord2d, TCoord3d, TCoordinateSchema } from "./coord.js";
import { Nullable } from "../tb.js";
import { BBox } from "./bbox.js";
import { Coord, Coord2d, Coord3d } from "./coord.js";

export function GeoJSONType() {
  return Type.Union(
    [
      Type.Literal("Feature"),
      Type.Literal("FeatureCollection"),
      Type.Literal("GeometryCollection"),
      Type.Literal("Point"),
      Type.Literal("LineString"),
      Type.Literal("Polygon"),
      Type.Literal("MultiPoint"),
      Type.Literal("MultiLineString"),
      Type.Literal("MultiPolygon"),
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
    title: "geojson-feature-id",
    description: "Feature id",
  });
}

export function GeojsonProperties(options?: SchemaOptions) {
  return Nullable(Type.Record(Type.String(), Type.Unknown()), {
    title: "GeoJSON properties",
    ...options,
  });
}

/**
 * type inference for coordinate(s)
 */
export type TGeojsonCoordinate<T extends TCoordinateSchema | undefined> =
  IsDefined<T> extends true ? AssertType<T> : ReturnType<typeof Coord>;

export function GeojsonCoordinate<
  T extends TCoordinateSchema | undefined = undefined,
>(schema?: T) {
  return (schema === undefined ? Coord() : schema) as TGeojsonCoordinate<T>;
}

export const BBoxDefault = () => Type.Optional(BBox());
/** */
export type TGeojsonBoundingBox<T extends TBBoxSchema | undefined> =
  IsDefined<T> extends true ? AssertType<T> : TOptional<TBBoxSchema>;

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
> = {
  properties?: TProperties;
} & TGeometrySchemas<TCoord, TBBox>;

export type TFeatureSchemasV2<
  TProperties extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
> = {
  properties?: TProperties;
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
  schemas?: TGeometrySchemas<TCoord2d>,
  options?: SchemaOptions,
) {
  return PointGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    {
      title: "GeoJSON Point 2d",
      ...options,
    },
  );
}

export function PointGeometry3d(
  schemas?: TGeometrySchemas<TCoord3d>,
  options?: SchemaOptions,
) {
  return PointGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    {
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
      title: "GeoJSON Polygon",
      description: "GeoJSON Polygon geometry",
      additionalProperties: false,
      ...options,
    },
  );
}

export function PolygonGeometry2d(
  schemas?: TGeometrySchemas<TCoord2d>,
  options?: SchemaOptions,
) {
  return PolygonGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    {
      title: "GeoJSON Polygon 2d",
      ...options,
    },
  );
}

export function PolygonGeometry3d(
  schemas?: TGeometrySchemas<TCoord3d>,
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
      title: "GeoJSON Primitive Geometry",
      description: "GeoJSON Primitive Geometry",
      ...options,
    },
  );
}

/**
 * GeoJSON GeometryCollection of ONLY primitive geometries
 * @param schemas
 * @param options {SchemaOptions} typebox schema options
 * @returns geojson geometry collection of primitives
 */

export function PrimitiveGeometryCollection<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("GeometryCollection"),
      geometries: Type.Array(GeometryPrimitive(schemas)),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON GeometryCollection",
      description: "GeoJSON GeometryCollection",
      additionalProperties: false,
      ...options,
    },
  );
}

export function GeometryCollectionRecursive(
  schemas?: TGeometrySchemas<TCoordinateSchema, TBBoxSchema>,
  options?: SchemaOptions,
) {
  const s = Type.Recursive((This) =>
    Type.Object(
      {
        type: Type.Literal("GeometryCollection"),
        geometries: Type.Array(
          Type.Union([
            PointGeometry(schemas),
            MultiPointGeometry(schemas),
            LineStringGeometry(schemas),
            MultiLineStringGeometry(schemas),
            PolygonGeometry(schemas),
            MultiPolygonGeometry(schemas),
            This,
          ]),
        ),
        bbox: Type.Optional(BBox()),
      },
      {
        title: "GeoJSON GeometryCollection",
        description: "GeoJSON GeometryCollection",
        ...options,
      },
    ),
  );
  return s;
}
export function GeometryCollection<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("GeometryCollection"),
      geometries: Type.Array(
        Type.Union([
          PrimitiveGeometryCollection(schemas),
          PointGeometry(schemas),
          MultiPointGeometry(schemas),
          LineStringGeometry(schemas),
          MultiLineStringGeometry(schemas),
          PolygonGeometry(schemas),
          MultiPolygonGeometry(schemas),
        ]),
      ),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON GeometryCollection",
      description: "GeoJSON GeometryCollection",
      additionalProperties: false,
      ...options,
    },
  );
}

export function GeometryCollection2d(options?: SchemaOptions) {
  return GeometryCollection(
    {
      coordinate: Coord(),
    },
    {
      title: "GeoJSON GeometryCollection 2d",
      ...options,
    },
  );
}

export function GeometryCollection3d(options?: SchemaOptions) {
  return GeometryCollection(
    {
      coordinate: Coord(),
    },
    {
      title: "GeoJSON GeometryCollection 3d",
      ...options,
    },
  );
}

export function Geometry<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined,
>(schemas?: TGeometrySchemas<TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Union([
    PointGeometry(schemas),
    MultiPointGeometry(schemas),
    LineStringGeometry(schemas),
    MultiLineStringGeometry(schemas),
    PolygonGeometry(schemas),
    MultiPolygonGeometry(schemas),
    GeometryCollection(schemas),
  ]);
  return Type.Union([GeometryPrimitive(), GeometryCollection()], {
    title: "GeoJSON Geometry",
    description: "GeoJSON Geometry",
    ...options,
  });
}

export function Geometry2d(options?: SchemaOptions) {
  return Type.Union(
    [
      GeometryPrimitive({
        coordinate: Coord2d(),
      }),
      GeometryCollection2d(),
    ],
    {
      title: "GeoJSON Geometry 2d",
      description: "GeoJSON Geometry 2d",
      ...options,
    },
  );
}

export function Geometry3d(options?: SchemaOptions) {
  return Type.Union(
    [
      GeometryPrimitive({
        coordinate: Coord(),
      }),
      GeometryCollection3d(),
    ],
    {
      title: "GeoJSON Geometry 3d",
      description: "GeoJSON Geometry 3d",
      ...options,
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

export function FeatureProperties<T extends TSchema | undefined>(schema?: T) {
  return (
    schema === undefined ? Type.Unknown() : schema
  ) as GeojsonProperties<T>;
}
export function Feature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(
  schemas?: TFeatureSchemas<TProps, TCoord, TBBox> & {
    geometry?: GeometrySchema;
  },
  options?: SchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: schemas?.geometry ?? Geometry(),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(),
    },
    {
      additionalProperties: false,
      ...options,
    },
  );
}

export function FeatureCollection<FSchema extends TSchema>(
  feature?: FSchema,
  options?: SchemaOptions,
) {
  return Type.Object(
    {
      type: Type.Literal("FeatureCollection"),
      features: Type.Array(feature ?? Feature()),
      bbox: Type.Optional(BBox()),
    },
    {
      additionalProperties: false,
      ...options,
    },
  );
}

export function GeoJSON() {
  return Type.Union(
    [
      Feature(),
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

export function PointFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: PointGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
    },
    options,
  );
}

export function LineStringFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: LineStringGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
    },
    options,
  );
}

export function PolygonFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: PolygonGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
    },
    options,
  );
}

export function MultiPointFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiPointGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
    },
    options,
  );
}

export function MultiLineStringFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiLineStringGeometry({
        coordinate: schemas?.coordinate,
        bbox: schemas?.bbox,
      }),
      properties: FeatureProperties(schemas?.properties),
    },
    options,
  );
}

export function MultiPolygonFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiPolygonGeometry({
        coordinate: schemas?.coordinate,
      }),
      properties: FeatureProperties(schemas?.properties),
      bbox: GeojsonBoudingBox(schemas?.bbox),
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
> = TFeatureSchemas<TProps, TCoord2d, TBBox>;

export type TFeatureSchemas3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
> = TFeatureSchemas<TProps, TCoord3d, TBBox>;

export function PointFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: SchemaOptions) {
  return PointFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export function PointFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: SchemaOptions) {
  return PointFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export function MultiPointFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: SchemaOptions) {
  return MultiPointFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export function MultiPointFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: SchemaOptions) {
  return MultiPointFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export function LineStringFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: SchemaOptions) {
  return LineStringFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export function LineStringFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: SchemaOptions) {
  return LineStringFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export function MultiLineStringFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: SchemaOptions) {
  return MultiLineStringFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export function MultiLineStringFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: SchemaOptions) {
  return MultiLineStringFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export function PolygonFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: SchemaOptions) {
  return PolygonFeature(
    {
      coordinate: Coord2d(),
      ...schemas,
    },
    options,
  );
}

export function PolygonFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: SchemaOptions) {
  return PolygonFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

export function MultiPolygonFeature2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas2d<TProps, TBBox>, options?: SchemaOptions) {
  return MultiPolygonFeature({ coordinate: Coord2d(), ...schemas }, options);
}

export function MultiPolygonFeature3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas3d<TProps, TBBox>, options?: SchemaOptions) {
  return MultiPolygonFeature(
    {
      coordinate: Coord3d(),
      ...schemas,
    },
    options,
  );
}

/**
 * Creates a set of GeoJSON Feature schemas for all geometry types.
 * @param schemas
 * @param options
 * @returns GeoJSON Feature schemas for all geometry types
 */
export function features<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined,
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  const point = PointFeature(schemas, options);
  const line = LineStringFeature(schemas, options);
  const polygon = PolygonFeature(schemas, options);
  const multiPoint = MultiPointFeature(schemas, options);
  const multiLine = MultiLineStringFeature(schemas, options);
  const multiPolygon = MultiPolygonFeature(schemas, options);
  return {
    point,
    line,
    polygon,
    multiPoint,
    multiLine,
    multiPolygon,
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
