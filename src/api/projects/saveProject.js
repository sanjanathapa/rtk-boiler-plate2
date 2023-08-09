import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    saveProject: build.mutation({
      query: ({ endDate, fhId, name, pmId, startDate }) => ({
        url: "/projects/save",
        method: "POST",
        body: {
          endDate,
          fhId,
          name,
          pmId,
          startDate,
        },
      }),
    }),
  }),
});

export const { useSaveProjectMutation } = extendedApi;
