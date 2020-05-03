import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktailsTastes = createAsyncThunk(
  "cocktailsTastes/fetchAll",
  async () => {
    const cocktailsTastes = await CocktailsService.getTastes();
    return cocktailsTastes;
  }
);

const cocktailsTastesSlice = createSlice({
  name: "cocktailsTastes",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchCocktailsTastes.pending]: (state, action) => {},
    [fetchCocktailsTastes.fulfilled]: (state, action) => action.payload,
    [fetchCocktailsTastes.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default cocktailsTastesSlice.reducer;
