import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchSpirits = createAsyncThunk("spirits/fetchAll", async () => {
  const spirits = await CocktailsService.getSpirits();
  return spirits;
});

const spiritsSlice = createSlice({
  name: "spirits",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchSpirits.pending]: (state, action) => {},
    [fetchSpirits.fulfilled]: (state, action) => action.payload,
    [fetchSpirits.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default spiritsSlice.reducer;
