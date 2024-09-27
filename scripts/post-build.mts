import { promises as fs } from "node:fs";
import process from "node:process";

const VERBOSE =
  process.argv.includes("--verbose") || process.argv.includes("-v");
const cjsOutDir = "dist/lib/cjs";
const esmOutDir = "dist/lib/esm";

const packageJsonCjs = {
  type: "commonjs",
  sideEffects: false,
};

const packageJsonEsm = {
  type: "module",
  sideEffects: false,
};

const log: typeof console.log = (...args: Parameters<typeof console.log>) => {
  if (VERBOSE) {
    console.log(...args);
  }
};

async function writeCjsPackageJson() {
  const packageJsonCjsFilepath = `${cjsOutDir}/package.json`;
  const packageJsonCjsString = JSON.stringify(packageJsonCjs, undefined, 2);
  log(
    `Writing cjs package.json to ${packageJsonCjsFilepath}: ${packageJsonCjsString}`,
  );
  await fs.writeFile(`${cjsOutDir}/package.json`, packageJsonCjsString, {
    encoding: "utf8",
  });
  log(`Wrote cjs package.json to ${packageJsonCjsFilepath}`);
}

async function writeEsmPackageJson() {
  const packageJsonEsmFilepath = `${esmOutDir}/package.json`;
  const packageJsonEsmString = JSON.stringify(packageJsonEsm, undefined, 2);
  log(
    `Writing esm package.json to ${packageJsonEsmFilepath}: ${packageJsonEsmString}`,
  );
  await fs.writeFile(`${esmOutDir}/package.json`, packageJsonEsmString, {
    encoding: "utf8",
  });
  log(`Wrote esm package.json to ${packageJsonEsmFilepath}`);
}
async function main() {
  await Promise.all([writeCjsPackageJson(), writeEsmPackageJson()]);
}

await main();
