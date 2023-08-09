import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteLocation: builder.mutation({
      query: ({ id }) => ({
        url: `location/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteLocationMutation } = extendedApi;
