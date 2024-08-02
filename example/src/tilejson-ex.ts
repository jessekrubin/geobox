import { Tilejson } from "@jsse/geobox";
import { Tilejson as TilejsonDirectImport } from "@jsse/geobox/lib/index.js";

const tjSchema = Tilejson();
console.log(tjSchema);

const tjDirectImportSchema = TilejsonDirectImport();
console.log(tjDirectImportSchema);
