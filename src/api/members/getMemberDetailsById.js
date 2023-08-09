import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMemberDetailsById: builder.query({
      query: ({ id }) => ({
        url: `/member/find?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetMemberDetailsByIdQuery } = extendedApi;
