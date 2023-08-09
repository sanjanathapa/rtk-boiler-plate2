import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    changePwd: build.mutation({
      query: (body) => ({
        url: "/user/change/password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useChangePwdMutation } = extendedApi;
