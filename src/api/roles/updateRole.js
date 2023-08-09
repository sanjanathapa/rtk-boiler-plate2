import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateRole: build.mutation({
      query: ({ roleName, description, status, access, id }) => ({
        url: `/role/update?id=${id}`,
        method: "POST",
        body: {
          roleName,
          description,
          access,
          status,
        },
      }),
    }),
  }),
});

export const { useUpdateRoleMutation } = extendedApi;
