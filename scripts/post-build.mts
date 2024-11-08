/* eslint-disable unicorn/prefer-string-replace-all */
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
    // eslint-disable-next-line no-console
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

const DESC_STRING_RE = /(\s*description\s*:\s*(["'`])(?:\\\2|.)*?\2\s*,?)/g;
const DESC_OBJ_LITERAL_RE = /(\s*description\s*:\s*{[^{}]*?}\s*,?)/g;

function stripDescriptions(codeString: string) {
  codeString = codeString.replace(DESC_STRING_RE, "");
  codeString = codeString.replace(DESC_OBJ_LITERAL_RE, "");
  return codeString;
}

async function stripDescriptionsInFile(src: string, dst: string) {
  const srcString = await fs.readFile(src, { encoding: "utf8" });
  const stripped = stripDescriptions(srcString);
  await fs.writeFile(dst, stripped, { encoding: "utf8" });
}

async function makeLite() {
  await Promise.all([
    stripDescriptionsInFile("dist/index.js", "dist/lite.js"),
    stripDescriptionsInFile("dist/index.cjs", "dist/lite.cjs"),
  ]);
}

async function main() {
  await Promise.all([writeCjsPackageJson(), writeEsmPackageJson()]);
  await makeLite();
}

await main();
