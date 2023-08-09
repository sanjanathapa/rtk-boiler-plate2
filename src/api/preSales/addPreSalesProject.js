import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    savePreSalesProject: build.mutation({
      query: (body) => ({
        url: "/preSales/save",
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useSavePreSalesProjectMutation } = extendedApi;
