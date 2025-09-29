import type {
  TLiteral,
  TObject,
  TSchemaOptions,
  TString,
  TUnion,
} from "typebox";
import { Type } from "typebox";

export type TNamedCoordinateReferenceSystem = TObject<{
  type: TLiteral<"name">;
  properties: TObject<{ name: TString }>;
}>;

export type TLinkedCoordinateReferenceSystem = TObject<{
  type: TLiteral<"link">;
  properties: TObject<{ href: TString; type: TString }>;
}>;

export type TCoordinateReferenceSystem = TUnion<
  [TNamedCoordinateReferenceSystem, TLinkedCoordinateReferenceSystem]
>;

export function NamedCoordinateReferenceSystem(
  options?: TSchemaOptions,
): TNamedCoordinateReferenceSystem {
  return Type.Object(
    {
      type: Type.Literal("name"),
      properties: Type.Object({
        name: Type.String(),
      }),
    },
    {
      title: "Named Coordinate Reference System",
      description: "Named Coordinate Reference System",
      ...options,
    },
  );
}

export function LinkedCoordinateReferenceSystem(
  options?: TSchemaOptions,
): TLinkedCoordinateReferenceSystem {
  return Type.Object(
    {
      type: Type.Literal("link"),
      properties: Type.Object({
        href: Type.String(),
        type: Type.String(),
      }),
    },
    {
      title: "Linked Coordinate Reference System",
      description: "Linked Coordinate Reference System",
      ...options,
    },
  );
}

export function CoordinateReferenceSystem(
  options?: TSchemaOptions,
): TCoordinateReferenceSystem {
  return Type.Union(
    [NamedCoordinateReferenceSystem(), LinkedCoordinateReferenceSystem()],
    {
      title: "Coordinate Reference System",
      description: "Coordinate Reference System",
      ...options,
    },
  );
}

export function CoordinateReferenceSystemOptional(options?: TSchemaOptions) {
  return Type.Optional(
    CoordinateReferenceSystem({
      title: "coordinate-reference-system-optional",
      description: "Optional Coordinate Reference System",
      ...options,
    }),
  );
}

export type TCoordinateReferenceSystemSchema = ReturnType<
  typeof CoordinateReferenceSystem
>;
export type TCoordinateReferenceSystemSchemaOptional = ReturnType<
  typeof CoordinateReferenceSystemOptional
>;
