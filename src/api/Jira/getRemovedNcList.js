import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRemovedNcList: builder.query({
      query: ({id}) => ({
        url: `/jira/nc/delete/view?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetRemovedNcListQuery } = extendedApi;
