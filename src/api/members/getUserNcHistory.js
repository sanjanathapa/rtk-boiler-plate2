import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserNcHistory: builder.query({
      query: ({ id, startMonth, endMonth }) => ({
        url: `/user/history?endMonth=${endMonth}&id=${id}&startMonth=${startMonth}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUserNcHistoryQuery } = extendedApi;
