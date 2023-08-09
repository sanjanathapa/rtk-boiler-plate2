import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    saveLocation: build.mutation({
      query: ({ id, locationName }) => ({
        url: "/location/save",
        method: "POST",
        body: {
          id,
          locationName,
        },
      }),
    }),
  }),
});

export const { useSaveLocationMutation } = extendedApi;
