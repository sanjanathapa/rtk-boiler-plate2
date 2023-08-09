import { createSlice } from "@reduxjs/toolkit";

const savedFilterSlice = createSlice({
  name: "SavedFilterSlice",
  initialState: {
    storedFilterId:"",
  },
  reducers: {
    savedFilterStore: (state, action) => {
      state.storedFilterId = action.payload.selectedFilterId;
    },
  },
});
export const { savedFilterStore } = savedFilterSlice.actions;

export default savedFilterSlice.reducer;
