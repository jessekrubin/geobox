// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import typia from 'typia';
import type {
  BBox,
  BBox2d,
  BBox3d,
  Coordinate,
  Coordinate2d,
  Coordinate3d,
  DeckglTilejson,
  Feature,
  FeatureCollection,
  FeatureCollectionType,
  FeatureType,
  GeoJsonProperties,
  Geometry,
  Geometry2d,
  Geometry3d,
  GeometryCollection,
  GeometryCollectionType,
  GeometryType,
  Geostats,
  GeostatsAttribute,
  GeostatsLayer,
  Latitude,
  LatitudeWgs84,
  LineStringCoordinates,
  LineStringFeature,
  LineStringFeature2d,
  LineStringFeature3d,
  LineStringFeatureCollection,
  LineStringFeatureCollection2d,
  LineStringFeatureCollection3d,
  LineStringGeometry,
  LineStringGeometry2d,
  LineStringGeometry3d,
  LineStringGeometryType,
  Longitude,
  LongitudeWgs84,
  MbtilesMetadata,
  MbtilesMetadataRow,
  MbtilesTilesRow,
  MultiLineStringCoordinates,
  MultiLineStringFeature,
  MultiLineStringFeature2d,
  MultiLineStringFeature3d,
  MultiLineStringFeatureCollection,
  MultiLineStringFeatureCollection2d,
  MultiLineStringFeatureCollection3d,
  MultiLineStringGeometry,
  MultiLineStringGeometry2d,
  MultiLineStringGeometry3d,
  MultiLineStringGeometryType,
  MultiPointCoordinates,
  MultiPointFeature,
  MultiPointFeature2d,
  MultiPointFeature3d,
  MultiPointFeatureCollection,
  MultiPointFeatureCollection2d,
  MultiPointFeatureCollection3d,
  MultiPointGeometry,
  MultiPointGeometry2d,
  MultiPointGeometry3d,
  MultiPointGeometryType,
  MultiPolygonCoordinates,
  MultiPolygonFeature,
  MultiPolygonFeature2d,
  MultiPolygonFeature3d,
  MultiPolygonFeatureCollection,
  MultiPolygonFeatureCollection2d,
  MultiPolygonFeatureCollection3d,
  MultiPolygonGeometry,
  MultiPolygonGeometry2d,
  MultiPolygonGeometry3d,
  MultiPolygonGeometryType,
  PointCoordinates,
  PointFeature,
  PointFeature2d,
  PointFeature3d,
  PointFeatureCollection,
  PointFeatureCollection2d,
  PointFeatureCollection3d,
  PointGeometry,
  PointGeometry2d,
  PointGeometry3d,
  PointGeometryType,
  PolygonCoordinates,
  PolygonCoordinatesRing,
  PolygonFeature,
  PolygonFeature2d,
  PolygonFeature3d,
  PolygonFeatureCollection,
  PolygonFeatureCollection2d,
  PolygonFeatureCollection3d,
  PolygonGeometry,
  PolygonGeometry2d,
  PolygonGeometry3d,
  PolygonGeometryType,
  SimpleStyleProperties,
  Tilejson300,
  Tilejson300Raster,
  Tilejson300Vector,
  TilejsonCommon,
  TilejsonRasterFormat,
  TilejsonVectorFormat,
  TilejsonVectorLayer,
  TilejsonVectorLayers,
} from '@jsse/geotypes';


// BBox
export const assertBBox = typia.createAssert<BBox>()
export const equalsBBox = typia.createEquals<BBox>()
export const isBBox = typia.createIs<BBox>()
export const randomBBox = typia.createRandom<BBox>()
export const stringifyBBox = typia.createStringify<BBox>()
export const validateBBox = typia.createValidate<BBox>()


// BBox2d
export const assertBBox2d = typia.createAssert<BBox2d>()
export const equalsBBox2d = typia.createEquals<BBox2d>()
export const isBBox2d = typia.createIs<BBox2d>()
export const randomBBox2d = typia.createRandom<BBox2d>()
export const stringifyBBox2d = typia.createStringify<BBox2d>()
export const validateBBox2d = typia.createValidate<BBox2d>()


// BBox3d
export const assertBBox3d = typia.createAssert<BBox3d>()
export const equalsBBox3d = typia.createEquals<BBox3d>()
export const isBBox3d = typia.createIs<BBox3d>()
export const randomBBox3d = typia.createRandom<BBox3d>()
export const stringifyBBox3d = typia.createStringify<BBox3d>()
export const validateBBox3d = typia.createValidate<BBox3d>()


// Coordinate
export const assertCoordinate = typia.createAssert<Coordinate>()
export const equalsCoordinate = typia.createEquals<Coordinate>()
export const isCoordinate = typia.createIs<Coordinate>()
export const randomCoordinate = typia.createRandom<Coordinate>()
export const stringifyCoordinate = typia.createStringify<Coordinate>()
export const validateCoordinate = typia.createValidate<Coordinate>()


// Coordinate2d
export const assertCoordinate2d = typia.createAssert<Coordinate2d>()
export const equalsCoordinate2d = typia.createEquals<Coordinate2d>()
export const isCoordinate2d = typia.createIs<Coordinate2d>()
export const randomCoordinate2d = typia.createRandom<Coordinate2d>()
export const stringifyCoordinate2d = typia.createStringify<Coordinate2d>()
export const validateCoordinate2d = typia.createValidate<Coordinate2d>()


// Coordinate3d
export const assertCoordinate3d = typia.createAssert<Coordinate3d>()
export const equalsCoordinate3d = typia.createEquals<Coordinate3d>()
export const isCoordinate3d = typia.createIs<Coordinate3d>()
export const randomCoordinate3d = typia.createRandom<Coordinate3d>()
export const stringifyCoordinate3d = typia.createStringify<Coordinate3d>()
export const validateCoordinate3d = typia.createValidate<Coordinate3d>()


// DeckglTilejson
export const assertDeckglTilejson = typia.createAssert<DeckglTilejson>()
export const equalsDeckglTilejson = typia.createEquals<DeckglTilejson>()
export const isDeckglTilejson = typia.createIs<DeckglTilejson>()
export const randomDeckglTilejson = typia.createRandom<DeckglTilejson>()
export const stringifyDeckglTilejson = typia.createStringify<DeckglTilejson>()
export const validateDeckglTilejson = typia.createValidate<DeckglTilejson>()


// Feature
export const assertFeature = typia.createAssert<Feature>()
export const equalsFeature = typia.createEquals<Feature>()
export const isFeature = typia.createIs<Feature>()
export const randomFeature = typia.createRandom<Feature>()
export const stringifyFeature = typia.createStringify<Feature>()
export const validateFeature = typia.createValidate<Feature>()


// FeatureCollection
export const assertFeatureCollection = typia.createAssert<FeatureCollection>()
export const equalsFeatureCollection = typia.createEquals<FeatureCollection>()
export const isFeatureCollection = typia.createIs<FeatureCollection>()
export const randomFeatureCollection = typia.createRandom<FeatureCollection>()
export const stringifyFeatureCollection = typia.createStringify<FeatureCollection>()
export const validateFeatureCollection = typia.createValidate<FeatureCollection>()


// FeatureCollectionType
export const assertFeatureCollectionType = typia.createAssert<FeatureCollectionType>()
export const equalsFeatureCollectionType = typia.createEquals<FeatureCollectionType>()
export const isFeatureCollectionType = typia.createIs<FeatureCollectionType>()
export const randomFeatureCollectionType = typia.createRandom<FeatureCollectionType>()
export const stringifyFeatureCollectionType = typia.createStringify<FeatureCollectionType>()
export const validateFeatureCollectionType = typia.createValidate<FeatureCollectionType>()


// FeatureType
export const assertFeatureType = typia.createAssert<FeatureType>()
export const equalsFeatureType = typia.createEquals<FeatureType>()
export const isFeatureType = typia.createIs<FeatureType>()
export const randomFeatureType = typia.createRandom<FeatureType>()
export const stringifyFeatureType = typia.createStringify<FeatureType>()
export const validateFeatureType = typia.createValidate<FeatureType>()


// GeoJsonProperties
export const assertGeoJsonProperties = typia.createAssert<GeoJsonProperties>()
export const equalsGeoJsonProperties = typia.createEquals<GeoJsonProperties>()
export const isGeoJsonProperties = typia.createIs<GeoJsonProperties>()
export const randomGeoJsonProperties = typia.createRandom<GeoJsonProperties>()
export const stringifyGeoJsonProperties = typia.createStringify<GeoJsonProperties>()
export const validateGeoJsonProperties = typia.createValidate<GeoJsonProperties>()


// Geometry
export const assertGeometry = typia.createAssert<Geometry>()
export const equalsGeometry = typia.createEquals<Geometry>()
export const isGeometry = typia.createIs<Geometry>()
export const randomGeometry = typia.createRandom<Geometry>()
export const stringifyGeometry = typia.createStringify<Geometry>()
export const validateGeometry = typia.createValidate<Geometry>()


// Geometry2d
export const assertGeometry2d = typia.createAssert<Geometry2d>()
export const equalsGeometry2d = typia.createEquals<Geometry2d>()
export const isGeometry2d = typia.createIs<Geometry2d>()
export const randomGeometry2d = typia.createRandom<Geometry2d>()
export const stringifyGeometry2d = typia.createStringify<Geometry2d>()
export const validateGeometry2d = typia.createValidate<Geometry2d>()


// Geometry3d
export const assertGeometry3d = typia.createAssert<Geometry3d>()
export const equalsGeometry3d = typia.createEquals<Geometry3d>()
export const isGeometry3d = typia.createIs<Geometry3d>()
export const randomGeometry3d = typia.createRandom<Geometry3d>()
export const stringifyGeometry3d = typia.createStringify<Geometry3d>()
export const validateGeometry3d = typia.createValidate<Geometry3d>()


// GeometryCollection
export const assertGeometryCollection = typia.createAssert<GeometryCollection>()
export const equalsGeometryCollection = typia.createEquals<GeometryCollection>()
export const isGeometryCollection = typia.createIs<GeometryCollection>()
export const randomGeometryCollection = typia.createRandom<GeometryCollection>()
export const stringifyGeometryCollection = typia.createStringify<GeometryCollection>()
export const validateGeometryCollection = typia.createValidate<GeometryCollection>()


// GeometryCollectionType
export const assertGeometryCollectionType = typia.createAssert<GeometryCollectionType>()
export const equalsGeometryCollectionType = typia.createEquals<GeometryCollectionType>()
export const isGeometryCollectionType = typia.createIs<GeometryCollectionType>()
export const randomGeometryCollectionType = typia.createRandom<GeometryCollectionType>()
export const stringifyGeometryCollectionType = typia.createStringify<GeometryCollectionType>()
export const validateGeometryCollectionType = typia.createValidate<GeometryCollectionType>()


// GeometryType
export const assertGeometryType = typia.createAssert<GeometryType>()
export const equalsGeometryType = typia.createEquals<GeometryType>()
export const isGeometryType = typia.createIs<GeometryType>()
export const randomGeometryType = typia.createRandom<GeometryType>()
export const stringifyGeometryType = typia.createStringify<GeometryType>()
export const validateGeometryType = typia.createValidate<GeometryType>()


// Geostats
export const assertGeostats = typia.createAssert<Geostats>()
export const equalsGeostats = typia.createEquals<Geostats>()
export const isGeostats = typia.createIs<Geostats>()
export const randomGeostats = typia.createRandom<Geostats>()
export const stringifyGeostats = typia.createStringify<Geostats>()
export const validateGeostats = typia.createValidate<Geostats>()


// GeostatsAttribute
export const assertGeostatsAttribute = typia.createAssert<GeostatsAttribute>()
export const equalsGeostatsAttribute = typia.createEquals<GeostatsAttribute>()
export const isGeostatsAttribute = typia.createIs<GeostatsAttribute>()
export const randomGeostatsAttribute = typia.createRandom<GeostatsAttribute>()
export const stringifyGeostatsAttribute = typia.createStringify<GeostatsAttribute>()
export const validateGeostatsAttribute = typia.createValidate<GeostatsAttribute>()


// GeostatsLayer
export const assertGeostatsLayer = typia.createAssert<GeostatsLayer>()
export const equalsGeostatsLayer = typia.createEquals<GeostatsLayer>()
export const isGeostatsLayer = typia.createIs<GeostatsLayer>()
export const randomGeostatsLayer = typia.createRandom<GeostatsLayer>()
export const stringifyGeostatsLayer = typia.createStringify<GeostatsLayer>()
export const validateGeostatsLayer = typia.createValidate<GeostatsLayer>()


// Latitude
export const assertLatitude = typia.createAssert<Latitude>()
export const equalsLatitude = typia.createEquals<Latitude>()
export const isLatitude = typia.createIs<Latitude>()
export const randomLatitude = typia.createRandom<Latitude>()
export const stringifyLatitude = typia.createStringify<Latitude>()
export const validateLatitude = typia.createValidate<Latitude>()


// LatitudeWgs84
export const assertLatitudeWgs84 = typia.createAssert<LatitudeWgs84>()
export const equalsLatitudeWgs84 = typia.createEquals<LatitudeWgs84>()
export const isLatitudeWgs84 = typia.createIs<LatitudeWgs84>()
export const randomLatitudeWgs84 = typia.createRandom<LatitudeWgs84>()
export const stringifyLatitudeWgs84 = typia.createStringify<LatitudeWgs84>()
export const validateLatitudeWgs84 = typia.createValidate<LatitudeWgs84>()


// LineStringCoordinates
export const assertLineStringCoordinates = typia.createAssert<LineStringCoordinates>()
export const equalsLineStringCoordinates = typia.createEquals<LineStringCoordinates>()
export const isLineStringCoordinates = typia.createIs<LineStringCoordinates>()
export const randomLineStringCoordinates = typia.createRandom<LineStringCoordinates>()
export const stringifyLineStringCoordinates = typia.createStringify<LineStringCoordinates>()
export const validateLineStringCoordinates = typia.createValidate<LineStringCoordinates>()


// LineStringFeature
export const assertLineStringFeature = typia.createAssert<LineStringFeature>()
export const equalsLineStringFeature = typia.createEquals<LineStringFeature>()
export const isLineStringFeature = typia.createIs<LineStringFeature>()
export const randomLineStringFeature = typia.createRandom<LineStringFeature>()
export const stringifyLineStringFeature = typia.createStringify<LineStringFeature>()
export const validateLineStringFeature = typia.createValidate<LineStringFeature>()


// LineStringFeature2d
export const assertLineStringFeature2d = typia.createAssert<LineStringFeature2d>()
export const equalsLineStringFeature2d = typia.createEquals<LineStringFeature2d>()
export const isLineStringFeature2d = typia.createIs<LineStringFeature2d>()
export const randomLineStringFeature2d = typia.createRandom<LineStringFeature2d>()
export const stringifyLineStringFeature2d = typia.createStringify<LineStringFeature2d>()
export const validateLineStringFeature2d = typia.createValidate<LineStringFeature2d>()


// LineStringFeature3d
export const assertLineStringFeature3d = typia.createAssert<LineStringFeature3d>()
export const equalsLineStringFeature3d = typia.createEquals<LineStringFeature3d>()
export const isLineStringFeature3d = typia.createIs<LineStringFeature3d>()
export const randomLineStringFeature3d = typia.createRandom<LineStringFeature3d>()
export const stringifyLineStringFeature3d = typia.createStringify<LineStringFeature3d>()
export const validateLineStringFeature3d = typia.createValidate<LineStringFeature3d>()


// LineStringFeatureCollection
export const assertLineStringFeatureCollection = typia.createAssert<LineStringFeatureCollection>()
export const equalsLineStringFeatureCollection = typia.createEquals<LineStringFeatureCollection>()
export const isLineStringFeatureCollection = typia.createIs<LineStringFeatureCollection>()
export const randomLineStringFeatureCollection = typia.createRandom<LineStringFeatureCollection>()
export const stringifyLineStringFeatureCollection = typia.createStringify<LineStringFeatureCollection>()
export const validateLineStringFeatureCollection = typia.createValidate<LineStringFeatureCollection>()


// LineStringFeatureCollection2d
export const assertLineStringFeatureCollection2d = typia.createAssert<LineStringFeatureCollection2d>()
export const equalsLineStringFeatureCollection2d = typia.createEquals<LineStringFeatureCollection2d>()
export const isLineStringFeatureCollection2d = typia.createIs<LineStringFeatureCollection2d>()
export const randomLineStringFeatureCollection2d = typia.createRandom<LineStringFeatureCollection2d>()
export const stringifyLineStringFeatureCollection2d = typia.createStringify<LineStringFeatureCollection2d>()
export const validateLineStringFeatureCollection2d = typia.createValidate<LineStringFeatureCollection2d>()


// LineStringFeatureCollection3d
export const assertLineStringFeatureCollection3d = typia.createAssert<LineStringFeatureCollection3d>()
export const equalsLineStringFeatureCollection3d = typia.createEquals<LineStringFeatureCollection3d>()
export const isLineStringFeatureCollection3d = typia.createIs<LineStringFeatureCollection3d>()
export const randomLineStringFeatureCollection3d = typia.createRandom<LineStringFeatureCollection3d>()
export const stringifyLineStringFeatureCollection3d = typia.createStringify<LineStringFeatureCollection3d>()
export const validateLineStringFeatureCollection3d = typia.createValidate<LineStringFeatureCollection3d>()


// LineStringGeometry
export const assertLineStringGeometry = typia.createAssert<LineStringGeometry>()
export const equalsLineStringGeometry = typia.createEquals<LineStringGeometry>()
export const isLineStringGeometry = typia.createIs<LineStringGeometry>()
export const randomLineStringGeometry = typia.createRandom<LineStringGeometry>()
export const stringifyLineStringGeometry = typia.createStringify<LineStringGeometry>()
export const validateLineStringGeometry = typia.createValidate<LineStringGeometry>()


// LineStringGeometry2d
export const assertLineStringGeometry2d = typia.createAssert<LineStringGeometry2d>()
export const equalsLineStringGeometry2d = typia.createEquals<LineStringGeometry2d>()
export const isLineStringGeometry2d = typia.createIs<LineStringGeometry2d>()
export const randomLineStringGeometry2d = typia.createRandom<LineStringGeometry2d>()
export const stringifyLineStringGeometry2d = typia.createStringify<LineStringGeometry2d>()
export const validateLineStringGeometry2d = typia.createValidate<LineStringGeometry2d>()


// LineStringGeometry3d
export const assertLineStringGeometry3d = typia.createAssert<LineStringGeometry3d>()
export const equalsLineStringGeometry3d = typia.createEquals<LineStringGeometry3d>()
export const isLineStringGeometry3d = typia.createIs<LineStringGeometry3d>()
export const randomLineStringGeometry3d = typia.createRandom<LineStringGeometry3d>()
export const stringifyLineStringGeometry3d = typia.createStringify<LineStringGeometry3d>()
export const validateLineStringGeometry3d = typia.createValidate<LineStringGeometry3d>()


// LineStringGeometryType
export const assertLineStringGeometryType = typia.createAssert<LineStringGeometryType>()
export const equalsLineStringGeometryType = typia.createEquals<LineStringGeometryType>()
export const isLineStringGeometryType = typia.createIs<LineStringGeometryType>()
export const randomLineStringGeometryType = typia.createRandom<LineStringGeometryType>()
export const stringifyLineStringGeometryType = typia.createStringify<LineStringGeometryType>()
export const validateLineStringGeometryType = typia.createValidate<LineStringGeometryType>()


// Longitude
export const assertLongitude = typia.createAssert<Longitude>()
export const equalsLongitude = typia.createEquals<Longitude>()
export const isLongitude = typia.createIs<Longitude>()
export const randomLongitude = typia.createRandom<Longitude>()
export const stringifyLongitude = typia.createStringify<Longitude>()
export const validateLongitude = typia.createValidate<Longitude>()


// LongitudeWgs84
export const assertLongitudeWgs84 = typia.createAssert<LongitudeWgs84>()
export const equalsLongitudeWgs84 = typia.createEquals<LongitudeWgs84>()
export const isLongitudeWgs84 = typia.createIs<LongitudeWgs84>()
export const randomLongitudeWgs84 = typia.createRandom<LongitudeWgs84>()
export const stringifyLongitudeWgs84 = typia.createStringify<LongitudeWgs84>()
export const validateLongitudeWgs84 = typia.createValidate<LongitudeWgs84>()


// MbtilesMetadata
export const assertMbtilesMetadata = typia.createAssert<MbtilesMetadata>()
export const equalsMbtilesMetadata = typia.createEquals<MbtilesMetadata>()
export const isMbtilesMetadata = typia.createIs<MbtilesMetadata>()
export const randomMbtilesMetadata = typia.createRandom<MbtilesMetadata>()
export const stringifyMbtilesMetadata = typia.createStringify<MbtilesMetadata>()
export const validateMbtilesMetadata = typia.createValidate<MbtilesMetadata>()


// MbtilesMetadataRow
export const assertMbtilesMetadataRow = typia.createAssert<MbtilesMetadataRow>()
export const equalsMbtilesMetadataRow = typia.createEquals<MbtilesMetadataRow>()
export const isMbtilesMetadataRow = typia.createIs<MbtilesMetadataRow>()
export const randomMbtilesMetadataRow = typia.createRandom<MbtilesMetadataRow>()
export const stringifyMbtilesMetadataRow = typia.createStringify<MbtilesMetadataRow>()
export const validateMbtilesMetadataRow = typia.createValidate<MbtilesMetadataRow>()


// MbtilesTilesRow
export const assertMbtilesTilesRow = typia.createAssert<MbtilesTilesRow>()
export const equalsMbtilesTilesRow = typia.createEquals<MbtilesTilesRow>()
export const isMbtilesTilesRow = typia.createIs<MbtilesTilesRow>()
export const randomMbtilesTilesRow = typia.createRandom<MbtilesTilesRow>()
export const stringifyMbtilesTilesRow = typia.createStringify<MbtilesTilesRow>()
export const validateMbtilesTilesRow = typia.createValidate<MbtilesTilesRow>()


// MultiLineStringCoordinates
export const assertMultiLineStringCoordinates = typia.createAssert<MultiLineStringCoordinates>()
export const equalsMultiLineStringCoordinates = typia.createEquals<MultiLineStringCoordinates>()
export const isMultiLineStringCoordinates = typia.createIs<MultiLineStringCoordinates>()
export const randomMultiLineStringCoordinates = typia.createRandom<MultiLineStringCoordinates>()
export const stringifyMultiLineStringCoordinates = typia.createStringify<MultiLineStringCoordinates>()
export const validateMultiLineStringCoordinates = typia.createValidate<MultiLineStringCoordinates>()


// MultiLineStringFeature
export const assertMultiLineStringFeature = typia.createAssert<MultiLineStringFeature>()
export const equalsMultiLineStringFeature = typia.createEquals<MultiLineStringFeature>()
export const isMultiLineStringFeature = typia.createIs<MultiLineStringFeature>()
export const randomMultiLineStringFeature = typia.createRandom<MultiLineStringFeature>()
export const stringifyMultiLineStringFeature = typia.createStringify<MultiLineStringFeature>()
export const validateMultiLineStringFeature = typia.createValidate<MultiLineStringFeature>()


// MultiLineStringFeature2d
export const assertMultiLineStringFeature2d = typia.createAssert<MultiLineStringFeature2d>()
export const equalsMultiLineStringFeature2d = typia.createEquals<MultiLineStringFeature2d>()
export const isMultiLineStringFeature2d = typia.createIs<MultiLineStringFeature2d>()
export const randomMultiLineStringFeature2d = typia.createRandom<MultiLineStringFeature2d>()
export const stringifyMultiLineStringFeature2d = typia.createStringify<MultiLineStringFeature2d>()
export const validateMultiLineStringFeature2d = typia.createValidate<MultiLineStringFeature2d>()


// MultiLineStringFeature3d
export const assertMultiLineStringFeature3d = typia.createAssert<MultiLineStringFeature3d>()
export const equalsMultiLineStringFeature3d = typia.createEquals<MultiLineStringFeature3d>()
export const isMultiLineStringFeature3d = typia.createIs<MultiLineStringFeature3d>()
export const randomMultiLineStringFeature3d = typia.createRandom<MultiLineStringFeature3d>()
export const stringifyMultiLineStringFeature3d = typia.createStringify<MultiLineStringFeature3d>()
export const validateMultiLineStringFeature3d = typia.createValidate<MultiLineStringFeature3d>()


// MultiLineStringFeatureCollection
export const assertMultiLineStringFeatureCollection = typia.createAssert<MultiLineStringFeatureCollection>()
export const equalsMultiLineStringFeatureCollection = typia.createEquals<MultiLineStringFeatureCollection>()
export const isMultiLineStringFeatureCollection = typia.createIs<MultiLineStringFeatureCollection>()
export const randomMultiLineStringFeatureCollection = typia.createRandom<MultiLineStringFeatureCollection>()
export const stringifyMultiLineStringFeatureCollection = typia.createStringify<MultiLineStringFeatureCollection>()
export const validateMultiLineStringFeatureCollection = typia.createValidate<MultiLineStringFeatureCollection>()


// MultiLineStringFeatureCollection2d
export const assertMultiLineStringFeatureCollection2d = typia.createAssert<MultiLineStringFeatureCollection2d>()
export const equalsMultiLineStringFeatureCollection2d = typia.createEquals<MultiLineStringFeatureCollection2d>()
export const isMultiLineStringFeatureCollection2d = typia.createIs<MultiLineStringFeatureCollection2d>()
export const randomMultiLineStringFeatureCollection2d = typia.createRandom<MultiLineStringFeatureCollection2d>()
export const stringifyMultiLineStringFeatureCollection2d = typia.createStringify<MultiLineStringFeatureCollection2d>()
export const validateMultiLineStringFeatureCollection2d = typia.createValidate<MultiLineStringFeatureCollection2d>()


// MultiLineStringFeatureCollection3d
export const assertMultiLineStringFeatureCollection3d = typia.createAssert<MultiLineStringFeatureCollection3d>()
export const equalsMultiLineStringFeatureCollection3d = typia.createEquals<MultiLineStringFeatureCollection3d>()
export const isMultiLineStringFeatureCollection3d = typia.createIs<MultiLineStringFeatureCollection3d>()
export const randomMultiLineStringFeatureCollection3d = typia.createRandom<MultiLineStringFeatureCollection3d>()
export const stringifyMultiLineStringFeatureCollection3d = typia.createStringify<MultiLineStringFeatureCollection3d>()
export const validateMultiLineStringFeatureCollection3d = typia.createValidate<MultiLineStringFeatureCollection3d>()


// MultiLineStringGeometry
export const assertMultiLineStringGeometry = typia.createAssert<MultiLineStringGeometry>()
export const equalsMultiLineStringGeometry = typia.createEquals<MultiLineStringGeometry>()
export const isMultiLineStringGeometry = typia.createIs<MultiLineStringGeometry>()
export const randomMultiLineStringGeometry = typia.createRandom<MultiLineStringGeometry>()
export const stringifyMultiLineStringGeometry = typia.createStringify<MultiLineStringGeometry>()
export const validateMultiLineStringGeometry = typia.createValidate<MultiLineStringGeometry>()


// MultiLineStringGeometry2d
export const assertMultiLineStringGeometry2d = typia.createAssert<MultiLineStringGeometry2d>()
export const equalsMultiLineStringGeometry2d = typia.createEquals<MultiLineStringGeometry2d>()
export const isMultiLineStringGeometry2d = typia.createIs<MultiLineStringGeometry2d>()
export const randomMultiLineStringGeometry2d = typia.createRandom<MultiLineStringGeometry2d>()
export const stringifyMultiLineStringGeometry2d = typia.createStringify<MultiLineStringGeometry2d>()
export const validateMultiLineStringGeometry2d = typia.createValidate<MultiLineStringGeometry2d>()


// MultiLineStringGeometry3d
export const assertMultiLineStringGeometry3d = typia.createAssert<MultiLineStringGeometry3d>()
export const equalsMultiLineStringGeometry3d = typia.createEquals<MultiLineStringGeometry3d>()
export const isMultiLineStringGeometry3d = typia.createIs<MultiLineStringGeometry3d>()
export const randomMultiLineStringGeometry3d = typia.createRandom<MultiLineStringGeometry3d>()
export const stringifyMultiLineStringGeometry3d = typia.createStringify<MultiLineStringGeometry3d>()
export const validateMultiLineStringGeometry3d = typia.createValidate<MultiLineStringGeometry3d>()


// MultiLineStringGeometryType
export const assertMultiLineStringGeometryType = typia.createAssert<MultiLineStringGeometryType>()
export const equalsMultiLineStringGeometryType = typia.createEquals<MultiLineStringGeometryType>()
export const isMultiLineStringGeometryType = typia.createIs<MultiLineStringGeometryType>()
export const randomMultiLineStringGeometryType = typia.createRandom<MultiLineStringGeometryType>()
export const stringifyMultiLineStringGeometryType = typia.createStringify<MultiLineStringGeometryType>()
export const validateMultiLineStringGeometryType = typia.createValidate<MultiLineStringGeometryType>()


// MultiPointCoordinates
export const assertMultiPointCoordinates = typia.createAssert<MultiPointCoordinates>()
export const equalsMultiPointCoordinates = typia.createEquals<MultiPointCoordinates>()
export const isMultiPointCoordinates = typia.createIs<MultiPointCoordinates>()
export const randomMultiPointCoordinates = typia.createRandom<MultiPointCoordinates>()
export const stringifyMultiPointCoordinates = typia.createStringify<MultiPointCoordinates>()
export const validateMultiPointCoordinates = typia.createValidate<MultiPointCoordinates>()


// MultiPointFeature
export const assertMultiPointFeature = typia.createAssert<MultiPointFeature>()
export const equalsMultiPointFeature = typia.createEquals<MultiPointFeature>()
export const isMultiPointFeature = typia.createIs<MultiPointFeature>()
export const randomMultiPointFeature = typia.createRandom<MultiPointFeature>()
export const stringifyMultiPointFeature = typia.createStringify<MultiPointFeature>()
export const validateMultiPointFeature = typia.createValidate<MultiPointFeature>()


// MultiPointFeature2d
export const assertMultiPointFeature2d = typia.createAssert<MultiPointFeature2d>()
export const equalsMultiPointFeature2d = typia.createEquals<MultiPointFeature2d>()
export const isMultiPointFeature2d = typia.createIs<MultiPointFeature2d>()
export const randomMultiPointFeature2d = typia.createRandom<MultiPointFeature2d>()
export const stringifyMultiPointFeature2d = typia.createStringify<MultiPointFeature2d>()
export const validateMultiPointFeature2d = typia.createValidate<MultiPointFeature2d>()


// MultiPointFeature3d
export const assertMultiPointFeature3d = typia.createAssert<MultiPointFeature3d>()
export const equalsMultiPointFeature3d = typia.createEquals<MultiPointFeature3d>()
export const isMultiPointFeature3d = typia.createIs<MultiPointFeature3d>()
export const randomMultiPointFeature3d = typia.createRandom<MultiPointFeature3d>()
export const stringifyMultiPointFeature3d = typia.createStringify<MultiPointFeature3d>()
export const validateMultiPointFeature3d = typia.createValidate<MultiPointFeature3d>()


// MultiPointFeatureCollection
export const assertMultiPointFeatureCollection = typia.createAssert<MultiPointFeatureCollection>()
export const equalsMultiPointFeatureCollection = typia.createEquals<MultiPointFeatureCollection>()
export const isMultiPointFeatureCollection = typia.createIs<MultiPointFeatureCollection>()
export const randomMultiPointFeatureCollection = typia.createRandom<MultiPointFeatureCollection>()
export const stringifyMultiPointFeatureCollection = typia.createStringify<MultiPointFeatureCollection>()
export const validateMultiPointFeatureCollection = typia.createValidate<MultiPointFeatureCollection>()


// MultiPointFeatureCollection2d
export const assertMultiPointFeatureCollection2d = typia.createAssert<MultiPointFeatureCollection2d>()
export const equalsMultiPointFeatureCollection2d = typia.createEquals<MultiPointFeatureCollection2d>()
export const isMultiPointFeatureCollection2d = typia.createIs<MultiPointFeatureCollection2d>()
export const randomMultiPointFeatureCollection2d = typia.createRandom<MultiPointFeatureCollection2d>()
export const stringifyMultiPointFeatureCollection2d = typia.createStringify<MultiPointFeatureCollection2d>()
export const validateMultiPointFeatureCollection2d = typia.createValidate<MultiPointFeatureCollection2d>()


// MultiPointFeatureCollection3d
export const assertMultiPointFeatureCollection3d = typia.createAssert<MultiPointFeatureCollection3d>()
export const equalsMultiPointFeatureCollection3d = typia.createEquals<MultiPointFeatureCollection3d>()
export const isMultiPointFeatureCollection3d = typia.createIs<MultiPointFeatureCollection3d>()
export const randomMultiPointFeatureCollection3d = typia.createRandom<MultiPointFeatureCollection3d>()
export const stringifyMultiPointFeatureCollection3d = typia.createStringify<MultiPointFeatureCollection3d>()
export const validateMultiPointFeatureCollection3d = typia.createValidate<MultiPointFeatureCollection3d>()


// MultiPointGeometry
export const assertMultiPointGeometry = typia.createAssert<MultiPointGeometry>()
export const equalsMultiPointGeometry = typia.createEquals<MultiPointGeometry>()
export const isMultiPointGeometry = typia.createIs<MultiPointGeometry>()
export const randomMultiPointGeometry = typia.createRandom<MultiPointGeometry>()
export const stringifyMultiPointGeometry = typia.createStringify<MultiPointGeometry>()
export const validateMultiPointGeometry = typia.createValidate<MultiPointGeometry>()


// MultiPointGeometry2d
export const assertMultiPointGeometry2d = typia.createAssert<MultiPointGeometry2d>()
export const equalsMultiPointGeometry2d = typia.createEquals<MultiPointGeometry2d>()
export const isMultiPointGeometry2d = typia.createIs<MultiPointGeometry2d>()
export const randomMultiPointGeometry2d = typia.createRandom<MultiPointGeometry2d>()
export const stringifyMultiPointGeometry2d = typia.createStringify<MultiPointGeometry2d>()
export const validateMultiPointGeometry2d = typia.createValidate<MultiPointGeometry2d>()


// MultiPointGeometry3d
export const assertMultiPointGeometry3d = typia.createAssert<MultiPointGeometry3d>()
export const equalsMultiPointGeometry3d = typia.createEquals<MultiPointGeometry3d>()
export const isMultiPointGeometry3d = typia.createIs<MultiPointGeometry3d>()
export const randomMultiPointGeometry3d = typia.createRandom<MultiPointGeometry3d>()
export const stringifyMultiPointGeometry3d = typia.createStringify<MultiPointGeometry3d>()
export const validateMultiPointGeometry3d = typia.createValidate<MultiPointGeometry3d>()


// MultiPointGeometryType
export const assertMultiPointGeometryType = typia.createAssert<MultiPointGeometryType>()
export const equalsMultiPointGeometryType = typia.createEquals<MultiPointGeometryType>()
export const isMultiPointGeometryType = typia.createIs<MultiPointGeometryType>()
export const randomMultiPointGeometryType = typia.createRandom<MultiPointGeometryType>()
export const stringifyMultiPointGeometryType = typia.createStringify<MultiPointGeometryType>()
export const validateMultiPointGeometryType = typia.createValidate<MultiPointGeometryType>()


// MultiPolygonCoordinates
export const assertMultiPolygonCoordinates = typia.createAssert<MultiPolygonCoordinates>()
export const equalsMultiPolygonCoordinates = typia.createEquals<MultiPolygonCoordinates>()
export const isMultiPolygonCoordinates = typia.createIs<MultiPolygonCoordinates>()
export const randomMultiPolygonCoordinates = typia.createRandom<MultiPolygonCoordinates>()
export const stringifyMultiPolygonCoordinates = typia.createStringify<MultiPolygonCoordinates>()
export const validateMultiPolygonCoordinates = typia.createValidate<MultiPolygonCoordinates>()


// MultiPolygonFeature
export const assertMultiPolygonFeature = typia.createAssert<MultiPolygonFeature>()
export const equalsMultiPolygonFeature = typia.createEquals<MultiPolygonFeature>()
export const isMultiPolygonFeature = typia.createIs<MultiPolygonFeature>()
export const randomMultiPolygonFeature = typia.createRandom<MultiPolygonFeature>()
export const stringifyMultiPolygonFeature = typia.createStringify<MultiPolygonFeature>()
export const validateMultiPolygonFeature = typia.createValidate<MultiPolygonFeature>()


// MultiPolygonFeature2d
export const assertMultiPolygonFeature2d = typia.createAssert<MultiPolygonFeature2d>()
export const equalsMultiPolygonFeature2d = typia.createEquals<MultiPolygonFeature2d>()
export const isMultiPolygonFeature2d = typia.createIs<MultiPolygonFeature2d>()
export const randomMultiPolygonFeature2d = typia.createRandom<MultiPolygonFeature2d>()
export const stringifyMultiPolygonFeature2d = typia.createStringify<MultiPolygonFeature2d>()
export const validateMultiPolygonFeature2d = typia.createValidate<MultiPolygonFeature2d>()


// MultiPolygonFeature3d
export const assertMultiPolygonFeature3d = typia.createAssert<MultiPolygonFeature3d>()
export const equalsMultiPolygonFeature3d = typia.createEquals<MultiPolygonFeature3d>()
export const isMultiPolygonFeature3d = typia.createIs<MultiPolygonFeature3d>()
export const randomMultiPolygonFeature3d = typia.createRandom<MultiPolygonFeature3d>()
export const stringifyMultiPolygonFeature3d = typia.createStringify<MultiPolygonFeature3d>()
export const validateMultiPolygonFeature3d = typia.createValidate<MultiPolygonFeature3d>()


// MultiPolygonFeatureCollection
export const assertMultiPolygonFeatureCollection = typia.createAssert<MultiPolygonFeatureCollection>()
export const equalsMultiPolygonFeatureCollection = typia.createEquals<MultiPolygonFeatureCollection>()
export const isMultiPolygonFeatureCollection = typia.createIs<MultiPolygonFeatureCollection>()
export const randomMultiPolygonFeatureCollection = typia.createRandom<MultiPolygonFeatureCollection>()
export const stringifyMultiPolygonFeatureCollection = typia.createStringify<MultiPolygonFeatureCollection>()
export const validateMultiPolygonFeatureCollection = typia.createValidate<MultiPolygonFeatureCollection>()


// MultiPolygonFeatureCollection2d
export const assertMultiPolygonFeatureCollection2d = typia.createAssert<MultiPolygonFeatureCollection2d>()
export const equalsMultiPolygonFeatureCollection2d = typia.createEquals<MultiPolygonFeatureCollection2d>()
export const isMultiPolygonFeatureCollection2d = typia.createIs<MultiPolygonFeatureCollection2d>()
export const randomMultiPolygonFeatureCollection2d = typia.createRandom<MultiPolygonFeatureCollection2d>()
export const stringifyMultiPolygonFeatureCollection2d = typia.createStringify<MultiPolygonFeatureCollection2d>()
export const validateMultiPolygonFeatureCollection2d = typia.createValidate<MultiPolygonFeatureCollection2d>()


// MultiPolygonFeatureCollection3d
export const assertMultiPolygonFeatureCollection3d = typia.createAssert<MultiPolygonFeatureCollection3d>()
export const equalsMultiPolygonFeatureCollection3d = typia.createEquals<MultiPolygonFeatureCollection3d>()
export const isMultiPolygonFeatureCollection3d = typia.createIs<MultiPolygonFeatureCollection3d>()
export const randomMultiPolygonFeatureCollection3d = typia.createRandom<MultiPolygonFeatureCollection3d>()
export const stringifyMultiPolygonFeatureCollection3d = typia.createStringify<MultiPolygonFeatureCollection3d>()
export const validateMultiPolygonFeatureCollection3d = typia.createValidate<MultiPolygonFeatureCollection3d>()


// MultiPolygonGeometry
export const assertMultiPolygonGeometry = typia.createAssert<MultiPolygonGeometry>()
export const equalsMultiPolygonGeometry = typia.createEquals<MultiPolygonGeometry>()
export const isMultiPolygonGeometry = typia.createIs<MultiPolygonGeometry>()
export const randomMultiPolygonGeometry = typia.createRandom<MultiPolygonGeometry>()
export const stringifyMultiPolygonGeometry = typia.createStringify<MultiPolygonGeometry>()
export const validateMultiPolygonGeometry = typia.createValidate<MultiPolygonGeometry>()


// MultiPolygonGeometry2d
export const assertMultiPolygonGeometry2d = typia.createAssert<MultiPolygonGeometry2d>()
export const equalsMultiPolygonGeometry2d = typia.createEquals<MultiPolygonGeometry2d>()
export const isMultiPolygonGeometry2d = typia.createIs<MultiPolygonGeometry2d>()
export const randomMultiPolygonGeometry2d = typia.createRandom<MultiPolygonGeometry2d>()
export const stringifyMultiPolygonGeometry2d = typia.createStringify<MultiPolygonGeometry2d>()
export const validateMultiPolygonGeometry2d = typia.createValidate<MultiPolygonGeometry2d>()


// MultiPolygonGeometry3d
export const assertMultiPolygonGeometry3d = typia.createAssert<MultiPolygonGeometry3d>()
export const equalsMultiPolygonGeometry3d = typia.createEquals<MultiPolygonGeometry3d>()
export const isMultiPolygonGeometry3d = typia.createIs<MultiPolygonGeometry3d>()
export const randomMultiPolygonGeometry3d = typia.createRandom<MultiPolygonGeometry3d>()
export const stringifyMultiPolygonGeometry3d = typia.createStringify<MultiPolygonGeometry3d>()
export const validateMultiPolygonGeometry3d = typia.createValidate<MultiPolygonGeometry3d>()


// MultiPolygonGeometryType
export const assertMultiPolygonGeometryType = typia.createAssert<MultiPolygonGeometryType>()
export const equalsMultiPolygonGeometryType = typia.createEquals<MultiPolygonGeometryType>()
export const isMultiPolygonGeometryType = typia.createIs<MultiPolygonGeometryType>()
export const randomMultiPolygonGeometryType = typia.createRandom<MultiPolygonGeometryType>()
export const stringifyMultiPolygonGeometryType = typia.createStringify<MultiPolygonGeometryType>()
export const validateMultiPolygonGeometryType = typia.createValidate<MultiPolygonGeometryType>()


// PointCoordinates
export const assertPointCoordinates = typia.createAssert<PointCoordinates>()
export const equalsPointCoordinates = typia.createEquals<PointCoordinates>()
export const isPointCoordinates = typia.createIs<PointCoordinates>()
export const randomPointCoordinates = typia.createRandom<PointCoordinates>()
export const stringifyPointCoordinates = typia.createStringify<PointCoordinates>()
export const validatePointCoordinates = typia.createValidate<PointCoordinates>()


// PointFeature
export const assertPointFeature = typia.createAssert<PointFeature>()
export const equalsPointFeature = typia.createEquals<PointFeature>()
export const isPointFeature = typia.createIs<PointFeature>()
export const randomPointFeature = typia.createRandom<PointFeature>()
export const stringifyPointFeature = typia.createStringify<PointFeature>()
export const validatePointFeature = typia.createValidate<PointFeature>()


// PointFeature2d
export const assertPointFeature2d = typia.createAssert<PointFeature2d>()
export const equalsPointFeature2d = typia.createEquals<PointFeature2d>()
export const isPointFeature2d = typia.createIs<PointFeature2d>()
export const randomPointFeature2d = typia.createRandom<PointFeature2d>()
export const stringifyPointFeature2d = typia.createStringify<PointFeature2d>()
export const validatePointFeature2d = typia.createValidate<PointFeature2d>()


// PointFeature3d
export const assertPointFeature3d = typia.createAssert<PointFeature3d>()
export const equalsPointFeature3d = typia.createEquals<PointFeature3d>()
export const isPointFeature3d = typia.createIs<PointFeature3d>()
export const randomPointFeature3d = typia.createRandom<PointFeature3d>()
export const stringifyPointFeature3d = typia.createStringify<PointFeature3d>()
export const validatePointFeature3d = typia.createValidate<PointFeature3d>()


// PointFeatureCollection
export const assertPointFeatureCollection = typia.createAssert<PointFeatureCollection>()
export const equalsPointFeatureCollection = typia.createEquals<PointFeatureCollection>()
export const isPointFeatureCollection = typia.createIs<PointFeatureCollection>()
export const randomPointFeatureCollection = typia.createRandom<PointFeatureCollection>()
export const stringifyPointFeatureCollection = typia.createStringify<PointFeatureCollection>()
export const validatePointFeatureCollection = typia.createValidate<PointFeatureCollection>()


// PointFeatureCollection2d
export const assertPointFeatureCollection2d = typia.createAssert<PointFeatureCollection2d>()
export const equalsPointFeatureCollection2d = typia.createEquals<PointFeatureCollection2d>()
export const isPointFeatureCollection2d = typia.createIs<PointFeatureCollection2d>()
export const randomPointFeatureCollection2d = typia.createRandom<PointFeatureCollection2d>()
export const stringifyPointFeatureCollection2d = typia.createStringify<PointFeatureCollection2d>()
export const validatePointFeatureCollection2d = typia.createValidate<PointFeatureCollection2d>()


// PointFeatureCollection3d
export const assertPointFeatureCollection3d = typia.createAssert<PointFeatureCollection3d>()
export const equalsPointFeatureCollection3d = typia.createEquals<PointFeatureCollection3d>()
export const isPointFeatureCollection3d = typia.createIs<PointFeatureCollection3d>()
export const randomPointFeatureCollection3d = typia.createRandom<PointFeatureCollection3d>()
export const stringifyPointFeatureCollection3d = typia.createStringify<PointFeatureCollection3d>()
export const validatePointFeatureCollection3d = typia.createValidate<PointFeatureCollection3d>()


// PointGeometry
export const assertPointGeometry = typia.createAssert<PointGeometry>()
export const equalsPointGeometry = typia.createEquals<PointGeometry>()
export const isPointGeometry = typia.createIs<PointGeometry>()
export const randomPointGeometry = typia.createRandom<PointGeometry>()
export const stringifyPointGeometry = typia.createStringify<PointGeometry>()
export const validatePointGeometry = typia.createValidate<PointGeometry>()


// PointGeometry2d
export const assertPointGeometry2d = typia.createAssert<PointGeometry2d>()
export const equalsPointGeometry2d = typia.createEquals<PointGeometry2d>()
export const isPointGeometry2d = typia.createIs<PointGeometry2d>()
export const randomPointGeometry2d = typia.createRandom<PointGeometry2d>()
export const stringifyPointGeometry2d = typia.createStringify<PointGeometry2d>()
export const validatePointGeometry2d = typia.createValidate<PointGeometry2d>()


// PointGeometry3d
export const assertPointGeometry3d = typia.createAssert<PointGeometry3d>()
export const equalsPointGeometry3d = typia.createEquals<PointGeometry3d>()
export const isPointGeometry3d = typia.createIs<PointGeometry3d>()
export const randomPointGeometry3d = typia.createRandom<PointGeometry3d>()
export const stringifyPointGeometry3d = typia.createStringify<PointGeometry3d>()
export const validatePointGeometry3d = typia.createValidate<PointGeometry3d>()


// PointGeometryType
export const assertPointGeometryType = typia.createAssert<PointGeometryType>()
export const equalsPointGeometryType = typia.createEquals<PointGeometryType>()
export const isPointGeometryType = typia.createIs<PointGeometryType>()
export const randomPointGeometryType = typia.createRandom<PointGeometryType>()
export const stringifyPointGeometryType = typia.createStringify<PointGeometryType>()
export const validatePointGeometryType = typia.createValidate<PointGeometryType>()


// PolygonCoordinates
export const assertPolygonCoordinates = typia.createAssert<PolygonCoordinates>()
export const equalsPolygonCoordinates = typia.createEquals<PolygonCoordinates>()
export const isPolygonCoordinates = typia.createIs<PolygonCoordinates>()
export const randomPolygonCoordinates = typia.createRandom<PolygonCoordinates>()
export const stringifyPolygonCoordinates = typia.createStringify<PolygonCoordinates>()
export const validatePolygonCoordinates = typia.createValidate<PolygonCoordinates>()


// PolygonCoordinatesRing
export const assertPolygonCoordinatesRing = typia.createAssert<PolygonCoordinatesRing>()
export const equalsPolygonCoordinatesRing = typia.createEquals<PolygonCoordinatesRing>()
export const isPolygonCoordinatesRing = typia.createIs<PolygonCoordinatesRing>()
export const randomPolygonCoordinatesRing = typia.createRandom<PolygonCoordinatesRing>()
export const stringifyPolygonCoordinatesRing = typia.createStringify<PolygonCoordinatesRing>()
export const validatePolygonCoordinatesRing = typia.createValidate<PolygonCoordinatesRing>()


// PolygonFeature
export const assertPolygonFeature = typia.createAssert<PolygonFeature>()
export const equalsPolygonFeature = typia.createEquals<PolygonFeature>()
export const isPolygonFeature = typia.createIs<PolygonFeature>()
export const randomPolygonFeature = typia.createRandom<PolygonFeature>()
export const stringifyPolygonFeature = typia.createStringify<PolygonFeature>()
export const validatePolygonFeature = typia.createValidate<PolygonFeature>()


// PolygonFeature2d
export const assertPolygonFeature2d = typia.createAssert<PolygonFeature2d>()
export const equalsPolygonFeature2d = typia.createEquals<PolygonFeature2d>()
export const isPolygonFeature2d = typia.createIs<PolygonFeature2d>()
export const randomPolygonFeature2d = typia.createRandom<PolygonFeature2d>()
export const stringifyPolygonFeature2d = typia.createStringify<PolygonFeature2d>()
export const validatePolygonFeature2d = typia.createValidate<PolygonFeature2d>()


// PolygonFeature3d
export const assertPolygonFeature3d = typia.createAssert<PolygonFeature3d>()
export const equalsPolygonFeature3d = typia.createEquals<PolygonFeature3d>()
export const isPolygonFeature3d = typia.createIs<PolygonFeature3d>()
export const randomPolygonFeature3d = typia.createRandom<PolygonFeature3d>()
export const stringifyPolygonFeature3d = typia.createStringify<PolygonFeature3d>()
export const validatePolygonFeature3d = typia.createValidate<PolygonFeature3d>()


// PolygonFeatureCollection
export const assertPolygonFeatureCollection = typia.createAssert<PolygonFeatureCollection>()
export const equalsPolygonFeatureCollection = typia.createEquals<PolygonFeatureCollection>()
export const isPolygonFeatureCollection = typia.createIs<PolygonFeatureCollection>()
export const randomPolygonFeatureCollection = typia.createRandom<PolygonFeatureCollection>()
export const stringifyPolygonFeatureCollection = typia.createStringify<PolygonFeatureCollection>()
export const validatePolygonFeatureCollection = typia.createValidate<PolygonFeatureCollection>()


// PolygonFeatureCollection2d
export const assertPolygonFeatureCollection2d = typia.createAssert<PolygonFeatureCollection2d>()
export const equalsPolygonFeatureCollection2d = typia.createEquals<PolygonFeatureCollection2d>()
export const isPolygonFeatureCollection2d = typia.createIs<PolygonFeatureCollection2d>()
export const randomPolygonFeatureCollection2d = typia.createRandom<PolygonFeatureCollection2d>()
export const stringifyPolygonFeatureCollection2d = typia.createStringify<PolygonFeatureCollection2d>()
export const validatePolygonFeatureCollection2d = typia.createValidate<PolygonFeatureCollection2d>()


// PolygonFeatureCollection3d
export const assertPolygonFeatureCollection3d = typia.createAssert<PolygonFeatureCollection3d>()
export const equalsPolygonFeatureCollection3d = typia.createEquals<PolygonFeatureCollection3d>()
export const isPolygonFeatureCollection3d = typia.createIs<PolygonFeatureCollection3d>()
export const randomPolygonFeatureCollection3d = typia.createRandom<PolygonFeatureCollection3d>()
export const stringifyPolygonFeatureCollection3d = typia.createStringify<PolygonFeatureCollection3d>()
export const validatePolygonFeatureCollection3d = typia.createValidate<PolygonFeatureCollection3d>()


// PolygonGeometry
export const assertPolygonGeometry = typia.createAssert<PolygonGeometry>()
export const equalsPolygonGeometry = typia.createEquals<PolygonGeometry>()
export const isPolygonGeometry = typia.createIs<PolygonGeometry>()
export const randomPolygonGeometry = typia.createRandom<PolygonGeometry>()
export const stringifyPolygonGeometry = typia.createStringify<PolygonGeometry>()
export const validatePolygonGeometry = typia.createValidate<PolygonGeometry>()


// PolygonGeometry2d
export const assertPolygonGeometry2d = typia.createAssert<PolygonGeometry2d>()
export const equalsPolygonGeometry2d = typia.createEquals<PolygonGeometry2d>()
export const isPolygonGeometry2d = typia.createIs<PolygonGeometry2d>()
export const randomPolygonGeometry2d = typia.createRandom<PolygonGeometry2d>()
export const stringifyPolygonGeometry2d = typia.createStringify<PolygonGeometry2d>()
export const validatePolygonGeometry2d = typia.createValidate<PolygonGeometry2d>()


// PolygonGeometry3d
export const assertPolygonGeometry3d = typia.createAssert<PolygonGeometry3d>()
export const equalsPolygonGeometry3d = typia.createEquals<PolygonGeometry3d>()
export const isPolygonGeometry3d = typia.createIs<PolygonGeometry3d>()
export const randomPolygonGeometry3d = typia.createRandom<PolygonGeometry3d>()
export const stringifyPolygonGeometry3d = typia.createStringify<PolygonGeometry3d>()
export const validatePolygonGeometry3d = typia.createValidate<PolygonGeometry3d>()


// PolygonGeometryType
export const assertPolygonGeometryType = typia.createAssert<PolygonGeometryType>()
export const equalsPolygonGeometryType = typia.createEquals<PolygonGeometryType>()
export const isPolygonGeometryType = typia.createIs<PolygonGeometryType>()
export const randomPolygonGeometryType = typia.createRandom<PolygonGeometryType>()
export const stringifyPolygonGeometryType = typia.createStringify<PolygonGeometryType>()
export const validatePolygonGeometryType = typia.createValidate<PolygonGeometryType>()


// SimpleStyleProperties
export const assertSimpleStyleProperties = typia.createAssert<SimpleStyleProperties>()
export const equalsSimpleStyleProperties = typia.createEquals<SimpleStyleProperties>()
export const isSimpleStyleProperties = typia.createIs<SimpleStyleProperties>()
export const randomSimpleStyleProperties = typia.createRandom<SimpleStyleProperties>()
export const stringifySimpleStyleProperties = typia.createStringify<SimpleStyleProperties>()
export const validateSimpleStyleProperties = typia.createValidate<SimpleStyleProperties>()


// Tilejson300
export const assertTilejson300 = typia.createAssert<Tilejson300>()
export const equalsTilejson300 = typia.createEquals<Tilejson300>()
export const isTilejson300 = typia.createIs<Tilejson300>()
export const randomTilejson300 = typia.createRandom<Tilejson300>()
export const stringifyTilejson300 = typia.createStringify<Tilejson300>()
export const validateTilejson300 = typia.createValidate<Tilejson300>()


// Tilejson300Raster
export const assertTilejson300Raster = typia.createAssert<Tilejson300Raster>()
export const equalsTilejson300Raster = typia.createEquals<Tilejson300Raster>()
export const isTilejson300Raster = typia.createIs<Tilejson300Raster>()
export const randomTilejson300Raster = typia.createRandom<Tilejson300Raster>()
export const stringifyTilejson300Raster = typia.createStringify<Tilejson300Raster>()
export const validateTilejson300Raster = typia.createValidate<Tilejson300Raster>()


// Tilejson300Vector
export const assertTilejson300Vector = typia.createAssert<Tilejson300Vector>()
export const equalsTilejson300Vector = typia.createEquals<Tilejson300Vector>()
export const isTilejson300Vector = typia.createIs<Tilejson300Vector>()
export const randomTilejson300Vector = typia.createRandom<Tilejson300Vector>()
export const stringifyTilejson300Vector = typia.createStringify<Tilejson300Vector>()
export const validateTilejson300Vector = typia.createValidate<Tilejson300Vector>()


// TilejsonCommon
export const assertTilejsonCommon = typia.createAssert<TilejsonCommon>()
export const equalsTilejsonCommon = typia.createEquals<TilejsonCommon>()
export const isTilejsonCommon = typia.createIs<TilejsonCommon>()
export const randomTilejsonCommon = typia.createRandom<TilejsonCommon>()
export const stringifyTilejsonCommon = typia.createStringify<TilejsonCommon>()
export const validateTilejsonCommon = typia.createValidate<TilejsonCommon>()


// TilejsonRasterFormat
export const assertTilejsonRasterFormat = typia.createAssert<TilejsonRasterFormat>()
export const equalsTilejsonRasterFormat = typia.createEquals<TilejsonRasterFormat>()
export const isTilejsonRasterFormat = typia.createIs<TilejsonRasterFormat>()
export const randomTilejsonRasterFormat = typia.createRandom<TilejsonRasterFormat>()
export const stringifyTilejsonRasterFormat = typia.createStringify<TilejsonRasterFormat>()
export const validateTilejsonRasterFormat = typia.createValidate<TilejsonRasterFormat>()


// TilejsonVectorFormat
export const assertTilejsonVectorFormat = typia.createAssert<TilejsonVectorFormat>()
export const equalsTilejsonVectorFormat = typia.createEquals<TilejsonVectorFormat>()
export const isTilejsonVectorFormat = typia.createIs<TilejsonVectorFormat>()
export const randomTilejsonVectorFormat = typia.createRandom<TilejsonVectorFormat>()
export const stringifyTilejsonVectorFormat = typia.createStringify<TilejsonVectorFormat>()
export const validateTilejsonVectorFormat = typia.createValidate<TilejsonVectorFormat>()


// TilejsonVectorLayer
export const assertTilejsonVectorLayer = typia.createAssert<TilejsonVectorLayer>()
export const equalsTilejsonVectorLayer = typia.createEquals<TilejsonVectorLayer>()
export const isTilejsonVectorLayer = typia.createIs<TilejsonVectorLayer>()
export const randomTilejsonVectorLayer = typia.createRandom<TilejsonVectorLayer>()
export const stringifyTilejsonVectorLayer = typia.createStringify<TilejsonVectorLayer>()
export const validateTilejsonVectorLayer = typia.createValidate<TilejsonVectorLayer>()


// TilejsonVectorLayers
export const assertTilejsonVectorLayers = typia.createAssert<TilejsonVectorLayers>()
export const equalsTilejsonVectorLayers = typia.createEquals<TilejsonVectorLayers>()
export const isTilejsonVectorLayers = typia.createIs<TilejsonVectorLayers>()
export const randomTilejsonVectorLayers = typia.createRandom<TilejsonVectorLayers>()
export const stringifyTilejsonVectorLayers = typia.createStringify<TilejsonVectorLayers>()
export const validateTilejsonVectorLayers = typia.createValidate<TilejsonVectorLayers>()
