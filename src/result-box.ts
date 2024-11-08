import type { TypeCheck, ValueError } from "@sinclair/typebox/compiler";
import { type Static, type TSchema, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Value } from "@sinclair/typebox/value";
import type { TSchemaStrict } from "./tb.js";
import { GeoboxValueError } from "./errors.js";

/**
 * Result is A-OK!
 */
export type ResultOk<TData> = {
  /**
   * Result is ok
   */
  ok: true;
  /**
   * Alias for ok parity with other validation libraries (zod, typia)
   */
  success: true;
  data: TData;
};

/**
 * Result Error
 */
export type ResultErr<TErr = GeoboxValueError> = {
  /**
   * Result is NOT-ok
   */
  ok: false;

  /**
   * Alias for ok parity with other validation libraries (zod, typia)
   */
  success: false;
  error: TErr;
};

/**
 * Result type
 * @param T - Type of data
 * @returns ResultOk<T> | ResultErr
 */
export type Result<TData, TErr = GeoboxValueError> =
  | ResultOk<TData>
  | ResultErr<TErr>;

/**
 * Options for checking/validating
 */
export type CheckOptions = {
  /**
   * Maximum number of errors to return
   */
  limit?: number;
};

/**
 * Formats an array of ValueError into a JSON string.
 *
 * @param errors - Array of ValueError instances.
 * @returns A formatted JSON string representing the errors.
 */
export function fmterr(...errors: ValueError[]) {
  // TODO: maybe make fast via string concat
  return JSON.stringify(errors, undefined, 2);
}

/**
 * Type guard to check if a value is of type CheckOptions (compiled via typebox)
 *
 * @param value - The value to check.
 * @returns True if the value is a CheckOptions object, false otherwise.
 */
function isCheckOptions(value: unknown): value is CheckOptions {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    // @ts-expect-error - compiled from typebox
    (value.limit === undefined
      ? true
      : // @ts-expect-error - compiled from typebox
        typeof value.limit === "number" &&
        // @ts-expect-error - compiled from typebox
        Number.isInteger(value.limit) &&
        // @ts-expect-error - compiled from typebox
        value.limit >= 1)
  );
}

/**
 * A JSON Schema Validator class for TypeBox schemas.
 *
 * @typeParam T - The TypeBox schema type.
 */
export class JsonSchemaValidator<T extends TSchema> {
  public schema: T;
  public references: TSchema[];
  public readonly options: { compile: boolean; limit?: number };
  private _typeguard?: TypeCheck<T>;

  /**
   * Creates a new JsonSchemaValidator instance.
   *
   * @param schema - The TypeBox schema to validate.
   * @param references - Optional array of referenced schemas.
   * @param options - Optional options for the validator.
   * @param options.compile - Whether to compile the schema (default: true).
   * @param options.limit - default maximum number of errors to return (default: undefined).
   */
  public constructor(
    schema: T,
    references?: TSchema[],
    options?: { compile?: boolean; limit?: number },
  ) {
    this.schema = schema;
    this.options = {
      compile: options?.compile ?? true,
    };
    this.references = references ?? [];
  }

  /**
   * Alias for calling `new JsonSchemaValidator(yer-schema)`
   */
  public static new<T extends TSchema>(
    schema: T,
    references?: TSchema[],
    options?: { compile?: boolean; limit?: number },
  ): JsonSchemaValidator<T> {
    return new JsonSchemaValidator(schema, references, options);
  }

  /**
   * Compiles the schema and returns the typeguard
   */
  public compile(references?: TSchema[]): TypeCheck<T> {
    const tg = TypeCompiler.Compile(this.schema, references ?? this.references);
    this._typeguard = tg;
    return tg;
  }

  /**
   * Returns the typeguard for this schema; compiles if not already compiled
   */
  public get typeguard(): TypeCheck<T> {
    if (!this._typeguard) {
      return this.compile();
    }
    return this._typeguard;
  }

  /**
   * Returns the typeguard.Check function for this schema
   */
  public get guard(): (data: unknown) => data is Static<T> {
    if (!this.options.compile) {
      return (data: unknown): data is Static<T> => {
        return Value.Check(this.schema, this.references, data);
      };
    }
    return (data: unknown): data is Static<T> => {
      return this.typeguard.Check(data);
    };
  }

  /**
   * Returns the typeguard.Decode function for this schema
   * @returns typeguard.Code() for this schema
   */
  public code(): string {
    return this.typeguard.Code();
  }

  /**
   * Returns the typeguard.Decode function for this schema
   * @returns typeguard.Decode() for this schema
   */
  public is = (value: unknown): value is Static<T> => {
    return this.guard(value);
  };

  /**
   * Asserts that the value is of this schema; throws an error if not
   */
  public check = (
    value: unknown,
    options?: {
      limit?: number;
    },
  ): asserts value is Static<T> => {
    if (!this.is(value)) {
      const earr = this.errorsArr(value, options);
      throw new GeoboxValueError(
        `geobox-assert: ${JSON.stringify(value)}`,
        earr,
      );
    }
  };

  /**
   * Asserts that the value is of this schema; throws an error if not
   */
  public assert = (
    value: unknown,
    options?: {
      limit?: number;
    },
  ): asserts value is Static<T> => {
    if (!this.is(value)) {
      const earr = this.errorsArr(value, options);
      throw new GeoboxValueError(
        `geobox-assert: ${JSON.stringify(value)}`,
        earr,
      );
    }
  };

  /**
   * Decodes a value according to the schema.
   *
   * @param value - The value to decode.
   * @returns The decoded value.
   */
  public decode = (value: unknown): Static<T> => {
    return this.typeguard.Decode(value);
  };

  /**
   * Encodes a value according to the schema.
   *
   * @param value - The value to encode.
   * @returns The encoded value.
   */
  public encode = (value: unknown): Static<T> => {
    return this.typeguard.Encode(value);
  };

  /**
   * Returns an iterator for each error in this value;
   * allows for max number of errors
   */
  public errors = (
    value: unknown,
    options?: {
      limit?: number;
    },
  ) => {
    const it = this.typeguard.Errors(value);
    if (options && isCheckOptions(options)) {
      return function* () {
        let i = 0;
        for (const e of it) {
          if (options?.limit && i >= options.limit) {
            break;
          }
          i++;
          yield e;
        }
      };
    }
    return function* () {
      yield* it;
    };
  };

  /**
   * Returns an array of errors in this value; allows for max number of errors
   */
  public errorsArr = (value: unknown, options?: { limit?: number }) => {
    if (!this.options.compile) {
      const it = Value.Errors(this.schema, value);
      if (options && isCheckOptions(options)) {
        const errorArray: ValueError[] = [];
        let i = 0;
        const limit = options.limit ?? this.options.limit;
        for (const error of it) {
          if (limit && i >= limit) {
            break;
          }
          i++;
          errorArray.push(error);
        }
        return errorArray;
      }
      return [...it];
    }
    const it = this.typeguard.Errors(value);
    if (options && isCheckOptions(options)) {
      const errorArray: ValueError[] = [];
      let i = 0;
      const limit = options.limit ?? this.options.limit;
      for (const error of it) {
        if (limit && i >= limit) {
          break;
        }
        i++;
        errorArray.push(error);
      }
      return errorArray;
    }
    return [...it];
  };

  /**
   * TypeGuards the value; throws an error if not of this schema
   * @param value
   * @param options - Validation options
   * @param options.limit - Maximum number of errors to return
   * @returns Static<T> if value is of this schema or throws err
   */
  public from = (value: unknown, options?: { limit?: number }): Static<T> => {
    if (this.is(value)) {
      return value;
    }
    const earr = this.errorsArr(value, options);
    throw new GeoboxValueError(`geobox-from: ${JSON.stringify(value)}`, earr);
  };

  /**
   * Alias for from()
   */
  public parse = (value: unknown, options?: { limit?: number }): Static<T> => {
    return this.from(value, options);
  };

  /**
   * Tries to typeguard the value; returns a Result
   * @param value
   * @returns Result<Static<T>>
   */
  public tryFrom = (value: unknown): Result<Static<T>> => {
    const errors = [...this.typeguard.Errors(value)];
    if (errors.length > 0) {
      return {
        ok: false,
        success: false,
        error: new GeoboxValueError(
          `geobox-tryFrom: ${JSON.stringify(value)}`,
          errors,
        ),
      };
    }
    return {
      ok: true,
      success: true,
      data: value as Static<typeof this.schema>,
    };
  };

  /**
   * Alias for tryFrom()
   */
  public safeParse = (value: unknown): Result<Static<T>> => {
    return this.tryFrom(value);
  };

  /**
   * Deref the schema
   */
  public deref = (references?: TSchema[]) => {
    return Type.Deref(this.schema, references ?? this.references);
  };

  /**
   * Returns a "strict" schema for this schema with typebox attributes/symbols removed
   */
  public strictSchema(): TSchemaStrict {
    // eslint-disable-next-line unicorn/prefer-structured-clone
    return JSON.parse(JSON.stringify(this.schema));
  }
}

/**
 * Alias/shortcut for creating a new JsonSchema instance
 */
export function jsonschema<T extends TSchema>(
  schema: T,
): JsonSchemaValidator<T> {
  return JsonSchemaValidator.new(schema);
}
