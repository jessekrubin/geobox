export type IsDefined<T> = Extract<T, undefined> extends never ? true : false;
