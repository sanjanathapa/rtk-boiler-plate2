import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSampleData: build.query({
      query: () => ({
        url: "posts",
      }),
    }),
  }),
});

export const { useLazyGetSampleDataQuery } = extendedApi;