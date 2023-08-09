import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExpList: builder.query({
      query: () => ({
        url: `/preSalesExperience/get/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetExpListQuery } = extendedApi;
