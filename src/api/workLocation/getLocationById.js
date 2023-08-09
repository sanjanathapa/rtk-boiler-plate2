import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLocationById: builder.query({
      query: ({ id }) => ({
        url: `/location/find?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetLocationByIdQuery } = extendedApi;
