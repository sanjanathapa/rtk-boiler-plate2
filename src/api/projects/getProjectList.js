import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectList: builder.query({
      query: ({ page, rowPerPage }) => ({
        url: `/projects/get/all?page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetProjectListQuery } = extendedApi;
