export type Attribute = {
  attribute: string
  count: number
  type: "string" | "number" | "boolean" | "null" | "mixed"
  values: string[] | number[] | boolean[] | null[]
  min?: number
  max?: number
  [k: string]: unknown
}


export type Layer = {
  layer: string
  count: number
  geometry: "Point" | "LineString" | "Polygon"
  attributeCount: number
  attributes?: Attribute[]
  [k: string]: unknown
}
export interface MySchema {
  layerCount: number
  layers: Layer[]
  [k: string]: unknown
}
