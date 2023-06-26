#!/usr/bin/env bash

reset_dir() {
    dirpath=$1
    echo "Resetting ${dirpath}"
    rm -rfv "${dirpath}"
    mkdir -p "${dirpath}"
}

fetch_schema() {
    dirpath=$1
    url=$2
    output_filename=$(basename "${url}")
    output_filepath="${dirpath}/${output_filename}"
    echo "${url} -> ${output_filepath}"
    curl "${url}" | jq >"${output_filepath}"
}

fetch_item_spec_schema() {
    url=$1
    fetch_schema "./schemas/stac-spec/item-spec" "${url}"
}

reset_dir ./schemas/stac-spec/item-spec
reset_dir ./schemas/stac-spec/catalog-spec
reset_dir ./schemas/stac-spec/collection-spec

fetch_schema "./schemas/stac-spec/collection-spec" "https://raw.githubusercontent.com/radiantearth/stac-spec/master/collection-spec/json-schema/collection.json"
fetch_schema "./schemas/stac-spec/catalog-spec" "https://raw.githubusercontent.com/radiantearth/stac-spec/master/catalog-spec/json-schema/catalog.json"

STAC_SPEC_ITEM_SPEC=(
    "basics"
    "datetime"
    "instrument"
    "item"
    "licensing"
    "provider"
)

for schema in "${STAC_SPEC_ITEM_SPEC[@]}"; do
    fetch_item_spec_schema "https://raw.githubusercontent.com/radiantearth/stac-spec/master/item-spec/json-schema/${schema}.json"
done
