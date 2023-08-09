import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteFilter: build.mutation({
      query: ({ id }) => ({
        url: `/filters/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteFilterMutation } = extendedApi;
