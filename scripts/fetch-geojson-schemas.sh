#!/usr/bin/env bash

rm -rfv ./schemas/geojson
mkdir -p ./schemas/geojson

GEOJSON_SCHEMAS=(
    "FeatureCollection"
    "Feature"
    "Geometry"
    "GeometryCollection"
    "MultiPolygon"
    "MultiLineString"
    "MultiPoint"
    "Polygon"
    "LineString"
    "Point"
    "GeoJSON"
)
for schema in "${GEOJSON_SCHEMAS[@]}"; do
    url="https://geojson.org/schema/${schema}.json"
    echo "${schema}:  ${url}"
    curl "${url}" | jq > "./schemas/geojson/${schema}.schema.json"
done
