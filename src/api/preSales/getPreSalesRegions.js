import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPreSalesRegion: builder.query({
      query: () => ({
        url: `/preSalesRegion/get/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetPreSalesRegionQuery } = extendedApi;
