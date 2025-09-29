/**
 * String formats (based on AJV formats)
 *
 * REF: https://github.com/ajv-validator/ajv-formats/blob/master/src/formats.ts
 */
import Format from "typebox/format";

const FORMATS = {
  uri: /^[a-z][\d+.a-z-]*:(?:\/?\/)?\S*$/i,
  "date-time":
    /^\d{4}-[01]\d-[0-3]\dt(?:[0-2](?:\d:[0-5]){2}\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d{2}(?::?\d{2})?)$/i,
};

type FmtRegistry = typeof Format;

export function registerFormats(registry?: FmtRegistry) {
  const reg = registry || Format;
  for (const [format, regex] of Object.entries(FORMATS)) {
    reg.Set(format, (value) => regex.test(value));
  }
}
