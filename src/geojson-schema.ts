/**
 * Turfbox = turf/geojson + typebox
 */
import type {
  AssertType,
  SchemaOptions,
  Static,
  TLiteral,
  TNumber,
  TObject,
  TSchema,
  TTuple,
  TUnion,
  TUnknown,
} from "./typebox.js";
import { Nullable, Type } from "./typebox.js";
import type { IsDefined } from "./types.js";

export type TCoordinateSchema2d = TTuple<[TNumber, TNumber]>;
export type TCoordinateSchema3d = TTuple<[TNumber, TNumber, TNumber]>;
export type TCoordinateSchemaNd = TUnion<[TTuple<[TNumber, TNumber]>, TTuple<[TNumber, TNumber, TNumber]>]>;
export type TCoordinateSchema =
  | TTuple<[TNumber, TNumber]>
  | TTuple<[TNumber, TNumber, TNumber]>
  | TUnion<[TTuple<[TNumber, TNumber]>, TTuple<[TNumber, TNumber, TNumber]>]>;

export type TBBoxSchema2d = TTuple<[TNumber, TNumber, TNumber, TNumber]>;
export type TBBoxSchema3d = TTuple<[TNumber, TNumber, TNumber, TNumber, TNumber, TNumber]>;
export type TBBoxSchemaNd = TUnion<
  [TTuple<[TNumber, TNumber, TNumber, TNumber]>, TTuple<[TNumber, TNumber, TNumber, TNumber, TNumber, TNumber]>]
>;
export type TBBoxSchema =
  | TTuple<[TNumber, TNumber, TNumber, TNumber]>
  | TTuple<[TNumber, TNumber, TNumber, TNumber, TNumber, TNumber]>
  | TUnion<
    [TTuple<[TNumber, TNumber, TNumber, TNumber]>, TTuple<[TNumber, TNumber, TNumber, TNumber, TNumber, TNumber]>]
  >;

export const FeatureTypeLiteral = () => Type.Literal("Feature");
export const FeatureCollectionTypeLiteral = () => Type.Literal("FeatureCollection");
export const GeometryCollectionTypeLiteral = () => Type.Literal("GeometryCollection");
export const PointTypeLiteral = () => Type.Literal("Point");
export const MultiPointTypeLiteral = () => Type.Literal("MultiPoint");
export const LineStringTypeLiteral = () => Type.Literal("LineString");
export const MultiLineStringTypeLiteral = () => Type.Literal("MultiLineString");
export const PolygonTypeLiteral = () => Type.Literal("Polygon");
export const MultiPolygonTypeLiteral = () => Type.Literal("MultiPolygon");
export const GeoJSONType = () =>
  Type.Union(
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
    }
  );

export const FeatureId = () =>
  Type.Union([Type.String(), Type.Number(), Type.Null()], {
    title: "Feature id",
    description: "Feature id",
  });

/**
 * GeoJSON Latitude json-schema
 * @returns {TNumber} GeoJSON Latitude json-schema
 */
export const Latitude = (options?: SchemaOptions) =>
  Type.Number({
    title: "Latitude",
    description: "Longitude",
    ...options,
  });

/**
 * GeoJSON Longitude json-schema
 * @returns {TNumber} GeoJSON Longitude json-schema
 */
export const Longitude = (options?: SchemaOptions) =>
  Type.Number({
    title: "Longitude",
    description: "Longitude",
    ...options,
  });

export const LatitudeWgs84 = (options?: SchemaOptions) => Latitude(
  {
    minimum: -90,
    maximum: 90,
    title: "LatitudeWgs84",
    description: "WGS84 latitude; -90 to 90 degrees",
    ...options,
  }
);

export const LongitudeWgs84 = (
  options?: SchemaOptions
) =>
  Longitude({
    minimum: -180,
    maximum: 180,
    title: "LongitudeWgs84",
    description: "WGS84 longitude; -180 to 180 degrees",
    ...options,
  });
export const Coordinate2d = (
  options?: SchemaOptions
) =>
  Type.Tuple([Longitude(), Latitude()], {
    title: "GeoJSON coordinate 2d",
    description: "coordinate: [longitude, latitude]",
    ...options
  },
  );
export const Coordinate3d = (options?: SchemaOptions) =>
  Type.Tuple([...Type.Rest(Coordinate2d()), Type.Number()], {
    title: "GeoJSON coordinate 3d",
    description: "coordinate: [longitude, latitude, elevation/z]",
    ...options
  });
export const Coordinate = (
  options?: SchemaOptions
) =>
  Type.Union([Coordinate2d(), Coordinate3d()], {
    title: "GeoJSON coordinate",
    description: "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
    ...options
  });

export const Coordinate2dWgs84 = (options?: SchemaOptions) =>
  Type.Tuple([LongitudeWgs84(), LatitudeWgs84()], {
    title: "GeoJSON coordinate 2d WGS84",
    description: "coordinate: [longitude, latitude]",
    ...options
  });

export const Coordinate3dWgs84 = (options?: SchemaOptions) =>
  Type.Tuple([...Type.Rest(Coordinate2dWgs84()), Type.Number()], {
    title: "GeoJSON coordinate 3d WGS84",
    description: "coordinate: [longitude, latitude, elevation/z]",
    ...options
  });
export const CoordinateWgs84 = (options?: SchemaOptions) =>
  Type.Union([Coordinate2dWgs84(), Coordinate3dWgs84()], {
    title: "GeoJSON coordinate WGS84",
    description: "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
    ...options
  });

export const BBox2d = (options?: SchemaOptions) =>
  Type.Tuple([Longitude(), Latitude(), Longitude(), Latitude()], {
    title: "GeoJSON BBox 2d",
    description: "bbox: [west, south, east, north]",
    ...options
  });
export const BBox3d = (options?: SchemaOptions) =>
  Type.Tuple([...Type.Rest(BBox2d()), Type.Number(), Type.Number()], {
    title: "GeoJSON BBox 3d",
    description: "bbox: [west, south, east, north, min-z, max-z]",
    ...options
  });
export const BBox = (options?: SchemaOptions) =>
  Type.Union([BBox2d(), BBox3d()], {
    title: "GeoJSON BBox",
    description: "bbox: [west, south, east, north] or [west, south, east, north, min-z, max-z]",
    ...options
  });

export const BBox2dWgs84 = (options?: SchemaOptions) =>
  Type.Tuple([LongitudeWgs84(), LatitudeWgs84(), LongitudeWgs84(), LatitudeWgs84()], {
    title: "GeoJSON BBox 2d WGS84",
    description: "bbox: [west, south, east, north]",
    ...options
  });
export const BBox3dWgs84 = (options?: SchemaOptions) =>
  Type.Tuple([...Type.Rest(BBox2dWgs84()), Type.Number(), Type.Number()], {
    title: "GeoJSON BBox 3d WGS84",
    description: "bbox: [west, south, east, north, min-z, max-z]",
    ...options
  });
export const BBoxWgs84 = (options?: SchemaOptions) =>
  Type.Union([BBox2dWgs84(), BBox3dWgs84()], {
    title: "GeoJSON BBox WGS84",
    description: "bbox: [west, south, east, north] or [west, south, east, north, min-z, max-z]",
    ...options
  });

export const GeojsonProperties = (options?: SchemaOptions) =>
  Nullable(Type.Record(Type.String(), Type.Unknown()), {
    default: null,
    title: "GeoJSON properties",
    ...options,
  },
  );

/**
 * type inference for coordinate(s)
 */
export type TGeojsonCoordinate<T extends TCoordinateSchema | undefined> = IsDefined<T> extends true
  ? AssertType<T>
  : ReturnType<typeof Coordinate>;

export const GeojsonCoordinate = <T extends TCoordinateSchema | undefined = undefined>(schema?: T) =>
  (schema === undefined ? Coordinate() : schema) as TGeojsonCoordinate<T>;

/** */
export type TGeojsonBoundingBox<T extends TBBoxSchema | undefined> = IsDefined<T> extends true
  ? AssertType<T>
  : ReturnType<typeof BBox>;

export const GeojsonBoudingBox = <T extends TBBoxSchema | undefined>(schema?: T) =>
  (schema === undefined ? BBox() : schema) as TGeojsonBoundingBox<T>;

export type TGeometrySchemas<
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined
> = {
  coordinate?: TCoord;
  bbox?: TBBox;
};

export type TFeatureSchemas<
  TProperties extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined
> = {
  properties?: TProperties;
} & TGeometrySchemas<TCoord, TBBox>;

/**
 * GeoJSON Point geometry schema builder
 * @param schemas object with coordinate and bbox schemas
 * @param options schema options from typebox
 * @returns geojson point geometry typebox schema
 */
export const PointGeometry = <
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined
>(
  schemas?: TGeometrySchemas<TCoord, TBBox>,
  options?: SchemaOptions
) => {
  return Type.Object(
    {
      type: Type.Literal("Point"),
      coordinates: GeojsonCoordinate(schemas && schemas.coordinate),
      bbox: Type.Optional(GeojsonBoudingBox(schemas && schemas.bbox)),
    },
    {
      title: "GeoJSON Point",
      description: "GeoJSON Point geometry",
      additionalProperties: false,
      ...(options || {}),
    }
  );
};

export const PointGeometry2d = (schemas?: TGeometrySchemas<TCoordinateSchema2d>, options?: SchemaOptions) =>
  PointGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    { title: "GeoJSON Point 2d", ...(options || {}) }
  );
export const PointGeometry3d = (schemas?: TGeometrySchemas<TCoordinateSchema3d>, options?: SchemaOptions) =>
  PointGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    { title: "GeoJSON Point 3d", ...(options || {}) }
  );

export const LineStringGeometry = <
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined
>(
  schemas?: TGeometrySchemas<TCoord, TBBox>,
  options?: SchemaOptions
) => {
  return Type.Object(
    {
      type: Type.Literal("LineString"),
      coordinates: GeojsonCoordinate(schemas && schemas.coordinate),
      bbox: Type.Optional(GeojsonBoudingBox(schemas && schemas.bbox)),
    },
    {
      title: "GeoJSON LineString",
      description: "GeoJSON LineString geometry",
      additionalProperties: false,
      ...(options || {}),
    }
  );
};

export const PolygonGeometry = <
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined
>(
  schemas?: TGeometrySchemas<TCoord, TBBox>,
  options?: SchemaOptions
) => {
  return Type.Object(
    {
      type: Type.Literal("Polygon"),
      coordinates: GeojsonCoordinate(schemas && schemas.coordinate),
      bbox: Type.Optional(GeojsonBoudingBox(schemas && schemas.bbox)),
    },
    {
      title: "GeoJSON Polygon",
      description: "GeoJSON Polygon geometry",
      additionalProperties: false,
      ...(options || {}),
    }
  );
};

export const PolygonGeometry2d = (schemas?: TGeometrySchemas<TCoordinateSchema2d>, options?: SchemaOptions) => {
  return PolygonGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    { title: "GeoJSON Polygon 2d", ...(options || {}) }
  );
};
export const PolygonGeometry3d = (schemas?: TGeometrySchemas<TCoordinateSchema3d>, options?: SchemaOptions) => {
  return PolygonGeometry(
    {
      coordinate: schemas && schemas.coordinate,
    },
    { title: "GeoJSON Polygon 3d", ...(options || {}) }
  );
};

export const MultiPointGeometry = <
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined
>(
  schemas?: TGeometrySchemas<TCoord, TBBox>,
  options?: SchemaOptions
) => {
  return Type.Object(
    {
      type: Type.Literal("MultiPoint"),
      coordinates: GeojsonCoordinate(schemas && schemas.coordinate),
      bbox: Type.Optional(GeojsonBoudingBox(schemas && schemas.bbox)),
    },
    {
      title: "GeoJSON MultiPoint",
      description: "GeoJSON MultiPoint geometry",
      additionalProperties: false,
      ...(options || {}),
    }
  );
};

export const MultiLineStringGeometry = <
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined
>(
  schemas?: TGeometrySchemas<TCoord, TBBox>,
  options?: SchemaOptions
) => {
  return Type.Object(
    {
      type: Type.Literal("MultiLineString"),
      coordinates: GeojsonCoordinate(schemas && schemas.coordinate),
      bbox: Type.Optional(GeojsonBoudingBox(schemas && schemas.bbox)),
    },
    {
      title: "GeoJSON MultiLineString",
      description: "GeoJSON MultiLineString geometry",
      additionalProperties: false,
      ...(options || {}),
    }
  );
};

export const MultiPolygonGeometry = <
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined
>(
  schemas?: TGeometrySchemas<TCoord, TBBox>,
  options?: SchemaOptions
) => {
  return Type.Object(
    {
      type: Type.Literal("MultiPolygon"),
      coordinates: GeojsonCoordinate(schemas && schemas.coordinate),
      bbox: Type.Optional(GeojsonBoudingBox(schemas && schemas.bbox)),
    },
    {
      title: "GeoJSON MultiPolygon",
      description: "GeoJSON MultiPolygon geometry",
      additionalProperties: false,
      ...(options || {}),
    }
  );
};

export const Geometry = <
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined = undefined
>(
  schemas?: TGeometrySchemas<TCoord, TBBox>,
  options?: SchemaOptions
) => {
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
      ...(options || {}),
    }
  );
};
export const FeatureSchema = (propertiesSchema?: ReturnType<typeof GeojsonProperties>) =>
  Type.Object(
    {
      type: Type.Literal("Feature"),
      geometry: Geometry(),
      properties: Type.Optional(propertiesSchema || GeojsonProperties()),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON Feature",
    }
  );

export const FeatureCollection = (featureSchema?: ReturnType<typeof FeatureSchema>, options?: SchemaOptions) =>
  Type.Object(
    {
      type: Type.Literal("FeatureCollection"),
      features: Type.Array(featureSchema || FeatureSchema()),
      properties: Type.Optional(GeojsonProperties()),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON FeatureCollection",
      description: "GeoJSON FeatureCollection",
      additionalProperties: false,
      ...(options || {}),
    }
  );

export type GeometrySchema =
  | ReturnType<typeof PointGeometry>
  | ReturnType<typeof LineStringGeometry>
  | ReturnType<typeof PolygonGeometry>
  | ReturnType<typeof MultiPointGeometry>
  | ReturnType<typeof MultiLineStringGeometry>
  | ReturnType<typeof MultiPolygonGeometry>;

export type GeojsonProperties<T extends TSchema | undefined> = IsDefined<T> extends true
  ? AssertType<T>
  : ReturnType<typeof GeojsonProperties>;

export const FeatureProperties = <T extends TSchema | undefined>(schema?: T) =>
  (schema === undefined ? Type.Unknown() : schema) as GeojsonProperties<T>;

export function Feature<Geom extends GeometrySchema, P extends TSchema | undefined>(
  {
    geometry: gemoetry,
    properties: properties = undefined,
  }: {
    geometry: Geom;
    properties?: P;
  },
  options?: SchemaOptions
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      geometry: gemoetry,
      properties: FeatureProperties(properties),
    },
    options
  );
}

export function PointFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: PointGeometry({
        coordinate: schemas?.coordinate,
        bbox: schemas?.bbox,
      }),
      properties: FeatureProperties(schemas?.properties),
    },
    options
  );
}

export function LineStringFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: LineStringGeometry({
        coordinate: schemas?.coordinate,
        bbox: schemas?.bbox,
      }),
      properties: FeatureProperties(schemas?.properties),
    },
    options
  );
}

export function PolygonFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: PolygonGeometry({
        coordinate: schemas?.coordinate,
        bbox: schemas?.bbox,
      }),
      properties: FeatureProperties(schemas?.properties),
    },
    options
  );
}

export function MultiPointFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiPointGeometry({
        coordinate: schemas?.coordinate,
        bbox: schemas?.bbox,
      }),
      properties: FeatureProperties(schemas?.properties),
    },
    options
  );
}

export function MultiLineStringFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined
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
    options
  );
}

export function MultiPolygonFeature<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(FeatureId()),
      geometry: MultiPolygonGeometry({
        coordinate: schemas?.coordinate,
        bbox: schemas?.bbox,
      }),
      properties: FeatureProperties(schemas?.properties),
    },
    {
      title: "GeoJSON MultiPolygon Feature",
      ...(options || {}),
    }
  );
}

/**
 * =====================================================
 * 2d and 3d geojson-feature variants
 * =====================================================
 */
export type TFeatureSchemas2d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined
> = TFeatureSchemas<TProps, TCoordinateSchema2d, TBBox>;

export type TFeatureSchemas3d<
  TProps extends TSchema | undefined,
  TBBox extends TBBoxSchema | undefined
> = TFeatureSchemas<TProps, TCoordinateSchema3d, TBBox>;

export function PointFeature2d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas2d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return PointFeature(schemas, options);
}

export function PointFeature3d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas3d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return PointFeature(schemas, options);
}

export function MultiPointFeature2d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas2d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return MultiPointFeature(schemas, options);
}

export function MultiPointFeature3d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas3d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return MultiPointFeature(schemas, options);
}

export function LineStringFeature2d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas2d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return LineStringFeature(schemas, options);
}

export function LineStringFeature3d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas3d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return LineStringFeature(schemas, options);
}

export function MultiLineStringFeature2d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas2d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return MultiLineStringFeature(schemas, options);
}

export function MultiLineStringFeature3d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas3d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return MultiLineStringFeature(schemas, options);
}

export function PolygonFeature2d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas2d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return PolygonFeature(schemas, options);
}

export function PolygonFeature3d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas3d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return PolygonFeature(schemas, options);
}

export function MultiPolygonFeature2d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas2d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return MultiPolygonFeature(schemas, options);
}

export function MultiPolygonFeature3d<TProps extends TSchema | undefined, TBBox extends TBBoxSchema | undefined>(
  schemas?: TFeatureSchemas3d<TProps, TBBox>,
  options?: SchemaOptions
) {
  return MultiPolygonFeature(schemas, options);
}

/**
 * Creates a set of GeoJSON Feature schemas for all geometry types.
 * @param schemas
 * @param options
 * @returns
 */
export function FeatureSet<
  TProps extends TSchema | undefined,
  TCoord extends TCoordinateSchema | undefined,
  TBBox extends TBBoxSchema | undefined
>(schemas?: TFeatureSchemas<TProps, TCoord, TBBox>, options?: SchemaOptions) {
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
