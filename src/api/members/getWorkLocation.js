import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkLocation: builder.query({
      query: ({ page, rowPerPage }) => ({
        url: `/location/get/all?page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetWorkLocationQuery } = extendedApi;



