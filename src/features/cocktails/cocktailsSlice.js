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
  initialState: { items: [], isPending: false },
  reducers: {},
  extraReducers: {
    [fetchCocktails.pending]: (state, action) => ({ items: [], isPending: true }),
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

export default cocktailsSlice.reducer;
