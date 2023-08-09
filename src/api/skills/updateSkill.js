import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateSkill: build.mutation({
      query: ({ id, skillName }) => ({
        url: `/skill/update?id=${id}`,
        method: "POST",
        body: {
          id,
          skillName
        },
      }),
    }),
  }),
});

export const { useUpdateSkillMutation } = extendedApi;
