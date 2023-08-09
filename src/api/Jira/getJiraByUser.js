import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserJira: builder.query({
      query: ({id}) => ({
        url: `/jira/show/nc/report?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUserJiraQuery } = extendedApi;
