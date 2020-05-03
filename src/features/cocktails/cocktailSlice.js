import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktailById = createAsyncThunk(
  "cocktail/fetchById",
  async (id) => {
    const cocktail = await CocktailsService.getCocktailById(id);
    return cocktail;
  }
);

const cocktailsSlice = createSlice({
  name: "cocktail",
  initialState: null,
  reducers: {},
  extraReducers: {
    [fetchCocktailById.pending]: (state, action) => {},
    [fetchCocktailById.fulfilled]: (state, action) => action.payload,
    [fetchCocktailById.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default cocktailsSlice.reducer;
