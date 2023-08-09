import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: {
    rememberMe: "",
    loginToken: "",
    user: {},
    accesses: [],
  },
  reducers: {
    loginStore: (state, action) => {
      if (!action.payload.skipOthers) {
        state.loginToken = action.payload.token;
        state.rememberMe = action.payload.rememberMe;
        state.user = action.payload.user;
      }
      state.accesses = action.payload.accesses;
    },
  },
});
export const { loginStore } = loginSlice.actions;

export default loginSlice.reducer;
