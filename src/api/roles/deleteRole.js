import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteRole: builder.mutation({
      query: (body) => ({
        url: `role/delete?id=${body.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteRoleMutation } = extendedApi;
