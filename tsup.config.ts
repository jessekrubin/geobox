import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  format: ["cjs", "esm"],
  dts: false,
  outDir: "dist",
  clean: true,
  target: "esnext",
  tsconfig: "./tsconfig.json",
});
