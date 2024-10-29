import type { SchemaOptions } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export function TmsLink(options?: SchemaOptions) {
  return Type.Object(
    {
      href: Type.String({
        description:
          "Supplies the URI to a remote resource (or resource fragment).",
        example: "http://data.example.com/buildings/123",
      }),
      rel: Type.String({
        description: "The type or semantics of the relation.",
        example: "alternate",
      }),
      templated: Type.Optional(Type.Boolean()),
      varBase: Type.Optional(
        Type.String({
          example: "/ogcapi/vars/",
          description:
            "A base path to retrieve semantic information about the variables used in URL template.",
        }),
      ),
      type: Type.Optional(
        Type.String({
          example: "application/geo+json",
          description:
            "A hint indicating what the media type of the result of dereferencing the link should be.",
        }),
      ),
      hreflang: Type.Optional(
        Type.String({
          example: "en",
          description:
            "A hint indicating what the language of the result of dereferencing the link should be.",
        }),
      ),
      title: Type.Optional(
        Type.String({
          example: "Trierer Strasse 70, 53115 Bonn",
          description:
            "Used to label the destination of a link such that it can be used as a human-readable identifier.",
        }),
      ),
      length: Type.Optional(Type.Integer()),
    },
    {
      title: "Link Schema",
      description: "Schema for external references",
      $schema: "https://json-schema.org/draft/2019-09/schema",
      ...options,
    },
  );
}
