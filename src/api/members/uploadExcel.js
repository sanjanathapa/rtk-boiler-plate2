import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadExcel: build.mutation({
      query: (body) => ({
        url: "/user/upload/excel",
        headers:{
            "Content-Type": "multipart/form-data",
            'Accept': 'application/json'
        },
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUploadExcelMutation } = extendedApi;
