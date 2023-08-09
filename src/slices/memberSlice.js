import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION } from "settings/constants/pagination";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;
const SCROLL_ORIGIN = 0;
const memberSlice = createSlice({
  name: "memberSlice",
  initialState: {
    pag: INITIAL_PAGE,
    rowPerPag: ROWS_PER_PAGE,
    storedScrollPosition: SCROLL_ORIGIN,
  },
  reducers: {
    memberStore: (state, action) => {
      state.pag = action.payload.page;
      state.rowPerPag = action.payload.rowsPerPage;
      state.storedScrollPosition = action.payload.storedScrollPosition;
    },
  },
});
export const { memberStore } = memberSlice.actions;

export default memberSlice.reducer;
