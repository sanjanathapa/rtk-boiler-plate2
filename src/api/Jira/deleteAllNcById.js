import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteAllNcById: build.mutation({
      query: ({id, ncRequestDto}) => ({
        url: `/jira/delete/all?id=${id}`,
        method: "DELETE",
        body:ncRequestDto
      }),
    }),
  }),
});

export const { useDeleteAllNcByIdMutation } = extendedApi;
