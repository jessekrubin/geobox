/**
 * Integer types
 */
import type { IntegerOptions, TInteger } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export function UInt32(options?: IntegerOptions): TInteger {
  return Type.Integer({ minimum: 0, maximum: 4_294_967_295, ...options });
}

export function UInt16(options?: IntegerOptions): TInteger {
  return Type.Integer({ minimum: 0, maximum: 65_535, ...options });
}

export function UInt8(options?: IntegerOptions): TInteger {
  return Type.Integer({ minimum: 0, maximum: 255, ...options });
}

export function Int32(options?: IntegerOptions): TInteger {
  return Type.Integer({
    minimum: -2_147_483_648,
    maximum: 2_147_483_647,
    ...options,
  });
}

export function Int16(options?: IntegerOptions): TInteger {
  return Type.Integer({ minimum: -32_768, maximum: 32_767, ...options });
}

export function Int8(options?: IntegerOptions): TInteger {
  return Type.Integer({ minimum: -128, maximum: 127, ...options });
}
