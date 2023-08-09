import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectManager: builder.query({
      query: ({ page, rowPerPage }) => ({
        url: `/projects/project/manager?page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetProjectManagerQuery } = extendedApi;
