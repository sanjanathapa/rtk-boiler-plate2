import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShiftTimingsList: builder.query({
      query: () => ({
        url: `/preSalesShiftTimings/get/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetShiftTimingsListQuery } = extendedApi;
