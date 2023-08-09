import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredAccountingInfo: builder.query({
      query: ({projectId, startDate, endDate }) => ({
        url: `/accounting/view?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetFilteredAccountingInfoQuery } = extendedApi;
