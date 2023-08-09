import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectSearchList: builder.query({
      query: ({ page, rowsPerPage, search }) => {
        const params = {
          page,
          size: rowsPerPage,
          text: search,
        };

        return {
          url: "/projects/search",
          params,
        };
      },
    }),
  }),
});

export const { useLazyGetProjectSearchListQuery } = extendedApi;
