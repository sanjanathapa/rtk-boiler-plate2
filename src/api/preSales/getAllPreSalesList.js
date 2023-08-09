import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPreSalesList: builder.query({
      query: ({ page , rowPerPage }) => ({
        url: `/preSales/get/all?page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetAllPreSalesListQuery } = extendedApi;
