import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getForgotPwd: builder.query({
      query: (email) => ({
        url: `/auth/forgot/password?email=${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetForgotPwdQuery } = extendedApi;
