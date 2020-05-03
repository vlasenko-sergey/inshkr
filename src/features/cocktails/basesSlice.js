import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchBases = createAsyncThunk("bases/fetchAll", async () => {
  const bases = await CocktailsService.getBases();
  return bases;
});

const basesSlice = createSlice({
  name: "bases",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchBases.pending]: (state, action) => {},
    [fetchBases.fulfilled]: (state, action) => action.payload,
    [fetchBases.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default basesSlice.reducer;
