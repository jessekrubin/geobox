/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
      },
    ],
    "new-cap": "off",
    "@typescript-eslint/quotes": "off",
  },
  overrides: [
    {
      files: ["./src/dev/dev.ts", "./src/dev/dev.test.ts", "./src/scratch/**/*"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
