import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateMember: build.mutation({
      query: (body) => ({
        url: `/user/update?id=${body.id}`,
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useUpdateMemberMutation } = extendedApi;
