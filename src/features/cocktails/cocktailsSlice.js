import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchAll",
  async (searchParams) => {
    const cocktails = await CocktailsService.getCocktails(searchParams);
    return cocktails;
  }
);

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchCocktails.pending]: (state, action) => {},
    [fetchCocktails.fulfilled]: (state, action) => action.payload,
    [fetchCocktails.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default cocktailsSlice.reducer;
