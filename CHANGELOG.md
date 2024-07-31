# @jsse/geobox

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
