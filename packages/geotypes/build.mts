import { fs, glob, path } from "zx";

type FileTypeExports = {
  fspath: string;
  types: string[];
};
type GeotypesMetadata = {
  files: FileTypeExports[];
  geotypes: string[];
};
const exportedTypesForFile = async (file: string): Promise<FileTypeExports> => {
  const string = await fs.readFile(file, {
    encoding: "utf-8",
  });
  const lines = string.split("\n");
  const exportedTypes = lines
    .filter((line) => line.includes("export type"))
    .map((line) => line.split(" ")[2].replace(";", ""))
    .map((typeAlias) => (typeAlias.includes("<") ? typeAlias.substring(0, typeAlias.indexOf("<")) : typeAlias));
  const exportedInterfaces = lines
    .filter((line) => line.includes("export interface"))
    .map((line) => line.split(" ")[2].replace(";", ""))
    .map((iname) => (iname.includes("<") ? iname.substring(0, iname.indexOf("<")) : iname));
  const types = [...exportedTypes, ...exportedInterfaces];

  // check for duplicates
  const duplicates = types.filter((item, index) => types.indexOf(item) != index);
  if (duplicates.length > 0) {
    throw new Error(`Duplicate types found in ${file}: ${duplicates.join(", ")}`);
  }

  return {
    fspath: file,
    types: types.sort((a, b) => a.localeCompare(b)),
  };
};

const typesIndex = async (files: FileTypeExports[]) => {
  const filepaths = files.map((file) => path.basename(file.fspath).replace(".ts", ".js"));
  const lines = filepaths.map((file) => `export * from "./${file}"`);
  const string = lines.join("\n");
  await fs.writeFile("./src/types/index.ts", string);

  const geotypesMetadata: GeotypesMetadata = {
    files: files,
    geotypes: [
      ...files.map((file) => file.types).flat(),
      // ...new Set(
      //   ...files.map((file) => file.types),
      // ),
    ].sort((a, b) => a.localeCompare(b)),
  };
  await fs.writeFile("./geotypes.json", JSON.stringify(geotypesMetadata, undefined, 2));
};

const main = async () => {
  const filesAll = await glob("./src/types/*.ts");
  const files = filesAll.filter((file) => !file.includes("index.ts"));
  const allTypes = await Promise.all(files.map(exportedTypesForFile));
  await typesIndex(allTypes);
};

try {
  await main();
} catch (e) {
  console.log(e);
}
