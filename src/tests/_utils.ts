import path from "node:path";

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as tb from "typebox";
import * as GeoType from "../geo-type.js";
import * as geobox from "../index.js";

export function reporoot(): string {
  return path.resolve(__dirname, "..", "..");
}

export function resolveRepoPath(fspath: string): string {
  return path.resolve(reporoot(), fspath);
}

export function geoboxSchemaFunctionNames(): string[] {
  return Object.entries(GeoType)
    .filter(
      ([k, v]) =>
        typeof v === "function" &&
        k[0] !== undefined &&
        v.name[0] === k[0].toUpperCase() &&
        /[A-Z]/.test(v.name[0]),
    )
    .map(([k, _v]) => k);
}

export function typeboxSchemaFunctionNames() {
  const fns: string[] = [];
  for (const [k, v] of Object.entries(tb)) {
    if (
      typeof v === "function" &&
      k[0] !== undefined &&
      v.name[0] === k[0].toUpperCase() &&
      /[A-Z]/.test(v.name[0])
    ) {
      fns.push(k);
    }
  }
  return fns;
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
