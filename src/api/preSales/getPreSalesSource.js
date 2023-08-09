import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPreSalesSource: builder.query({
      query: () => ({
        url: `/preSalesSource/get/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetPreSalesSourceQuery } = extendedApi;
