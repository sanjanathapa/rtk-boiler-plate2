import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateProject: build.mutation({
      query: ({ endDate, fhId, name, pmId, startDate, id }) => ({
        url: `/projects/update?id=${id}`,
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

export const { useUpdateProjectMutation } = extendedApi;
