import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (searchParams) => {
    const ingredients = await IngredientsService.getIngredients(searchParams);
    return ingredients;
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchIngredients.pending]: (state, action) => {},
    [fetchIngredients.fulfilled]: (state, action) => action.payload,
    [fetchIngredients.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default ingredientsSlice.reducer;
