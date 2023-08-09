import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobTitle: builder.query({
      query: () => ({
        url: `/preSalesJobTitle/get/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetAllJobTitleQuery } = extendedApi;
