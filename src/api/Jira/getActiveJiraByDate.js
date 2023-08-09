import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActiveJiraByDate: builder.query({
      query: ({id, month, status, type}) => ({
        url: `/jira/show/nc/logs?id=${id}&month=${month}&status=${status}&type=${type}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetActiveJiraByDateQuery } = extendedApi;
