import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    addFeedback: build.mutation({
      query: (body) => ({
        url: `/feedback/project/save`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddFeedbackMutation } = extendedApi;
