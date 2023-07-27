import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["packages/template/*", "**/node_modules/**"],
    benchmark: {
      // exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
      include: ["**/*.{bench,benchmark}.?(c|m)[jt]s?(x)"],
    },
  },
});
