import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTrainingList: builder.query({
      query: ({ page, rowPerPage }) => ({
        url: `/training/get/all?page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetTrainingListQuery } = extendedApi;
