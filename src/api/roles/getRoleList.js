import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoleList: builder.query({
      query: ({ page, rowsPerPage }) => ({
        url: `/role/get/all?page=${page}&size=${rowsPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetRoleListQuery } = extendedApi;
