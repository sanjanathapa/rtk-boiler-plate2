import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllJira: builder.query({
      query: ({id, page, rowPerPage }) => ({
        url: `/jira/nc/get/all?id=${id}&page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetAllJiraQuery } = extendedApi;
