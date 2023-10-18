import { z } from "zod";
import { pointGeometry, coordinate2d, coordinateNd, pointFeature } from "./geojson.js";

const pnd = pointGeometry({
  coordinate: coordinateNd(),
});
const p2d = pointGeometry({
  coordinate: coordinate2d(),
});

type Point2d = z.TypeOf<typeof p2d>;

const thing = pointFeature({
  coordinate: coordinate2d(),
  properties: z.object({
    name: z.string(),
  }),
});
type Thingc = z.TypeOf<typeof thing>["geometry"]["coordinates"];
type Thing = z.TypeOf<typeof thing>["properties"];
