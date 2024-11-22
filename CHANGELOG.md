# @jsse/geobox

## 0.3.6

### Patch Changes

- 5010c98: handle null geometry in Feature schema
- 5010c98: merged in old geoparquet branch

## 0.3.5

### Patch Changes

- eslint update and eslint fix

## 0.3.4

### Patch Changes

- fix exports

## 0.3.3

### Patch Changes

- bump typebox peer dep req

## 0.3.2

### Patch Changes

- Add deref/references to validator

## 0.3.1

### Patch Changes

- 8d46a67: add lite version w/o descriptions

## 0.3.0

### Minor Changes

- 4c959ab: major refactoring and reorging as well as loosening a few types up a bit

### Patch Changes

- 4623d41: fixup over-arching geojson schema type

## 0.2.21

### Patch Changes

- removed properties from geometry collection as not per spec

## 0.2.20

### Patch Changes

- add success back to result type for parity with other validation libs that we use

## 0.2.19

### Patch Changes

- fix sprite sheet schema as used by maplibre/mapbox/deckgl

## 0.2.18

### Patch Changes

- 813a563: Added tms (tile matrix set) related schemas
- remove `success` from result type... added some of those words between code lines

## 0.2.17

### Patch Changes

- update dependencies

## 0.2.16

### Patch Changes

- 145faa3: fix internal build and tsconfig setup

## 0.2.15

### Patch Changes

- c64a7aa: deprecate geojson crs and add compile-option to validator
- 2b73eb4: Added sprite json schema

## 0.2.14

### Patch Changes

- b7380cb: fix eslint internal settings

## 0.2.13

### Patch Changes

- 5ec157c: Fix type-imports

## 0.2.12

### Patch Changes

- Fix types resolution

## 0.2.11

### Patch Changes

- updated dependencies

## 0.2.9

### Patch Changes

- b3d61d0: - (u)tile.json schema refine-ment
  - Added tests for fastify for almost all schemas as response types
  - Something is funky with the recursive types and fastify's fast-json-stringify so default to primitives not recursive for geom/geom-coll
