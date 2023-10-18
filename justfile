build: build-packages build-root

build-root:
    pnpm run -w build

build-packages:
    pnpm run -r build

build2typia:
    pnpm run -r --filter \!geojson build
