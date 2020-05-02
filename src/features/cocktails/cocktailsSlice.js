import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchAll",
  async (searchParams) => {
    const cocktails = await CocktailsService.getCocktails(searchParams);
    return cocktails;
  }
);

const initialState = { items: [], isPending: false };

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState: initialState,
  reducers: {
    resetCocktails: (state, action) => initialState,
  },
  extraReducers: {
    [fetchCocktails.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [fetchCocktails.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchCocktails.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export const { resetCocktails } = cocktailsSlice.actions;

export default cocktailsSlice.reducer;
