import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSkillList: builder.query({
      query: ({ page, rowPerPage }) => ({
        url: `/skill/get/all?page=${page}&size=${rowPerPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetSkillListQuery } = extendedApi;
export const getSkillsMetaSlice = extendedApi.endpoints.getSkillList.select()