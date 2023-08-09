import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: ({ page, rowsPerPage, status }) => {
        const params = {
          page,
          size: rowsPerPage,
          status,
        };

        return {
          url: "/user/get/all",
          params,
        };
      },
    }),
  }),
});

export const { useLazyGetUserListQuery } = extendedApi;
