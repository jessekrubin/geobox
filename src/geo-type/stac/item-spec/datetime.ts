// {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "https://schemas.stacspec.org/v1.1.0/item-spec/json-schema/datetime.json",
//   "title": "Date and Time Fields",
//   "type": "object",
//   "dependencies": {
//     "start_datetime": {
//       "required": ["end_datetime"]
//     },
//     "end_datetime": {
//       "required": ["start_datetime"]
//     }
//   },
//   "properties": {
//     "datetime": {
//       "title": "Date and Time",
//       "description": "The searchable date/time of the data, in UTC (Formatted in RFC 3339) ",
//       "type": ["string", "null"],
//       "format": "date-time",
//       "pattern": "(\\+00:00|Z)$"
//     },
//     "start_datetime": {
//       "title": "Start Date and Time",
//       "description": "The searchable start date/time of the data, in UTC (Formatted in RFC 3339) ",
//       "type": "string",
//       "format": "date-time",
//       "pattern": "(\\+00:00|Z)$"
//     },
//     "end_datetime": {
//       "title": "End Date and Time",
//       "description": "The searchable end date/time of the data, in UTC (Formatted in RFC 3339) ",
//       "type": "string",
//       "format": "date-time",
//       "pattern": "(\\+00:00|Z)$"
//     },
//     "created": {
//       "title": "Creation Time",
//       "type": "string",
//       "format": "date-time",
//       "pattern": "(\\+00:00|Z)$"
//     },
//     "updated": {
//       "title": "Last Update Time",
//       "type": "string",
//       "format": "date-time",
//       "pattern": "(\\+00:00|Z)$"
//     }
//   }
// }
import { type SchemaOptions, Type } from "@sinclair/typebox";

export function Datetime(options?: SchemaOptions) {
  return Type.Object(
    {
      datetime: Type.Union([Type.String(), Type.Null()]),
      start_datetime: Type.String({
        title: "Start Date and Time",
        description:
          "The searchable start date/time of the data, in UTC (Formatted in RFC 3339) ",
        pattern: String.raw`(\+00:00|Z)$`,
      }),
      end_datetime: Type.String({
        pattern: String.raw`(\+00:00|Z)$`,
      }),
      created: Type.String({
        pattern: String.raw`(\+00:00|Z)$`,
      }),
      updated: Type.String({
        pattern: String.raw`(\+00:00|Z)$`,
      }),
    },
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      additionalProperties: false,
      dependencies: {
        start_datetime: {
          required: ["end_datetime"],
        },
        end_datetime: {
          required: ["start_datetime"],
        },
      },
      ...options,
    },
  );
}
