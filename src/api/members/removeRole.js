import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    removeRole: builder.mutation({
      query: (body) => ({
        url: `member/revoke`,
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useRemoveRoleMutation } = extendedApi;
