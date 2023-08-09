import { createSlice } from "@reduxjs/toolkit";

const memberSearchSlice = createSlice({
  name: "MemberSearchSlice",
  initialState: {
    storedSearchInput: "",
  },
  reducers: {
    memberSearchStore: (state, action) => {
      state.storedSearchInput = action.payload.storedSearchInput;
      
    },
  },
});
export const { memberSearchStore } = memberSearchSlice.actions;

export default memberSearchSlice.reducer;
