import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConsolidatedNc: builder.mutation({
      query: ({id, page, rowPerPage,consolidatedNcDto }) => ({
        url: `/jira/consolidated/view?id=${id}&page=${page}&size=${rowPerPage}`,
        method: "POST",
        body:consolidatedNcDto 
      }),
    }),
  }),
});

export const { useGetConsolidatedNcMutation } = extendedApi;
