import { type SchemaOptions, type TSchema, Type } from "@sinclair/typebox";

export { Type } from "@sinclair/typebox";
export type {
  AssertType,
  SchemaOptions,
  Static,
  TLiteral,
  TNumber,
  TObject,
  TSchema,
  TUnknown,
} from "@sinclair/typebox";

/**
 * Nullable
 *
 * Taken from the schema god himself (sinclair)
 * REF: https://github.com/sinclairzx81/typebox#unsafe-types
 *
 * @param schema Schema to make nullable
 * @param SchemaOptions Options to pass to the schema
 * @returns A schema that is either the original schema or null
 */
export const Nullable = <T extends TSchema>(schema: T, SchemaOptions?: SchemaOptions) =>
  Type.Union([schema, Type.Null()], SchemaOptions);

/**
 * StringEnum
 *
 * Also, taken from the schema god himself (sinclair)
 * REF: https://github.com/sinclairzx81/typebox#unsafe-types
 */
export const StringEnum = <T extends string[]>(values: [...T]) => {
  return Type.Unsafe<T[number]>({ type: "string", enum: values });
};
