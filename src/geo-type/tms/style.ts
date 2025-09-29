import type { TSchemaOptions } from "typebox";
import { Type } from "typebox";

export function TmsStyle(options?: TSchemaOptions) {
  return Type.Object(
    {
      id: Type.String({
        description:
          "An identifier for this style. Implementation of 'identifier'",
      }),
      title: Type.Optional(
        Type.String({
          description: "A title for this style",
        }),
      ),
      description: Type.Optional(
        Type.String({
          description: "Brief narrative description of this style",
        }),
      ),
      keywords: Type.Optional(
        Type.Array(
          Type.String({
            description: "keywords about this style",
          }),
        ),
      ),
      links: Type.Array(
        Type.Object({
          rel: Type.String(),
          href: Type.String(),
        }),
      ),
    },
    {
      title: "Style",
      description: "A style definition for a tile set",
      ...options,
    },
  );
}
