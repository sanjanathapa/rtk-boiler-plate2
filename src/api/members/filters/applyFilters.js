import api from "api";
import { get } from "utils/lodash";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    applyFilters: build.mutation({
      query: (body) => ({
        url: `/user/filter?page=${get(body, "page", "0")}&size=${get(
          body,
          "size",
          "10"
        )}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useApplyFiltersMutation } = extendedApi;
