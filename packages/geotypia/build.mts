import { $, fs } from "zx";
const TYPIA_IMPORT = "import typia from 'typia';";

type FileTypeExports = {
  fspath: string;
  types: string[];
};
type GeotypesMetadata = {
  files: FileTypeExports[];
  geotypes: string[];
};
const typeFunctionNames = (tname: string) => [
  `assert${tname}`,
  `equals${tname}`,
  `is${tname}`,
  `random${tname}`,
  `stringify${tname}`,
  `validate${tname}`,
];

const typeFunctions = (tname: string) => `
// ${tname}
export const assert${tname} = typia.createAssert<${tname}>()
export const equals${tname} = typia.createEquals<${tname}>()
export const is${tname} = typia.createIs<${tname}>()
export const random${tname} = typia.createRandom<${tname}>()
export const stringify${tname} = typia.createStringify<${tname}>()
export const validate${tname} = typia.createValidate<${tname}>()
`;

// PascalCase to kebab-case
const typename2filename = (tname: string) => {
  const filename = tname.replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
  if (filename.includes("2d") || filename.includes("3d")) {
    return filename.replace("2d", "-2d").replace("3d", "-3d");
  }
  return filename;
};

const bigAssFile = async (geotypes: GeotypesMetadata) => {
  const typeFunks = geotypes.geotypes.map((tname) => typeFunctions(tname));
  const lines = [
    '// eslint-disable-next-line @typescript-eslint/ban-ts-comment',
    '// @ts-nocheck',
    TYPIA_IMPORT,
    "import type {",
    geotypes.geotypes.map((tname) => `  ${tname},`).join("\n"),
    "} from '@jsse/geotypes';",
    "",
    ...typeFunks,
  ];
  const string = lines.join("\n");
  await fs.writeFile("./src/typia-input/geotypes.ts", string);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const smallAssFiles = async (geotypes: GeotypesMetadata) => {
  const _smallAssFile = async (tname: string) => {
    const filename = typename2filename(tname);
    const typeFunks = typeFunctions(tname);
    const lines = [
      TYPIA_IMPORT,
      `import type { ${tname} } from \'@jsse/geotypes\';`,
      "",
      typeFunks,
    ];
    const string = lines.join("\n");
    await fs.writeFile(`./src/typia-input/${filename}.ts`, string);
    const info = {
      filename,
      fn_names: typeFunctionNames(tname),
    };
    return info;
  };

  const infos = await Promise.all(geotypes.geotypes.map(_smallAssFile));
  return infos;

  // for (const tname of data.geotypes) {
  //   const filename = typename2filename(tname);

  //   await fs.writeFile(`./src/typia-input/${filename}.ts`, typeFunctions(tname));
  // }
};

async function nuke_input_dir() {
  await $`rm -rfv ./src/typia-input`;
  await $`mkdir ./src/typia-input`;
}

function filterTypes(tname: string) {
  return !tname.includes("Hgt");
}

async function main() {
  const data = await fs.readJSON(
    "../geotypes/geotypes.json",
  ) as GeotypesMetadata;
  await nuke_input_dir();

  data.geotypes = data.geotypes.filter(filterTypes);
  await bigAssFile(data);


  // // const
  // for (const tname of data.geotypes) {
  //   const filename = typename2filename(tname);
  //   await fs.writeFile(`./src/typia-input/${filename}.ts`, typeFunctions(tname));
  // }
}

try {
  await main();
} catch (e) {
  console.error(e);
}
