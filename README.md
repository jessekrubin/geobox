# `@jsse/geobox`

[![NPM Version](https://img.shields.io/npm/v/%40jsse%2Fgeobox?style=flat-square&logo=npm&cacheSeconds=600&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40jsse%2Fgeobox)](https://www.npmjs.com/package/@jsse/geobox)

geo-spatial json-schemas à la [typebox](https://github.com/sinclairzx81/typebox)

## Features

- Schema fns:
  - customizable geojson-schema functions for geometry types, feature types, and
    feature-collection types
  - customizable coordinate types for 2d and 3d coordinates
  - TileJSON schema(s)
  - geojson simplestyle-spec properties schema(s) as defined by
    [mapbox](https://github.com/mapbox/simplestyle-spec)
  - mapbox-geostats schema(s) as defined by
    [mapbox](https://github.com/mapbox/mapbox-geostats)
  - sprite-sheet schema builders for maplibre/mapbox/deck.gl spritesheets
  - Tile-Matrix-Set schema(s) as defined by
    [OGC](https://www.ogc.org/our-work/standard/tms/)
- basic validator class to wrap schemas and validate typebox schemas using
  typebox's
- `@jsse/geobox/lite`: A bundled version of the library with the many
  description-strings stripped out for when you don't need/want them (this is
  done via a crude `sed`ing)

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
import { Type, type Static } from "typebox";
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
```

---

## TODO

- [ ] projjson schema(s)
- [ ] maplibre/mapbox stylespec schema(s)
