/**
 * HGT (height) file types
 */

type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Zero2Seven = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type HgtLatitudeTens = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type HgtLongitudesLessThan100 = `0${Digits}${Digits}`;
type HgtLongitudesGreaterThan99 = `1${Zero2Seven}${Digits}`;

type EastLongitudesNumbers = HgtLongitudesGreaterThan99 | HgtLongitudesLessThan100;
type WestLongitudesNumbers = EastLongitudesNumbers | "180";

export type HgtNorthLatitudes = `N${HgtLatitudeTens}${Digits}`;
export type HgtSouthLatitudes = `S${HgtLatitudeTens}${Digits}`;
export type HgtLatitudes = HgtNorthLatitudes | HgtSouthLatitudes;

export type HgtEastLongitudes = `E${EastLongitudesNumbers}`;
export type HgtWestLongitudes = `W${WestLongitudesNumbers}`;

export type HgtLongitudes = HgtEastLongitudes | HgtWestLongitudes;
export type NorthEastHgtFilename = `${HgtNorthLatitudes}${HgtEastLongitudes}`;
export type NorthWestHgtFilename = `${HgtNorthLatitudes}${HgtWestLongitudes}`;
export type SouthEastHgtFilename = `${HgtSouthLatitudes}${HgtEastLongitudes}`;
export type SouthWestHgtFilename = `${HgtSouthLatitudes}${HgtWestLongitudes}`;
export type HgtFilename = NorthEastHgtFilename | NorthWestHgtFilename | SouthEastHgtFilename | SouthWestHgtFilename;
