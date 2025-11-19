import type { Static, TSchema, TSchemaOptions } from "typebox";
import { Null, Optional, Union, Unsafe } from "typebox";

export * from "typebox";

// export type TSchemaStrict = Omit<TSchema, typeof ReadonlyKind>;

export type StaticFn<T extends (...args: never) => TSchema> = Static<
  ReturnType<T>
>;

/**
 * Nullable
 *
 * Taken from the schema god himself (sinclair)
 * REF: https://github.com/sinclairzx81/typebox#unsafe-types
 * @param schema Schema to make nullable
 * @param options Options to pass to the schema
 * @returns A schema that is either the original schema or null
 */
export function Nullable<T extends TSchema>(
  schema: T,
  options?: TSchemaOptions,
) {
  return Union([schema, Null()], options);
}

export function OptionalNullable<T extends TSchema>(
  schema: T,
  options?: TSchemaOptions,
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

export { IsLocalizedValidationError } from "typebox/error";
