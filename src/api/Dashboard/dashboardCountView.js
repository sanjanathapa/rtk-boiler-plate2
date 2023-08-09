import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardCountView: builder.query({
      query: () => ({
        url: `/dashboard/view`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetDashboardCountViewQuery } = extendedApi;
