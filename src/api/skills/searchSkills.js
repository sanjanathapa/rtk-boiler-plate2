import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTechnologySearchList: builder.query({
      query: ({ page, rowsPerPage, search }) => {
        const params = {
          page,
          size: rowsPerPage,
          text: search,
        };

        return {
          url: "/skill/search",
          params,
        };
      },
    }),
  }),
});

export const { useLazyGetTechnologySearchListQuery } = extendedApi;
