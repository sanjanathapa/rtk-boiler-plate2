import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPreSalesManagers: builder.query({
      query: () => ({
        url: `/preSalesManagers/get/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetPreSalesManagersQuery } = extendedApi;
