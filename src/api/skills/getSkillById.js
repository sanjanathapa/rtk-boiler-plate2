import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSkillById: builder.query({
      query: ({ id }) => ({
        url: `/skill/find?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetSkillByIdQuery } = extendedApi;
