import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BarService from "../../services/barService";

export const fetchBarIngredients = createAsyncThunk(
  "bar/ingredients/fetchAll",
  async () => {
    const ingredients = await BarService.getIngredients();
    return ingredients;
  }
);

export const addIngredientToBar = createAsyncThunk(
  "bar/ingredients/add",
  async (id) => {
    await BarService.addToBar(id);
  }
);

export const deleteIngredientFromBar = createAsyncThunk(
  "bar/ingredients/delete",
  async (id) => {
    BarService.deleteFromBar(id);
  }
);

const initialState = { items: null, isPending: false };

const barIngredientsSlice = createSlice({
  name: "bar/ingredients",
  initialState: initialState,
  reducers: {
    resetBarIngredients: (state, action) => initialState,
  },
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
    [addIngredientToBar.pending]: () => {},
    [addIngredientToBar.fulfilled]: () => {},
    [addIngredientToBar.rejected]: () => {},
    [deleteIngredientFromBar.pending]: () => {},
    [deleteIngredientFromBar.fulfilled]: () => {},
    [deleteIngredientFromBar.rejected]: () => {},
  },
});

export const { resetBarIngredients } = barIngredientsSlice.actions;

export default barIngredientsSlice.reducer;
