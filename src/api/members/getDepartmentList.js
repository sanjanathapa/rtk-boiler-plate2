import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartment: builder.query({
      query: ({ page, rowPerPage }) => ({
        url: `/department/departments?page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetAllDepartmentQuery } = extendedApi;
