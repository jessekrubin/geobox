// eslint.config.js
import jsse from "@jsse/eslint-config";
import pluginAntfu from "eslint-plugin-antfu";

export default jsse(
  {
    typescript: {
      tsconfig: ["./tsconfig.eslint.json", "./tsconfig.json"],
    },
    ignores: ["example/**/*"],
    // TODO lint markdown files
    markdown: false,
  },
  {
    files: ["schemas/**/*.schema.json"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },
  {
    files: ["./src/dev/dev.ts", "./src/dev/dev.test.ts", "./src/scratch/**/*"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    plugins: {
      antfu: pluginAntfu,
    },
    rules: {
      "antfu/top-level-function": "error",
    },
  },
);
