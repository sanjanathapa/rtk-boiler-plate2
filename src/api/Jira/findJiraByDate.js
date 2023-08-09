import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    findJiraByDate: builder.query({
      query: ({id, page, rowPerPage, startDate, endDate }) => ({
        url: `/jira/nc/get/all?id=${id}&page=${page}&size=${rowPerPage}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyFindJiraByDateQuery } = extendedApi;
