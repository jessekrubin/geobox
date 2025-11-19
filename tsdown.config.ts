import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  treeshake: true,
  fixedExtension: false,
  dts: false,
  outDir: "dist",
  clean: true,
  target: "esnext",
  tsconfig: "./tsconfig.cjs.json",
});
