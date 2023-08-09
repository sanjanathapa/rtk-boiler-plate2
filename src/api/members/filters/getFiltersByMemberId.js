import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFiltersByMemberId: builder.query({
      query: (id) => ({
        url: `/filters/get/all?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetFiltersByMemberIdQuery } = extendedApi;
