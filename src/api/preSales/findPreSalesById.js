import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    findPreSalesById: builder.query({
      query: ({ id}) => ({
        url: `/preSales/find?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyFindPreSalesByIdQuery } = extendedApi;
