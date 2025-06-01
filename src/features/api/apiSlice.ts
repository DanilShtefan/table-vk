import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Field, Record } from "../../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Records", "Fields"],
  endpoints: (builder) => ({
    getFields: builder.query<Field[], void>({
      query: () => "fields",
      providesTags: ["Fields"],
    }),
    newGetFields: builder.query<Field[], void>({
      query: () => "newField",
      providesTags: ["Fields"],
    }),
    addField: builder.mutation<Field, Partial<Field>>({
      query: (newField) => ({
        url: "filds",
        method: "POST",
        body: newField,
      }),
      invalidatesTags: ["Fields"],
    }),
    getRecords: builder.query<Record[], { page: number; limit: number }>({
      query: ({ page, limit }) =>
        `records?_start=${page * limit}&_limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Records" as const, id })),
              { type: "Records", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Records", id: "PARTIAL-LIST" }],
    }),

    addRecord: builder.mutation<Record, Partial<Record>>({
      query: (newRecord) => ({
        url: "records",
        method: "POST",
        body: newRecord,
      }),
      invalidatesTags: ["Records"],
    }),

    updateRecord: builder.mutation<
      Record,
      Partial<Record> & Pick<Record, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `records/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Records", id }],
    }),

    deleteRecord: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `records/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Records", id }],
    }),
  }),
});

export const {
  useGetFieldsQuery,
  useNewGetFieldsQuery,
  useGetRecordsQuery,
  useAddRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
  useAddFieldMutation,
} = apiSlice;
