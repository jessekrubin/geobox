import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

function TmsCrsUriObject(options?: SchemaOptions) {
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

function TmsCrsWktObject(options?: SchemaOptions) {
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

function TmsCrsReferenceSystemObject(options?: SchemaOptions) {
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

function TmsCrsObject(options?: SchemaOptions) {
  return Type.Union(
    [TmsCrsUriObject(), TmsCrsWktObject(), TmsCrsReferenceSystemObject()],
    {
      ...options,
    },
  );
}

export function TmsCrs(options?: SchemaOptions) {
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
