import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    assignRole: build.mutation({
      query: (body) => ({
        url: "/member/assign/role",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAssignRoleMutation } = extendedApi;
