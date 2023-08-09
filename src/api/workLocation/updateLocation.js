import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateLocation: build.mutation({
      query: ({ id, locationName }) => ({
        url: `/location/update?id=${id}`,
        method: "POST",
        body: {
          id,
          locationName
        },
      }),
    }),
  }),
});

export const { useUpdateLocationMutation } = extendedApi;
