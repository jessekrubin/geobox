import { type SchemaOptions, type TSchema, Type } from "@sinclair/typebox";

export * from "@sinclair/typebox";
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
  return Type.Union([schema, Type.Null()], options);
}

export function OptionalNullable<T extends TSchema>(
  schema: T,
  options?: SchemaOptions,
) {
  return Type.Optional(Nullable(schema, options));
}

/**
 * StringEnum
 *
 * Also, taken from the schema god himself (sinclair)
 * REF: https://github.com/sinclairzx81/typebox#unsafe-types
 */
export function StringEnum<T extends string[]>(values: [...T]) {
  return Type.Unsafe<T[number]>({ type: "string", enum: values });
}
