import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    updatePreSalesProject: build.mutation({
      query: ({id,preSalesUpdateRequestDto }) => ({
        url: `/preSales/update?id=${id}`,
        method: "POST",
        body:preSalesUpdateRequestDto
      }),
    }),
  }),
});

export const { useUpdatePreSalesProjectMutation } = extendedApi;
