import { Type } from "@sinclair/typebox";

export const JSON_SCHEMA_OPTIONS = {
  $schema: Type.Optional(Type.String()),
  $id: Type.Optional(Type.String()),
  title: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  default: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Any()),
  readOnly: Type.Optional(Type.Boolean()),
  writeOnly: Type.Optional(Type.Boolean()),
};

export function JsonSchemaOptions() {
  return Type.Object({
    ...JSON_SCHEMA_OPTIONS,
  });
}

export const JSON_SCHEMA_OPTIONS_SCHEMA = JsonSchemaOptions();
