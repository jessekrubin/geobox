import { describe, expect, test } from "vitest";
import { TypeGuard } from "@sinclair/typebox";
import { geoboxSchemaFns } from "./_utils.js";

describe.each(geoboxSchemaFns())("schema-$key", ({ fn }) => {
  const gbSchema = fn();
  test("is-schema", () => {
    expect(gbSchema).toBeDefined();
    expect(TypeGuard.IsSchema(gbSchema)).toBe(true);
  });
});
