import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BarService from "../../services/barService";

export const fetchBarIngredients = createAsyncThunk(
  "bar/ingredients/fetchAll",
  async () => {
    const ingredients = await BarService.getIngredients();
    return ingredients;
  }
);

const initialState = { items: [], isPending: false };

const barIngredientsSlice = createSlice({
  name: "bar/ingredients",
  initialState: initialState,
  extraReducers: {
    [fetchBarIngredients.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [fetchBarIngredients.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchBarIngredients.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export default barIngredientsSlice.reducer;
