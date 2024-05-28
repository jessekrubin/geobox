import type {
  SchemaOptions,
  TLiteral,
  TObject,
  TString,
  TUnion,
} from "../typebox.js";
import { Type } from "../typebox.js";

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
  options?: SchemaOptions,
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
  options?: SchemaOptions,
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
  options?: SchemaOptions,
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
