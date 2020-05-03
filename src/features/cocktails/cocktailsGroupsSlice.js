import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktailsGroups = createAsyncThunk(
  "cocktailsGroups/fetchAll",
  async () => {
    const cocktailsGroups = await CocktailsService.getGroups();
    return cocktailsGroups;
  }
);

const cocktailsGroupsSlice = createSlice({
  name: "groups",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchCocktailsGroups.pending]: (state, action) => {},
    [fetchCocktailsGroups.fulfilled]: (state, action) => action.payload,
    [fetchCocktailsGroups.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default cocktailsGroupsSlice.reducer;
