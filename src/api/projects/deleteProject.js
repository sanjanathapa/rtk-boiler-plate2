import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `projects/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteProjectMutation } = extendedApi;
