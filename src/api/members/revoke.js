import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    revoke: build.mutation({
      query: (body) => ({
        url: "/user/revoke/resign",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRevokeMutation } = extendedApi;
