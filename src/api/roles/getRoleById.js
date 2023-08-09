import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoleById: builder.query({
      query: ({ id }) => ({
        url: `/role/find?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetRoleByIdQuery } = extendedApi;
