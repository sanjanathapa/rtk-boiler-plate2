import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJiraByFilter: builder.mutation({
      query: ({id, page, rowPerPage,ncFilterRequestDto }) => ({
        url: `/jira/filter?id=${id}&page=${page}&size=${rowPerPage}`,
        method: "POST",
        body:ncFilterRequestDto
      }),
    }),
  }),
});

export const { useGetJiraByFilterMutation } = extendedApi;
