import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteUser: build.mutation({
      query: (body) => ({
        url: `/user/deactivate`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useDeleteUserMutation } = extendedApi;
