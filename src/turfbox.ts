/**
 * Turfbox = turf/geojson + typebox
 */
import type { AssertType, SchemaOptions, TLiteral, TObject, TSchema, TUnknown } from "./typebox.js";
import { TNullable, Type } from "./typebox.js";
import type { IsDefined } from "./types.js";

// This is the format I would like
export const TLatitude = () => Type.Number({ minimum: -90, maximum: 90 });
export const TLongitude = () => Type.Number({ title: "longitude" });

export const TLatitudeRange = () => Type.Number({ minimum: -90, maximum: 90 });
export const TLongitudeRange = () => Type.Number({ minimum: -180, maximum: 180 });
export const TCoordinate2d = () =>
  Type.Tuple([TLongitude(), TLatitude()], {
    title: "GeoJSON coordinate 2d",
    description: "coordinate: [longitude, latitude]",
  });
export const TCoordinate3d = () =>
  Type.Tuple([TLongitude(), TLatitude(), Type.Number()], {
    title: "GeoJSON coordinate 3d",
    description: "coordinate: [longitude, latitude, elevation/z]",
  });
export const TCoordinate = () =>
  Type.Union([TCoordinate2d(), TCoordinate3d()], {
    title: "GeoJSON coordinate",
    description: "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
  });

export const TBBox2d = () =>
  Type.Tuple([TLongitude(), TLatitude(), TLongitude(), TLatitude()], {
    title: "GeoJSON BBox 2d",
    description: "bbox: [west, south, east, north]",
  });
export const TBBox3d = () =>
  Type.Tuple([TLongitude(), TLatitude(), TLongitude(), TLatitude(), Type.Number(), Type.Number()], {
    title: "GeoJSON BBox 3d",
    description: "bbox: [west, south, east, north, min-z, max-z]",
  });
export const TBBox = () =>
  Type.Union([TBBox2d(), TBBox3d()], {
    title: "GeoJSON BBox",
    description: "bbox: [west, south, east, north] or [west, south, east, north, min-z, max-z]",
  });

export const TGeojsonProperties = () =>
  TNullable(Type.Record(Type.String(), Type.Unknown()), {
    default: null,
  });

export const TPointGeometry = () =>
  Type.Object({ type: Type.Literal("Point"), coordinates: TCoordinate() }, { title: "GeoJSON Point" });
export const TLineStringGeometry = () =>
  Type.Object(
    {
      type: Type.Literal("LineString"),
      coordinates: Type.Array(TCoordinate()),
      bbox: Type.Optional(TBBox()),
    },
    {
      title: "GeoJSON LineString",
    }
  );
export const TPolygonGeometry = () =>
  Type.Object(
    {
      type: Type.Literal("Polygon"),
      coordinates: Type.Array(
        Type.Array(TCoordinate(), {
          minItems: 4,
        })
      ),
    },
    {
      title: "PolygonGeometry",
      description: "GeoJSON Polygon geometry",
      additionalProperties: false,
    }
  );
export const TMultiPointGeometry = () =>
  Type.Object(
    {
      type: Type.Literal("MultiPoint"),
      coordinates: Type.Array(TCoordinate()),
      bbox: Type.Optional(TBBox()),
    },
    {
      title: "GeoJSON MultiPoint",
    }
  );

export const TMultiLineStringGeometry = () =>
  Type.Object(
    {
      type: Type.Literal("MultiLineString"),
      coordinates: Type.Array(Type.Array(TCoordinate())),
      bbox: Type.Optional(TBBox()),
    },
    {
      title: "GeoJSON MultiLineString",
    }
  );

export const TMultiPolygonGeometry = () =>
  Type.Object(
    {
      type: Type.Literal("MultiPolygon"),
      coordinates: Type.Array(Type.Array(Type.Array(TCoordinate()))),
      bbox: Type.Optional(TBBox()),
    },
    {
      title: "GeoJSON MultiPolygon",
    }
  );

export const TGeometry = () =>
  Type.Union(
    [
      TPointGeometry(),
      TLineStringGeometry(),
      TPolygonGeometry(),
      TMultiPointGeometry(),
      TMultiLineStringGeometry(),
      TMultiPolygonGeometry(),
    ],
    {
      title: "GeoJSON Geometry",
    }
  );

export const TFeatureSchema = () =>
  Type.Object(
    {
      type: Type.Literal("Feature"),
      geometry: TGeometry(),
      properties: Type.Optional(TGeojsonProperties()),
      bbox: Type.Optional(TBBox()),
    },
    {
      title: "GeoJSON Feature",
    }
  );

export const TFeatureCollection = () =>
  Type.Object(
    {
      type: Type.Literal("FeatureCollection"),
      features: Type.Array(TFeatureSchema()),
      properties: Type.Optional(TGeojsonProperties()),
      bbox: Type.Optional(TBBox()),
    },
    {
      title: "GeoJSON FeatureCollection",
    }
  );

export type GeometrySchema =
  | ReturnType<typeof TPointGeometry>
  | ReturnType<typeof TLineStringGeometry>
  | ReturnType<typeof TPolygonGeometry>
  | ReturnType<typeof TMultiPointGeometry>
  | ReturnType<typeof TMultiLineStringGeometry>
  | ReturnType<typeof TMultiPolygonGeometry>;

export type FeatureSchema<G extends GeometrySchema, P extends TSchema = TUnknown> = TObject<{
  type: TLiteral<"Feature">;
  geometry: G;
  properties: P;
}>;

export type GeojsonProperties<T extends TSchema | undefined> = IsDefined<T> extends true
  ? AssertType<T>
  : ReturnType<typeof TGeojsonProperties>;

export const TFeatureProperties = <T extends TSchema | undefined>(schema?: T) =>
  (schema === undefined ? Type.Unknown() : schema) as GeojsonProperties<T>;

export function TFeature<Geom extends GeometrySchema, P extends TSchema | undefined>(
  geometrySchema: Geom,
  propertiesSchema: P,
  options?: SchemaOptions
) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      geometry: geometrySchema,
      properties: TFeatureProperties(propertiesSchema),
    },
    options
  );
}

export function TPoint<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  // TODO: figure out how to use featureSchema:
  // return featureSchema(PointGeometry, propertiesSchema, options);
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: TPointGeometry(),
      properties: TFeatureProperties(propertiesSchema),
    },
    options
  );
}

export function TLineString<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: TLineStringGeometry(),
      properties: TFeatureProperties(propertiesSchema),
    },
    options
  );
}

export function TPolygon<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: TPolygonGeometry(),
      properties: TFeatureProperties(propertiesSchema),
    },
    options
  );
}

export function TMultiPoint<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: TMultiPointGeometry(),
      properties: TFeatureProperties(propertiesSchema),
    },
    options
  );
}

export function TMultiLineString<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: TMultiLineStringGeometry(),
      properties: TFeatureProperties(propertiesSchema),
    },
    options
  );
}

export function TMultiPolygon<T extends TSchema | undefined>(propertiesSchema?: T, options?: SchemaOptions) {
  return Type.Object(
    {
      type: Type.Literal("Feature"),
      id: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      geometry: TMultiPolygonGeometry(),
      properties: TFeatureProperties(propertiesSchema),
    },
    options
  );
}
