import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSelectionProcess: builder.query({
      query: () => ({
        url: `/preSalesSelectionProcess/get/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetAllSelectionProcessQuery } = extendedApi;
