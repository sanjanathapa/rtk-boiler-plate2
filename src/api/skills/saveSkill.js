import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    saveSkill: build.mutation({
      query: ({ id, skillName }) => ({
        url: "/skill/save",
        method: "POST",
        body: {
          id,
          skillName,
        },
      }),
    }),
  }),
});

export const { useSaveSkillMutation } = extendedApi;
