import { type SchemaOptions, Type } from "@sinclair/typebox";

// {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "https://schemas.stacspec.org/v1.1.0/item-spec/json-schema/data-values.json#",
//   "title": "Fields related to data values",
//   "type": "object",
//   "properties": {
//     "data_type": {
//       "title": "Data type of the values",
//       "type": "string",
//       "enum": [
//         "int8",
//         "int16",
//         "int32",
//         "int64",
//         "uint8",
//         "uint16",
//         "uint32",
//         "uint64",
//         "float16",
//         "float32",
//         "float64",
//         "cint16",
//         "cint32",
//         "cfloat32",
//         "cfloat64",
//         "other"
//       ]
//     },
//     "nodata": {
//       "title": "No data value",
//       "oneOf": [
//         {
//           "type": "number"
//         },
//         {
//           "type": "string",
//           "enum": [
//             "nan",
//             "inf",
//             "-inf"
//           ]
//         }
//       ]
//     },
//     "statistics": {
//       "title": "Statistics",
//       "type": "object",
//       "minProperties": 1,
//       "properties": {
//         "minimum": {
//           "title": "Minimum value of all the data values",
//           "type": "number"
//         },
//         "maximum": {
//           "title": "Maximum value of all the data values",
//           "type": "number"
//         },
//         "mean": {
//           "title": "Mean value of all the data values",
//           "type": "number"
//         },
//         "stddev": {
//           "title": "Standard deviation value of all the data values",
//           "type": "number"
//         },
//         "count": {
//           "title": "Total number of all data values",
//           "type": "integer",
//           "minimum": 0
//         },
//         "valid_percent": {
//           "title": "Percentage of valid (not nodata) values",
//           "type": "number",
//           "minimum": 0,
//           "maximum": 100
//         }
//       }
//     },
//     "unit": {
//       "title": "Unit denomination of the data value",
//       "type": "string"
//     }
//   }
// }

export function StacItemDataType(options?: SchemaOptions) {
  return Type.Union(
    [
      Type.Literal("int8"),
      Type.Literal("int16"),
      Type.Literal("int32"),
      Type.Literal("int64"),
      Type.Literal("uint8"),
      Type.Literal("uint16"),
      Type.Literal("uint32"),
      Type.Literal("uint64"),
      Type.Literal("float16"),
      Type.Literal("float32"),
      Type.Literal("float64"),
      Type.Literal("cint16"),
      Type.Literal("cint32"),
      Type.Literal("cfloat32"),
      Type.Literal("cfloat64"),
      Type.Literal("other"),
    ],
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "Data type of the values",
      description: "Data type of the values",
      ...options,
    },
  );
}

export function DataValuesStatistics(options?: SchemaOptions) {
  return Type.Object(
    {
      minimum: Type.Number({
        description: "Minimum value of all the data values",
      }),
      maximum: Type.Number({
        description: "Maximum value of all the data values",
      }),
      mean: Type.Number({
        description: "Mean value of all the data values",
      }),
      stddev: Type.Number({
        description: "Standard deviation value of all the data values",
      }),
      count: Type.Integer({
        description: "Total number of all data values",
        title: "Total number of all data values",
        minimum: 0,
      }),
      valid_percent: Type.Number({
        description: "Percentage of valid (not nodata) values",
        title: "Percentage of valid (not nodata) values",
        minimum: 0,
        maximum: 100,
      }),
    },
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "Statistics",
      description: "Statistics",
      minProperties: 1,
      ...options,
    },
  );
}

export function DataValues(options?: SchemaOptions) {
  return Type.Partial(
    Type.Object(
      {
        data_type: StacItemDataType(),
        nodata: Type.Union(
          [
            Type.Number(),
            Type.Literal("nan"),
            Type.Literal("inf"),
            Type.Literal("-inf"),
          ],
          {
            description: "No data value",
            title: "No data value",
          },
        ),
        statistics: DataValuesStatistics(),
        unit: Type.String({
          description: "Unit denomination of the data value",
        }),
      },
      {
        $schema: "http://json-schema.org/draft-07/schema#",
        additionalProperties: false,
        ...options,
      },
    ),
  );
}
