/* eslint-disable @typescript-eslint/no-explicit-any */
import * as geobox from "../index.js";
import * as tb from "../typebox.js";
import * as GeoType from "../geo-type.js";

export function geoboxSchemaFunctionNames(): string[] {
  return Object.entries(GeoType)
    .filter(
      ([k, v]) =>
        typeof v === "function" &&
        v.name[0] === k[0].toUpperCase() &&
        /[A-Z]/.test(v.name[0]),
    )
    .map(([k, _v]) => k);
}

export function typeboxSchemaFunctionNames() {
  return Object.entries(tb)
    .filter(
      ([k, v]) =>
        typeof v === "function" &&
        v.name[0] === k[0].toUpperCase() &&
        /[A-Z]/.test(v.name[0]),
    )
    .map(([k, _v]) => k);
}

type GeoboxFn = {
  key: string;
  fn: (options?: any) => tb.TSchema;
};
export function geoboxSchemaFns(): GeoboxFn[] {
  const geoboxFnNames = geoboxSchemaFunctionNames();
  const geoboxFnNamesSet = new Set(geoboxFnNames);
  const gbfns: GeoboxFn[] = [];
  // add top-level functions
  for (const [k, v] of Object.entries(geobox)) {
    if (typeof v === "function" && geoboxFnNamesSet.has(k)) {
      gbfns.push({
        key: k,
        fn: v as (options?: any) => any,
      });
    }
  }
  return gbfns;
}
