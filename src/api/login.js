import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/auth/token",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = extendedApi;

