import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilterById: builder.query({
      query: ({ id }) => ({
        url: `/filters/find?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetFilterByIdQuery } = extendedApi;
