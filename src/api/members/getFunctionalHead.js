import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFunctionalManager: builder.query({
      query: ({ page, rowPerPage }) => ({
        url: `/functional/head/get/all?page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetFunctionalManagerQuery } = extendedApi;
