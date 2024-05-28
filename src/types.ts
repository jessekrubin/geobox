import type { TNumber, TTuple, TUnion } from "./typebox.js";

export type IsDefined<T> = Extract<T, undefined> extends never ? true : false;

export type TVec1 = TTuple<[TNumber]>;
export type TVec2 = TTuple<[TNumber, TNumber]>;
export type TVec3 = TTuple<[TNumber, TNumber, TNumber]>;
export type TVec4 = TTuple<[TNumber, TNumber, TNumber, TNumber]>;
export type TVec5 = TTuple<[TNumber, TNumber, TNumber, TNumber, TNumber]>;
export type TVec6 = TTuple<
  [TNumber, TNumber, TNumber, TNumber, TNumber, TNumber]
>;

export type TUnionVec2Vec3 = TUnion<[TVec2, TVec3]>;
export type TUnionVec4Vec6 = TUnion<[TVec4, TVec6]>;
