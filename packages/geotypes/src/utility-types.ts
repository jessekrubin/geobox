export type Nullable<T> = T | null;
// eslint-disable-next-line @typescript-eslint/ban-types
export type Fmt<T> = { [KeyType in keyof T]: T[KeyType] } & {};
export type IsUnknown<T> = unknown extends T ? true : false;
export type IsUndefined<T> = undefined extends T ? true : false;
export type IsNull<T> = null extends T ? true : false;
export type IsVoid<T> = IsUndefined<T> extends true ? true : IsNull<T> extends true ? true : false;
export type IsUnknownOrUndefined<T> = IsUnknown<T> extends true ? true : IsUndefined<T> extends true ? true : false;
export type ExtendsUndefined<T> = T extends undefined ? true : false;
export type ExtendsNull<T> = T extends null ? true : false;
export type ExtendsVoid<T> = ExtendsUndefined<T> extends true ? true : ExtendsNull<T> extends true ? true : false;
export type ExtendsUnknown<T> = T extends unknown ? true : false;
export type ExtendsUnknownOrUndefined<T> = ExtendsUnknown<T> extends true ? true : ExtendsUndefined<T> extends true ? true : false;
