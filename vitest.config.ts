import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: false,
    threads: false,
    reporters: ["verbose"],
    exclude: ["**/node_modules/**", "**/packages/**"],
  },
});
