import { combineReducers } from "redux";

import api from "api";
import LoginSlice from "slices/loginSlice";
import MemberFilterSlice from "slices/memberFilterSlice";
import MemberSearchSlice from "slices/memberSearchSlice";
import SavedFilterSlice from "slices/savedFilterSlice";
import MemberSlice from "slices/memberSlice";

const rootReducer = combineReducers({
  LoginSlice,
  MemberFilterSlice,
  MemberSearchSlice,
  SavedFilterSlice,
  MemberSlice,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
