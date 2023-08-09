import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserSearchList: builder.query({
      query: ({ page, rowsPerPage, status, search }) => {
        const params = {
          page,
          size: rowsPerPage,
          status,
          text: search,
        };

        return {
          url: "/user/search",
          params,
        };
      },
    }),
  }),
});

export const { useLazyGetUserSearchListQuery } = extendedApi;
