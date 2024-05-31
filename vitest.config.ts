import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    benchmark: {
      exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
      include: ["**/*.{bench,benchmark}.?(c|m)[jt]s?(x)"],
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
    },
  },
});
