/**
 * lng-lat schema builders
 */
import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

/**
 * GeoJSON Latitude json-schema
 * @returns {TNumber} GeoJSON Latitude json-schema
 */
export function Latitude(options?: SchemaOptions) {
  return Type.Number({
    title: "Latitude",
    description: "Longitude",
    ...options,
  });
}

/**
 * GeoJSON Longitude json-schema
 * @returns {TNumber} GeoJSON Longitude json-schema
 */
export function Longitude(options?: SchemaOptions) {
  return Type.Number({
    title: "Longitude",
    description: "Longitude",
    ...options,
  });
}

export function LatitudeWgs84(options?: SchemaOptions) {
  return Latitude({
    minimum: -90,
    maximum: 90,
    title: "LatitudeWgs84",
    description: "WGS84 latitude; -90 to 90 degrees",
    ...options,
  });
}

export function LongitudeWgs84(options?: SchemaOptions) {
  return Longitude({
    minimum: -180,
    maximum: 180,
    title: "LongitudeWgs84",
    description: "WGS84 longitude; -180 to 180 degrees",
    ...options,
  });
}

export function LonLat(options?: SchemaOptions) {
  return Type.Object(
    {
      lon: Longitude(options),
      lat: Latitude(options),
    },
    {
      title: "LonLat",
      description: "Longitude, Latitude",
      ...options,
    },
  );
}

export function LonLatZ(options?: SchemaOptions) {
  return Type.Object(
    { lon: Longitude(options), lat: Latitude(options), z: Type.Number() },
    {
      title: "LonLatZ",
      description: "Longitude, Latitude, Z",
      ...options,
    },
  );
}

export function LonLatWgs84(options?: SchemaOptions) {
  return Type.Object(
    {
      lon: LongitudeWgs84(options),
      lat: LatitudeWgs84(options),
    },
    {
      title: "LonLatWgs84",
      description: "Longitude, Latitude",
      ...options,
    },
  );
}

export function LngLat(options?: SchemaOptions) {
  return Type.Object(
    {
      lng: Longitude(options),
      lat: Latitude(options),
    },
    {
      title: "LngLat",
      description: "Longitude, Latitude",
      ...options,
    },
  );
}

export function LngLatWgs84(options?: SchemaOptions) {
  return Type.Object(
    {
      lng: LongitudeWgs84(options),
      lat: LatitudeWgs84(options),
    },
    {
      title: "LngLatWgs84",
      description: "Longitude, Latitude",
      ...options,
    },
  );
}

export {
  Latitude as Lat,
  LatitudeWgs84 as LatWgs84,
  Longitude as Lon,
  LongitudeWgs84 as LonWgs84,
};
