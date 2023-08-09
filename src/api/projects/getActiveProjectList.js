import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActiveProjectList: builder.query({
      query: ({ page, rowPerPage }) => ({
        url: `/projects/get/all/active?page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetActiveProjectListQuery } = extendedApi;
