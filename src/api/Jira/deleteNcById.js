import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteNcById: build.mutation({
      query: ({ncId, userId, ncRequestDto}) => ({
        url: `/jira/delete?ncId=${ncId}&userId=${userId}`,
        method: "DELETE",
        body:ncRequestDto
      }),
    }),
  }),
});

export const { useDeleteNcByIdMutation } = extendedApi;
