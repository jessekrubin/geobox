import { Type, type Static } from "@sinclair/typebox";
import * as geobox from "@jsse/geobox";

// geojson-point-feature json-schema used by my (jesse) babydog
// schema has feature property "dingo" of type string
const pointSchemaBabydog = geobox.PointFeature({
  properties: Type.Object({ dingo: Type.String() }),
});
// typebox inferred type:
type PointSchemaBabydog = Static<typeof pointSchemaBabydog>;
// type PointSchemaBabydog = {
//   type: "Feature";
//   id?: string | number | null | undefined;
//   bbox?: [number, number, number, number] | [number, number, number, number, number, number] | undefined;
//   geometry: {
//     type: "Point";
//     bbox?: [number, number, number, number] | [number, number, number, number, number, number] | undefined;
//     coordinates: [number, number] | [number, number, number];
//   }
//   properties: {
//     dingo: string;
//   };
// }

const pointGeometrySchema = geobox.PointGeometry();
type PointGeometrySchema = Static<typeof pointGeometrySchema>;
// type PointGeometrySchema = {
//   type: "Point";
//   bbox?: [number, number, number, number] | [number, number, number, number, number, number] | undefined;
//   coordinates: [number, number] | [number, number, number];
// }

const point2dGeometrySchema = geobox.PointGeometry({
  // [lng: number, lat: number] where -180 <= lng <= 180 and -90 <= lat <= 90
  // same as Type.Tuple([Type.Number({ minimum: -180, maximum: 180 }), Type.Number({ minimum: -90, maximum: 90 })])
  coordinate: geobox.Coord2dWgs84(),
});
type Point2dGeometrySchema = Static<typeof point2dGeometrySchema>;
// type Point2dGeometrySchema = {
//   type: "Point";
//   bbox?: [number, number, number, number] | [number, number, number, number, number, number] | undefined;
//   coordinates: [number, number];
// }
