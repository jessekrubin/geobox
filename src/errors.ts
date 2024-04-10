import type { ValueError } from "./typebox.js";

export type ValueErrors = ValueError[];

/**
 * GeoboxValueError custom error class that contains
 *   a list of ValueError objects.
 */
export class GeoboxValueError extends Error {
  public errors: ValueErrors;

  public constructor(message: string, errors: ValueErrors) {
    super(message);
    this.name = "GeoboxValueError";
    this.errors = errors;
  }

  get nerrs() {
    return this.errors.length;
  }

  public fmt() {
    return `${super.toString()}\n${JSON.stringify(this.errors, undefined, 2)}`;
  }

  public toString() {
    return this.fmt();
  }
}

export function isGeoboxValueError(value: unknown): value is GeoboxValueError {
  return value instanceof GeoboxValueError;
}
