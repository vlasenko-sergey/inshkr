import { combineReducers } from "@reduxjs/toolkit";
import cocktails from "../features/cocktails/cocktailsSlice";
import cocktail from "../features/cocktails/cocktailSlice";
import bases from "../features/cocktails/basesSlice";
import tastes from "../features/cocktails/tastesSlice";
import spirits from "../features/cocktails/spiritsSlice";
import groups from "../features/cocktails/groupsSlice";

const rootReducer = combineReducers({
  cocktails,
  cocktail,
  bases,
  tastes,
  spirits,
  groups,
});

export default rootReducer;
