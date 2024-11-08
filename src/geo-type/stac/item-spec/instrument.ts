import { type SchemaOptions, Type } from "@sinclair/typebox";

//{
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "https://schemas.stacspec.org/v1.1.0/item-spec/json-schema/instrument.json",
//   "title": "Instrument Fields",
//   "type": "object",
//   "properties": {
//     "platform": {
//       "title": "Platform",
//       "type": "string"
//     },
//     "instruments": {
//       "title": "Instruments",
//       "type": "array",
//       "items": {
//         "type": "string"
//       }
//     },
//     "constellation": {
//       "title": "Constellation",
//       "type": "string"
//     },
//     "mission": {
//       "title": "Mission",
//       "type": "string"
//     },
//     "gsd": {
//       "title": "Ground Sample Distance",
//       "type": "number",
//       "exclusiveMinimum": 0
//     }
//   }
// }
export function Instrument(options?: SchemaOptions) {
  return Type.Partial(
    Type.Object(
      {
        platform: Type.String({
          title: "Platform",
        }),
        instruments: Type.Array(
          Type.String({
            title: "Instruments",
          }),
        ),
        constellation: Type.String({
          title: "Constellation",
        }),
        mission: Type.String({
          title: "Mission",
        }),
        gsd: Type.Number({
          title: "Ground Sample Distance",
          exclusiveMinimum: 0,
        }),
      },
      {
        additionalProperties: false,
        ...options,
      },
    ),
  );
}
