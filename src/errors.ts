import type { ValueError } from "@sinclair/typebox/value";

/**
 * GeoboxValueError custom error class that contains
 *   a list of ValueError objects.
 */
export class GeoboxValueError extends Error {
  public errors: ValueError[];

  public constructor(message: string, errors: ValueError[]) {
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

  public override toString() {
    return this.fmt();
  }
}

export function isGeoboxValueError(value: unknown): value is GeoboxValueError {
  return value instanceof GeoboxValueError;
}
