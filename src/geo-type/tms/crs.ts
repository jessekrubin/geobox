import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";

function TmsCrsUriObject(options?: TSchemaOptions) {
  return Type.Object(
    {
      uri: Type.String({ format: "uri" }),
    },
    {
      ...options,
      required: ["uri"],
    },
  );
}

function TmsCrsWktObject(options?: TSchemaOptions) {
  return Type.Object(
    {
      wkt: Type.Any(),
    },
    {
      ...options,
      required: ["wkt"],
    },
  );
}

function TmsCrsReferenceSystemObject(options?: TSchemaOptions) {
  return Type.Object(
    {
      referenceSystem: Type.Any(),
    },
    {
      ...options,
      required: ["referenceSystem"],
    },
  );
}

function TmsCrsObject(options?: TSchemaOptions) {
  return Type.Union(
    [TmsCrsUriObject(), TmsCrsWktObject(), TmsCrsReferenceSystemObject()],
    {
      ...options,
    },
  );
}

export function TmsCrs(options?: TSchemaOptions) {
  return Type.Union(
    [
      Type.String({
        description:
          "Simplification of the object into a url if the other properties are not present",
        format: "uri",
      }),
      TmsCrsObject(),
    ],
    {
      $schema: "https://json-schema.org/draft/2019-09/schema",
      title: "CRS (TileMatrixSet)",
      description: "TileMatrixSet CRS data structure",
      ...options,
    },
  );
}
