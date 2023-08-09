import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: ({ id }) => ({
        url: `/user/find?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUserByIdQuery } = extendedApi;
