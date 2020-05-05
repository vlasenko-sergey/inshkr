import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const fetchIngredientById = createAsyncThunk(
  "ingredient/fetchById",
  async (id) => {
    const ingredient = await IngredientsService.getIngredientById(id);
    return ingredient;
  }
);

const initialState = { item: null, isPending: false };

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: initialState,
  reducers: {
    resetIngredient: (state, action) => initialState,
  },
  extraReducers: {
    [fetchIngredientById.pending]: (state, action) => ({
      item: null,
      isPending: true,
    }),
    [fetchIngredientById.fulfilled]: (state, action) => ({
      item: action.payload,
      isPending: false,
    }),
    [fetchIngredientById.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export const { resetIngredient } = ingredientSlice.actions;

export default ingredientSlice.reducer;
