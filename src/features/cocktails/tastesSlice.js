import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchTastes = createAsyncThunk("tastes/fetchAll", async () => {
  const tastes = await CocktailsService.getTastes();
  return tastes;
});

const tastesSlice = createSlice({
  name: "tastes",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchTastes.pending]: (state, action) => {},
    [fetchTastes.fulfilled]: (state, action) => action.payload,
    [fetchTastes.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default tastesSlice.reducer;
