import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectSearchListByDate: builder.query({
      query: ({ page, rowsPerPage, end, start }) => {
        const params = {
          page,
          size: rowsPerPage,
          end: end,
          start: start,
        };

        return {
          url: "/projects/search/date",
          params,
        };
      },
    }),
  }),
});

export const { useLazyGetProjectSearchListByDateQuery } = extendedApi;
