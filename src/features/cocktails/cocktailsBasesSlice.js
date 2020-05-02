import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktailsBases = createAsyncThunk(
  "cocktailsBases/fetchAll",
  async () => {
    const bases = await CocktailsService.getBases();
    return bases;
  }
);

const cocktailsBasesSlice = createSlice({
  name: "cocktailsBases",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchCocktailsBases.pending]: (state, action) => {},
    [fetchCocktailsBases.fulfilled]: (state, action) => action.payload,
    [fetchCocktailsBases.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default cocktailsBasesSlice.reducer;
