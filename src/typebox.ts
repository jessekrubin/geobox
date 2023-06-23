import { type SchemaOptions, type TSchema, Type } from "@sinclair/typebox";

export { Type } from "@sinclair/typebox";
export type { AssertType, SchemaOptions, Static, TLiteral, TObject, TSchema, TUnknown } from "@sinclair/typebox";

export const TNullable = <T extends TSchema>(schema: T, SchemaOptions?: SchemaOptions) =>
  Type.Union([schema, Type.Null()], SchemaOptions);
