import type {
  Hint,
  Kind,
  OptionalKind,
  ReadonlyKind,
  SchemaOptions,
  Static,
  TransformKind,
  TSchema,
} from "@sinclair/typebox";
import { Null, Optional, Union, Unsafe } from "@sinclair/typebox";

export * from "@sinclair/typebox";

export type TypeboxSymbols =
  | typeof Hint
  | typeof Kind
  | typeof OptionalKind
  | typeof ReadonlyKind
  | typeof TransformKind;

export type TSchemaStrict = Omit<TSchema, typeof ReadonlyKind>;

export type StaticFn<T extends (...args: never) => TSchema> = Static<
  ReturnType<T>
>;

/**
 * Nullable
 *
 * Taken from the schema god himself (sinclair)
 * REF: https://github.com/sinclairzx81/typebox#unsafe-types
 *
 * @param schema Schema to make nullable
 * @param options Options to pass to the schema
 * @returns A schema that is either the original schema or null
 */
export function Nullable<T extends TSchema>(
  schema: T,
  options?: SchemaOptions,
) {
  return Union([schema, Null()], options);
}

export function OptionalNullable<T extends TSchema>(
  schema: T,
  options?: SchemaOptions,
) {
  return Optional(Nullable(schema, options));
}

/**
 * StringEnum
 *
 * Also, taken from the schema god himself (sinclair)
 * REF: https://github.com/sinclairzx81/typebox#unsafe-types
 */
export function StringEnum<T extends string[]>(values: [...T]) {
  return Unsafe<T[number]>({ type: "string", enum: values });
}

// export { Type } from "@sinclair/typebox";
// export type { Static, SchemaOptions, TSchema, TTuple, TNumber, AssertType, TOptional, TLiteral, TObject, TString, TUnion, IntegerOptions, TInteger } from "@sinclair/typebox";

export type { ValueError } from "@sinclair/typebox/value";
