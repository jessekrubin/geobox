import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";
import { JSON_SCHEMA_OPTIONS_SCHEMA } from "./common.js";

export function JsonSchemaStringFormat(options?: TSchemaOptions) {
  return Type.Union(
    [
      Type.Literal("date-time"),
      Type.Literal("time"),
      Type.Literal("date"),
      Type.Literal("email"),
      Type.Literal("idn-email"),
      Type.Literal("hostname"),
      Type.Literal("idn-hostname"),
      Type.Literal("ipv4"),
      Type.Literal("ipv6"),
      Type.Literal("uri"),
      Type.Literal("uri-reference"),
      Type.Literal("iri"),
      Type.Literal("uuid"),
      Type.Literal("iri-reference"),
      Type.Literal("uri-template"),
      Type.Literal("json-pointer"),
      Type.Literal("relative-json-pointer"),
      Type.Literal("regex"),
      Type.String(),
    ],
    {
      ...options,
      description: "A format this string should match",
    },
  );
}

export function JsonSchemaStringContentEncoding(options?: TSchemaOptions) {
  return Type.Union(
    [
      Type.Literal("7bit"),
      Type.Literal("8bit"),
      Type.Literal("binary"),
      Type.Literal("quoted-printable"),
      Type.Literal("base64"),
      Type.String(),
    ],
    {
      ...options,
      description: "The content encoding for this string",
    },
  );
}

export function JsonSchemaString(options?: TSchemaOptions) {
  return Type.Interface([
    JSON_SCHEMA_OPTIONS_SCHEMA,
    Type.Object(
      {
        type: Type.Literal("string"),
        enum: Type.Optional(Type.Array(Type.String())),
        minLength: Type.Optional(Type.Integer({ minimum: 0 })),
        maxLength: Type.Optional(Type.Integer({ minimum: 0 })),
        pattern: Type.Optional(Type.String()),
        format: Type.Optional(JsonSchemaStringFormat()),
        contentEncoding: Type.Optional(JsonSchemaStringContentEncoding()),
        contentMediaType: Type.Optional(Type.String()),
      },
      {
        ...options,
        $schema: "https://json-schema.org/draft/2019-09/schema",
        description: "JSON Schema string type",
      },
    ),
  ], {});
}
