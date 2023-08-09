import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    checkAvailable: build.mutation({
      query: (body) => ({
        url: "/user/check/available",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCheckAvailableMutation } = extendedApi;
