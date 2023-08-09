import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    deactivate: build.mutation({
      query: (body) => ({
        url: `/user/deactivate`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useDeactivateMutation } = extendedApi;
