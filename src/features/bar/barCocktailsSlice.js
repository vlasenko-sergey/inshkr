import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BarService from "../../services/barService";

export const fetchBarCocktails = createAsyncThunk(
  "bar/cocktails/fetchAll",
  async () => {
    const cocktails = await BarService.getCocktails();
    return cocktails;
  }
);

const initialState = { items: [], isPending: false };

const barCocktailsSlice = createSlice({
  name: "bar/cocktails",
  initialState: initialState,
  reducers: {
    resetBarCocktails: (state, action) => initialState,
  },
  extraReducers: {
    [fetchBarCocktails.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [fetchBarCocktails.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchBarCocktails.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export const { resetBarCocktails } = barCocktailsSlice.actions;

export default barCocktailsSlice.reducer;
