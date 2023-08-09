import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    saveFilters: build.mutation({
      query: (body) => ({
        url: "/filters/save",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSaveFiltersMutation } = extendedApi;
