import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktailById = createAsyncThunk(
  "cocktail/fetchById",
  async (id) => {
    const cocktail = await CocktailsService.getCocktailById(id);
    return cocktail;
  }
);

const initialState = { item: null, isPending: false };

const cocktailSlice = createSlice({
  name: "cocktail",
  initialState: initialState,
  reducers: {
    resetCocktail: (state, action) => initialState,
  },
  extraReducers: {
    [fetchCocktailById.pending]: (state, action) => ({
      isPending: true,
      item: null,
    }),
    [fetchCocktailById.fulfilled]: (state, action) => ({
      item: action.payload,
      isPending: false,
    }),
    [fetchCocktailById.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export const { resetCocktail } = cocktailSlice.actions;

export default cocktailSlice.reducer;
