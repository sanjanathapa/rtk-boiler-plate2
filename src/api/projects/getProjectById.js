import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectById: builder.query({
      query: ({ id }) => ({
        url: `/projects/find?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetProjectByIdQuery } = extendedApi;
