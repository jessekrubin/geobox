/* eslint-disable no-console */
import { Type } from "@sinclair/typebox";
import * as geobox from "./dist/index.js";

const pointSchemaBabydog = geobox.PointFeature({
  properties: Type.Object({ dingo: Type.String() }),
});

console.log(JSON.stringify(pointSchemaBabydog, undefined, 2));

// {
//   "type": "object",
//   "properties": {
//     "type": {
//       "const": "Feature",
//       "type": "string"
//     },
//     "id": {
//       "anyOf": [
//         {
//           "type": "string"
//         },
//         {
//           "type": "number"
//         }
//       ]
//     },
//     "geometry": {
//       "title": "GeoJSON Point",
//       "type": "object",
//       "properties": {
//         "type": {
//           "const": "Point",
//           "type": "string"
//         },
//         "coordinates": {
//           "title": "GeoJSON coordinate",
//           "description": "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
//           "anyOf": [
//             {
//               "title": "GeoJSON coordinate 2d",
//               "description": "coordinate: [longitude, latitude]",
//               "type": "array",
//               "items": [
//                 {
//                   "title": "Longitude",
//                   "description": "longitude",
//                   "type": "number"
//                 },
//                 {
//                   "title": "Latitude",
//                   "type": "number"
//                 }
//               ],
//               "additionalItems": false,
//               "minItems": 2,
//               "maxItems": 2
//             },
//             {
//               "title": "GeoJSON coordinate 3d",
//               "description": "coordinate: [longitude, latitude, elevation/z]",
//               "type": "array",
//               "items": [
//                 {
//                   "title": "Longitude",
//                   "description": "longitude",
//                   "type": "number"
//                 },
//                 {
//                   "title": "Latitude",
//                   "type": "number"
//                 },
//                 {
//                   "type": "number"
//                 }
//               ],
//               "additionalItems": false,
//               "minItems": 3,
//               "maxItems": 3
//             }
//           ]
//         }
//       },
//       "required": [
//         "type",
//         "coordinates"
//       ]
//     },
//     "properties": {
//       "type": "object",
//       "properties": {
//         "dingo": {
//           "type": "string"
//         }
//       },
//       "required": [
//         "dingo"
//       ]
//     }
//   },
//   "required": [
//     "type",
//     "geometry",
//     "properties"
//   ]
// }

console.log(JSON.stringify(Type.Strict(pointSchemaBabydog), undefined, 2));
// {
//   "type": "object",
//   "properties": {
//     "type": {
//       "const": "Feature",
//       "type": "string"
//     },
//     "id": {
//       "anyOf": [
//         {
//           "type": "string"
//         },
//         {
//           "type": "number"
//         }
//       ]
//     },
//     "geometry": {
//       "title": "GeoJSON Point",
//       "type": "object",
//       "properties": {
//         "type": {
//           "const": "Point",
//           "type": "string"
//         },
//         "coordinates": {
//           "title": "GeoJSON coordinate",
//           "description": "coordinate: [longitude, latitude] or [longitude, latitude, elevation/z]",
//           "anyOf": [
//             {
//               "title": "GeoJSON coordinate 2d",
//               "description": "coordinate: [longitude, latitude]",
//               "type": "array",
//               "items": [
//                 {
//                   "title": "Longitude",
//                   "description": "longitude",
//                   "type": "number"
//                 },
//                 {
//                   "title": "Latitude",
//                   "type": "number"
//                 }
//               ],
//               "additionalItems": false,
//               "minItems": 2,
//               "maxItems": 2
//             },
//             {
//               "title": "GeoJSON coordinate 3d",
//               "description": "coordinate: [longitude, latitude, elevation/z]",
//               "type": "array",
//               "items": [
//                 {
//                   "title": "Longitude",
//                   "description": "longitude",
//                   "type": "number"
//                 },
//                 {
//                   "title": "Latitude",
//                   "type": "number"
//                 },
//                 {
//                   "type": "number"
//                 }
//               ],
//               "additionalItems": false,
//               "minItems": 3,
//               "maxItems": 3
//             }
//           ]
//         }
//       },
//       "required": [
//         "type",
//         "coordinates"
//       ]
//     },
//     "properties": {
//       "type": "object",
//       "properties": {
//         "dingo": {
//           "type": "string"
//         }
//       },
//       "required": [
//         "dingo"
//       ]
//     }
//   },
//   "required": [
//     "type",
//     "geometry",
//     "properties"
//   ]
// }
