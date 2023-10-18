import jsse from "@jsse/eslint-config";

export default [
  ...jsse({
    typescript: {
      tsconfigPath: ["tsconfig.json", "tsconfig.tsd.json", "tsconfig.eslint.json"],
    },
  }),
  {
    files: ["src/types-tests/*.ts", "src/types-tests/*.tsx"],
    rules: {
      "unused-imports/no-unused-vars": "off",
      "no-unused-vars": "off",
      "no-lone-blocks": "off",
    },
  },
];
