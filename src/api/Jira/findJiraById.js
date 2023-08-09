import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    findJiraById: builder.query({
      query: ({id, page, rowPerPage, str, startDate, endDate }) => ({
        url: `/jira/nc/get/all?id=${id}&page=${page}&size=${rowPerPage}&str=${str}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyFindJiraByIdQuery } = extendedApi;
