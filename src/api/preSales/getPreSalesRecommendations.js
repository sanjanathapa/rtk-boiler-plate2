import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRecommendations: build.mutation({
      query: ({ id }) => ({
        url: `/preSalesMapping/recommendation?id=${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetRecommendationsMutation } = extendedApi;
