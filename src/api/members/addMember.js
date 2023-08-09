import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    addMember: build.mutation({
      query: (body) => ({
        url: "/user/save",
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useAddMemberMutation } = extendedApi;
