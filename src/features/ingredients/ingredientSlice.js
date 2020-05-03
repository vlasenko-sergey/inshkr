import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const fetchIngredientById = createAsyncThunk(
  "ingredient/fetchById",
  async (id) => {
    const ingredient = await IngredientsService.getIngredientById(id);
    return ingredient;
  }
);

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: null,
  reducers: {},
  extraReducers: {
    [fetchIngredientById.pending]: (state, action) => {},
    [fetchIngredientById.fulfilled]: (state, action) => action.payload,
    [fetchIngredientById.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default ingredientSlice.reducer;
