/**
 * Turfbox = turf/geojson + typebox
 */
import type { SchemaOptions } from "./typebox.js";
import { Type } from "./typebox.js";

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

export const LatitudeWgs84 = (options?: SchemaOptions) =>
  Latitude({
    minimum: -90,
    maximum: 90,
    title: "LatitudeWgs84",
    description: "WGS84 latitude; -90 to 90 degrees",
    ...options,
  });

export const LongitudeWgs84 = (options?: SchemaOptions) =>
  Longitude({
    minimum: -180,
    maximum: 180,
    title: "LongitudeWgs84",
    description: "WGS84 longitude; -180 to 180 degrees",
    ...options,
  });
export const Coordinate2d = (options?: SchemaOptions) =>
  Type.Tuple([Longitude(), Latitude()], {
    title: "GeoJSON coordinate 2d",
    description: "coordinate: [longitude, latitude]",
    ...options,
  });
export const Coordinate3d = (options?: SchemaOptions) =>
  Type.Tuple([...Type.Rest(Coordinate2d()), Type.Number()], {
    title: "GeoJSON coordinate 3d",
    description: "coordinate: [longitude, latitude, elevation/z]",
    ...options,
  });
export const Coordinate = (options?: SchemaOptions) =>
  Type.Union([Coordinate2d(), Coordinate3d()], {
    title: "GeoJSON coordinate",
    description:
      "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
    ...options,
  });

export const Coordinate2dWgs84 = (options?: SchemaOptions) =>
  Type.Tuple([LongitudeWgs84(), LatitudeWgs84()], {
    title: "GeoJSON coordinate 2d WGS84",
    description: "coordinate: [longitude, latitude]",
    ...options,
  });

export const Coordinate3dWgs84 = (options?: SchemaOptions) =>
  Type.Tuple([...Type.Rest(Coordinate2dWgs84()), Type.Number()], {
    title: "GeoJSON coordinate 3d WGS84",
    description: "coordinate: [longitude, latitude, elevation/z]",
    ...options,
  });
export const CoordinateWgs84 = (options?: SchemaOptions) =>
  Type.Union([Coordinate2dWgs84(), Coordinate3dWgs84()], {
    title: "GeoJSON coordinate WGS84",
    description:
      "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
    ...options,
  });

export const LonLat = (options?: SchemaOptions) =>
  Type.Object(
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

export const LonLatZ = (options?: SchemaOptions) =>
  Type.Object(
    { lon: Longitude(options), lat: Latitude(options), z: Type.Number() },
    {
      title: "LonLatZ",
      description: "Longitude, Latitude, Z",
      ...options,
    },
  );

export const LonLatWgs84 = (options?: SchemaOptions) =>
  Type.Object(
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

export const LngLat = (options?: SchemaOptions) =>
  Type.Object(
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

export const LngLatWgs84 = (options?: SchemaOptions) =>
  Type.Object(
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
