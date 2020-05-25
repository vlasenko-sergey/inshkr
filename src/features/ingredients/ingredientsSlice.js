import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async () => {
    const ingredients = await IngredientsService.getItems();
    return ingredients;
  }
);

export const createIngredient = createAsyncThunk(
  "ingredients/create",
  async (ingredient) => {
    await IngredientsService.createIngredient(ingredient);
  }
);

export const updateIngredient = createAsyncThunk(
  "ingredients/update",
  async (ingredient) => {
    await IngredientsService.updateIngredient(ingredient);
  }
);

export const deleteIngredient = createAsyncThunk(
  "ingredients/delete",
  async (id) => {
    await IngredientsService.deleteIngredient(id);
  }
);

const initialState = {
  isPending: false,
  items: null,
  isCreated: false,
  isDeleted: false,
  isDeletePending: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: initialState,
  reducers: {
    resetIngredients: (state, action) => initialState,
  },
  extraReducers: {
    [fetchIngredients.pending]: (state, action) => ({
      items: null,
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
    [createIngredient.pending]: (state, action) => ({
      isCreated: false,
      isPending: true,
    }),
    [createIngredient.fulfilled]: (state, action) => ({
      isCreated: true,
      isPending: false,
    }),
    [createIngredient.rejected]: (state, action) => ({
      isCreated: true,
      isPending: false,
    }),
    [updateIngredient.pending]: (state, action) => ({
      isCreated: false,
      isPending: true,
    }),
    [updateIngredient.fulfilled]: (state, action) => ({
      isCreated: true,
      isPending: false,
    }),
    [updateIngredient.rejected]: (state, action) => ({
      isCreated: false,
      isPending: false,
    }),
    [deleteIngredient.pending]: (state, action) => ({
      isDeleted: false,
      isPending: true,
      isDeletePending: true,
    }),
    [deleteIngredient.fulfilled]: (state, action) => ({
      isDeleted: true,
      isPending: false,
      isDeletePending: false,
    }),
    [deleteIngredient.rejected]: (state, action) => ({
      isDeleted: false,
      isPending: false,
      isDeletePending: false,
    }),
  },
});

export const { resetIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
