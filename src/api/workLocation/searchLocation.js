import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLocationSearchList: builder.query({
      query: ({ page, rowsPerPage, search }) => {
        const params = {
          page,
          size: rowsPerPage,
          text: search,
        };

        return {
          url: "/location/search",
          params,
        };
      },
    }),
  }),
});

export const { useLazyGetLocationSearchListQuery } = extendedApi;
