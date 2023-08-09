import { createSlice } from "@reduxjs/toolkit";

const memberFilterSlice = createSlice({
  name: "MemberFilterSlice",
  initialState: {
    storedFilters: {},
  },
  reducers: {
    memberFilterStore: (state, action) => {
      state.storedFilters = action.payload.storedFilters;
      
    },
  },
});
export const { memberFilterStore } = memberFilterSlice.actions;

export default memberFilterSlice.reducer;
