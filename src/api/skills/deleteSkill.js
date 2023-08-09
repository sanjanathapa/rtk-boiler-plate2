import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteSkill: builder.mutation({
      query: ({ id }) => ({
        url: `skill/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteSkillMutation } = extendedApi;
