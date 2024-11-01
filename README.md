# `@jsse/geobox`

[![NPM Version](https://img.shields.io/npm/v/%40jsse%2Fgeobox?style=flat-square&logo=npm&cacheSeconds=600&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40jsse%2Fgeobox)](https://www.npmjs.com/package/@jsse/geobox)

geo-spatial json-schemas à la [typebox](https://github.com/sinclairzx81/typebox)

## Install

```bash
pnpm add @jsse/geobox
# or
npm i @jsse/geobox
# or
yarn add @jsse/geobox
# or (if gen-z)
bun add @jsse/geobox
```

## Example (wip)

```ts
import { Type } from "@sinclair/typebox";
import * as geobox from "./dist/index.js";

const pointSchemaBabydog = geobox.PointFeature(
  Type.Object({ dingo: Type.String() }),
);

console.log(JSON.stringify(pointSchemaBabydog, null, 2));

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

console.log(JSON.stringify(Type.Strict(pointSchemaBabydog), null, 2));
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
```
