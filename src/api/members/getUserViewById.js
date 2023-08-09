import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserViewById: builder.query({
      query: ({ id }) => ({
        url: `/user/view?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUserViewByIdQuery } = extendedApi;
