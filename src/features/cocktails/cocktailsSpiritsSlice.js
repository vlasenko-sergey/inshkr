import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktailsSpirits = createAsyncThunk(
  "cocktailsSpirits/fetchAll",
  async () => {
    const cocktailsSpirits = await CocktailsService.getSpirits();
    return cocktailsSpirits;
  }
);

const cocktailsSpiritsSlice = createSlice({
  name: "cocktailsSpirits",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchCocktailsSpirits.pending]: (state, action) => {},
    [fetchCocktailsSpirits.fulfilled]: (state, action) => action.payload,
    [fetchCocktailsSpirits.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default cocktailsSpiritsSlice.reducer;
