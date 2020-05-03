import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const fetchIngredientsSpirits = createAsyncThunk(
  "ingredientsSpirits/fetchAll",
  async () => {
    const ingredientsSpirits = await IngredientsService.getSpirits();
    return ingredientsSpirits;
  }
);

const ingredientsSpiritsSlice = createSlice({
  name: "ingredientsSpirits",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchIngredientsSpirits.pending]: (state, action) => {},
    [fetchIngredientsSpirits.fulfilled]: (state, action) => action.payload,
    [fetchIngredientsSpirits.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default ingredientsSpiritsSlice.reducer;
