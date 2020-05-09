import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const searchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (params) => {
    const ingredients = await IngredientsService.searchItems(params);
    return ingredients;
  }
);

const initialState = { pending: false, items: [] };

const searchIngredientsSlice = createSlice({
  name: "searchIngredients",
  initialState: initialState,
  reducers: {
    resetSearchIngredients: (state, action) => initialState,
  },
  extraReducers: {
    [searchIngredients.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [searchIngredients.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [searchIngredients.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export const { resetSearchIngredients } = searchIngredientsSlice.actions;

export default searchIngredientsSlice.reducer;
