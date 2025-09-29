import { IsSchema } from "typebox";
import { describe, expect, test } from "vitest";
import { geoboxSchemaFns } from "./_utils.js";

describe.each(geoboxSchemaFns())("schema-$key", ({ fn }) => {
  const gbSchema = fn();
  test("is-schema", () => {
    expect(gbSchema).toBeDefined();
    expect(IsSchema(gbSchema)).toBe(true);
  });
});
