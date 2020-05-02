import { combineReducers } from "@reduxjs/toolkit";
import cocktails from "../features/cocktails/cocktailsSlice";

const rootReducer = combineReducers({ cocktails });

export default rootReducer;
