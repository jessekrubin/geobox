/**
 * Turfbox = turf/geojson + typebox
 */
import type { AssertType, SchemaOptions, TLiteral, TNumber, TObject, TSchema, TUnknown } from "./typebox.js";
import { Nullable, Type } from "./typebox.js";
import type { IsDefined } from "./types.js";

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

/**
 * GeoJSON Latitude json-schema
 * @returns {TNumber} GeoJSON Latitude json-schema
 */
export const Latitude = () =>
  Type.Number({
    title: "Latitude",
    description: "Longitude",
  });

/**
 * GeoJSON Longitude json-schema
 * @returns {TNumber} GeoJSON Longitude json-schema
 */
export const Longitude = () =>
  Type.Number({
    title: "Longitude",
    description: "Longitude",
  });

export const LatitudeWgs84 = () =>
  Type.Number({
    minimum: -90,
    maximum: 90,
    title: "LatitudeWgs84",
    description: "WGS84 latitude; -90 to 90 degrees",
  });

export const LongitudeWgs84 = () =>
  Type.Number({
    minimum: -180,
    maximum: 180,
    title: "LongitudeWgs84",
    description: "WGS84 longitude; -180 to 180 degrees",
  });
export const Coordinate2d = () =>
  Type.Tuple([Longitude(), Latitude()], {
    title: "GeoJSON coordinate 2d",
    description: "coordinate: [longitude, latitude]",
  });
export const Coordinate3d = () =>
  Type.Tuple([...Type.Rest(Coordinate2d()), Type.Number()], {
    title: "GeoJSON coordinate 3d",
    description: "coordinate: [longitude, latitude, elevation/z]",
  });
export const Coordinate = () =>
  Type.Union([Coordinate2d(), Coordinate3d()], {
    title: "GeoJSON coordinate",
    description: "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
  });

export const Coordinate2dWgs84 = () =>
  Type.Tuple([LongitudeWgs84(), LatitudeWgs84()], {
    title: "GeoJSON coordinate 2d WGS84",
    description: "coordinate: [longitude, latitude]",
  });
export const Coordinate3dWgs84 = () =>
  Type.Tuple([...Type.Rest(Coordinate2dWgs84()), Type.Number()], {
    title: "GeoJSON coordinate 3d WGS84",
    description: "coordinate: [longitude, latitude, elevation/z]",
  });
export const CoordinateWgs84 = () =>
  Type.Union([Coordinate2dWgs84(), Coordinate3dWgs84()], {
    title: "GeoJSON coordinate WGS84",
    description: "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
  });

export const BBox2d = () =>
  Type.Tuple([Longitude(), Latitude(), Longitude(), Latitude()], {
    title: "GeoJSON BBox 2d",
    description: "bbox: [west, south, east, north]",
  });
export const BBox3d = () =>
  Type.Tuple([...Type.Rest(BBox2d()), Type.Number(), Type.Number()], {
    title: "GeoJSON BBox 3d",
    description: "bbox: [west, south, east, north, min-z, max-z]",
  });
export const BBox = () =>
  Type.Union([BBox2d(), BBox3d()], {
    title: "GeoJSON BBox",
    description: "bbox: [west, south, east, north] or [west, south, east, north, min-z, max-z]",
  });

export const BBox2dWgs84 = () =>
  Type.Tuple([LongitudeWgs84(), LatitudeWgs84(), LongitudeWgs84(), LatitudeWgs84()], {
    title: "GeoJSON BBox 2d WGS84",
    description: "bbox: [west, south, east, north]",
  });
export const BBox3dWgs84 = () =>
  Type.Tuple([...Type.Rest(BBox2dWgs84()), Type.Number(), Type.Number()], {
    title: "GeoJSON BBox 3d WGS84",
    description: "bbox: [west, south, east, north, min-z, max-z]",
  });
export const BBoxWgs84 = () =>
  Type.Union([BBox2dWgs84(), BBox3dWgs84()], {
    title: "GeoJSON BBox WGS84",
    description: "bbox: [west, south, east, north] or [west, south, east, north, min-z, max-z]",
  });

export const GeojsonProperties = () =>
  Nullable(Type.Record(Type.String(), Type.Unknown()), {
    default: null,
  });

export const PointGeometry = () =>
  Type.Object({ type: Type.Literal("Point"), coordinates: Coordinate() }, { title: "GeoJSON Point" });

export const LineGeometry = (SchemaOptions?: SchemaOptions) =>
  Type.Object(
    {
      type: Type.Literal("LineString"),
      coordinates: Type.Array(Coordinate()),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON LineString",
      description: "GeoJSON LineString geometry",
      additionalProperties: false,
      ...(SchemaOptions || {}),
    }
  );
export const PolygonGeometry = (SchemaOptions?: SchemaOptions) =>
  Type.Object(
    {
      type: Type.Literal("Polygon"),
      coordinates: Type.Array(
        Type.Array(Coordinate(), {
          minItems: 4,
        })
      ),
    },
    {
      title: "PolygonGeometry",
      description: "GeoJSON Polygon geometry",
      additionalProperties: false,
      ...(SchemaOptions || {}),
    }
  );
export const MultiPointGeometry = (SchemaOptions?: SchemaOptions) =>
  Type.Object(
    {
      type: Type.Literal("MultiPoint"),
      coordinates: Type.Array(Coordinate()),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON MultiPoint",
      description: "GeoJSON MultiPoint geometry",
      additionalProperties: false,
      ...(SchemaOptions || {}),
    }
  );

export const MultiLineStringGeometry = (SchemaOptions?: SchemaOptions) =>
  Type.Object(
    {
      type: Type.Literal("MultiLineString"),
      coordinates: Type.Array(Type.Array(Coordinate())),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON MultiLineString",
      description: "GeoJSON MultiLineString geometry",
      additionalProperties: false,
      ...(SchemaOptions || {}),
    }
  );

export const MultiPolygonGeometry = (SchemaOptions?: SchemaOptions) =>
  Type.Object(
    {
      type: Type.Literal("MultiPolygon"),
      coordinates: Type.Array(Type.Array(Type.Array(Coordinate()))),
      bbox: Type.Optional(BBox()),
    },
    {
      title: "GeoJSON MultiPolygon",
      description: "GeoJSON MultiPolygon geometry",
      additionalProperties: false,
    }
  );

export const Geometry = () =>
  Type.Union(
    [
      PointGeometry(),
      LineGeometry(),
      PolygonGeometry(),
      MultiPointGeometry(),
      MultiLineStringGeometry(),
      MultiPolygonGeometry(),
    ],
    {
      title: "GeoJSON Geometry",
      description: "GeoJSON Geometry",
    }
  );

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

export const FeatureCollection = (featureSchema?: ReturnType<typeof FeatureSchema>, schemaOptions?: SchemaOptions) =>
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
      ...(schemaOptions || {}),
    }
  );

export type GeometrySchema =
  | ReturnType<typeof PointGeometry>
  | ReturnType<typeof LineGeometry>
  | ReturnType<typeof PolygonGeometry>
  | ReturnType<typeof MultiPointGeometry>
  | ReturnType<typeof MultiLineStringGeometry>
  | ReturnType<typeof MultiPolygonGeometry>;

export type FeatureSchema<G extends GeometrySchema, P extends TSchema = TUnknown> = TObject<{
  type: TLiteral<"Feature">;
  geometry: G;
  properties: P;
}>;

export type GeojsonProperties<T extends TSchema | undefined> = IsDefined<T> extends true
  ? AssertType<T>
  : ReturnType<typeof GeojsonProperties>;

export const FeatureProperties = <T extends TSchema | undefined>(schema?: T) =>
  (schema === undefined ? Type.Unknown() : schema) as GeojsonProperties<T>;

export function Feature<Geom extends GeometrySchema, P extends TSchema | undefined>(
  geometrySchema: Geom,
  propertiesSchema: P,
  options?: SchemaOptions
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      geometry: geometrySchema,
      properties: FeatureProperties(propertiesSchema),
    },
    options
  );
}

export function PointFeature<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  // TODO: figure out how to use featureSchema:
  // return featureSchema(PointGeometry, propertiesSchema, options);
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: PointGeometry(),
      properties: FeatureProperties(propertiesSchema),
    },
    options
  );
}

export function LineStringFeature<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: LineGeometry(),
      properties: FeatureProperties(propertiesSchema),
    },
    options
  );
}

export function PolygonFeature<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: PolygonGeometry(),
      properties: FeatureProperties(propertiesSchema),
    },
    options
  );
}

export function MultiPointFeature<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: MultiPointGeometry(),
      properties: FeatureProperties(propertiesSchema),
    },
    options
  );
}

export function MultiLineStringFeature<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: MultiLineStringGeometry(),
      properties: FeatureProperties(propertiesSchema),
    },
    options
  );
}

export function MultiPolygonFeature<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: MultiPolygonGeometry(),
      properties: FeatureProperties(propertiesSchema),
    },
    {
      title: "GeoJSON MultiPolygon Feature",
      ...(options || {}),
    }
  );
}

export function FeatureSet<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return {
    point: PointFeature(propertiesSchema, options),
    line: LineStringFeature(propertiesSchema, options),
    polygon: PolygonFeature(propertiesSchema, options),
    multiPoint: MultiPointFeature(propertiesSchema, options),
    multiLine: MultiLineStringFeature(propertiesSchema, options),
    multiPolygon: MultiPolygonFeature(propertiesSchema, options),
  };
}

export {
  PointFeature as Point,
  LineStringFeature as LineString,
  PolygonFeature as Polygon,
  MultiPointFeature as MultiPoint,
  MultiLineStringFeature as MultiLineString,
  MultiPolygonFeature as MultiPolygon,
};
