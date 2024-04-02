import type { Static, TSchema } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { TypeCheck, ValueError } from "@sinclair/typebox/compiler";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export type ResultOk<T> = {
  ok: true;
  success: true;
  data: T;
};

export type ResultErr = {
  ok: false;
  success: false;
  error: Error;
};
export type Result<T> = ResultOk<T> | ResultErr;

/**
 * Options for checking/validating
 */
export type CheckOptions = {
  /**
   * Maximum number of errors to return
   */
  limit?: number;
};

export function fmterr(...errors: ValueError[]) {
  // TODO: maybe make fast via string concat
  return JSON.stringify(errors, undefined, 2);
}

function isCheckOptions(value: unknown): value is CheckOptions {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    // @ts-expect-error - compiled from typebox
    (value.limit !== undefined
      ? // @ts-expect-error - compiled from typebox
        typeof value.limit === "number" &&
        // @ts-expect-error - compiled from typebox
        Number.isInteger(value.limit) &&
        // @ts-expect-error - compiled from typebox
        value.limit >= 1
      : true)
  );
}

// function checkOptions(
//   options?: CheckOptions,
// ): { limit?: number } {

//   return {
//     limit: options?.limit,
//   };
// )

export class JsonSchema<T extends TSchema> {
  public schema: T;
  private _typeguard?: TypeCheck<T>;

  public constructor(schema: T) {
    this.schema = schema;
  }

  public static new<T extends TSchema>(schema: T): JsonSchema<T> {
    return new JsonSchema(schema);
  }

  /**
   * Compiles the schema and returns the typeguard
   */
  public compile(): TypeCheck<T> {
    const tg = TypeCompiler.Compile(this.schema);
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
    return this.typeguard.Check;
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
   */
  public is = (value: unknown): value is Static<T> => {
    return this.typeguard.Check(value);
  };

  // public is(value: unknown): value is Static<T> {
  // return this.typeguard.Check(value);
  // }

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
      throw new Error(
        `Invalid value: ${JSON.stringify(value)}\n${JSON.stringify(earr)}`,
      );
    }
  };

  public decode = (value: unknown): Static<T> => {
    return this.typeguard.Decode(value);
  };

  public encode = (value: unknown): Static<T> => {
    return this.typeguard.Encode(value);
  };

  /**
   * Returns an iterator for each error in this value;
   * allows for max number of errors
   *
   * @param value
   * @param options
   */
  public errors = (
    value: unknown,
    options?: {
      limit?: number;
    },
  ) => {
    const it = this.typeguard.Errors(value);
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
  };

  /**
   * Returns an array of errors in this value; allows for max number of errors
   * @param value
   * @param options
   */
  public errorsArr = (value: unknown, options?: { limit?: number }) => {
    const it = this.typeguard.Errors(value);
    if (options?.limit) {
      const errorArray: Error[] = [];
      let i = 0;
      for (const error of it) {
        if (options?.limit && i >= options.limit) {
          break;
        }
        i++;
        errorArray.push(error);
      }
      return errorArray;
    }
    return [...it];
  };

  public from = (value: unknown, options?: { limit?: number }): Static<T> => {
    if (this.is(value)) {
      return value;
    }
    const earr = this.errorsArr(value, options);
    throw new Error(
      `Invalid value: ${JSON.stringify(value)}\n${JSON.stringify(earr)}`,
    );
  };

  public parse = (value: unknown, options?: { limit?: number }): Static<T> => {
    return this.from(value, options);
  };

  public tryFrom = (value: unknown): Result<Static<T>> => {
    const errors = [...this.typeguard.Errors(value)];
    if (errors.length > 0) {
      return {
        ok: false,
        success: false,
        error: new Error(
          `Invalid value: ${JSON.stringify(value)}\n${JSON.stringify(
            errors,
            undefined,
            2,
          )}`,
        ),
      };
    }
    return {
      ok: true,
      success: true,
      data: value as Static<typeof this.schema>,
    };
  };

  public safeParse = (value: unknown): Result<Static<T>> => {
    return this.tryFrom(value);
  };

  public strictSchema(): TSchema {
    return Type.Strict(this.schema);
  }
}

/**
 * Alias/shortcut for creating a new JsonSchema instance
 */
export function jsonschema<T extends TSchema>(schema: T): JsonSchema<T> {
  const t = JsonSchema.new(schema);
  return t;
}

const typethingy = Type.Object({
  limit: Type.Optional(
    Type.Integer({
      minimum: 1,
    }),
  ),
});

const code = jsonschema(typethingy).code();
console.log(code);
