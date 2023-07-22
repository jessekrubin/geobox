export type GeostatsAttribute = {
  attribute: string
  count: number
  type: "string" | "number" | "boolean" | "null" | "mixed"
  values: string[] | number[] | boolean[] | null[]
  min?: number
  max?: number
  [k: string]: unknown
}


export type GeostatsLayer = {
  layer: string
  count: number
  geometry: "Point" | "LineString" | "Polygon"
  attributeCount: number
  attributes?: GeostatsAttribute[]
  [k: string]: unknown
}
export interface Geostats {
  layerCount: number
  layers: GeostatsLayer[]
  [k: string]: unknown
}
