import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    saveRole: build.mutation({
      query: ({ roleName, description, access, status }) => ({
        url: "/role/save",
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

export const { useSaveRoleMutation } = extendedApi;
