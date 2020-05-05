import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (searchParams) => {
    const ingredients = await IngredientsService.getIngredients(searchParams);
    return ingredients;
  }
);

const initialState = { pending: false, items: [] };

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: initialState,
  reducers: {
    resetIngredients: (state, action) => initialState,
  },
  extraReducers: {
    [fetchIngredients.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [fetchIngredients.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchIngredients.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export const { resetIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
