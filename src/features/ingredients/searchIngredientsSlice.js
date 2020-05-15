import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

const TABLEWARE_GROUP_ID = 12;
const GARNISH_GROUP_ID = 10;

export const searchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (params) => {
    const ingredients = await IngredientsService.searchItems(params);
    return ingredients;
  }
);

export const searchIngredientsTablewareAndGarnish = createAsyncThunk(
  "ingredients/fetchTablewareAndGarnish",
  async () => {
    const tableware = await IngredientsService.searchItems({
      group: TABLEWARE_GROUP_ID,
    });
    const garnish = await IngredientsService.searchItems({
      group: GARNISH_GROUP_ID,
    });
    return { tableware: [...tableware], garnish: [...garnish] };
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
    [searchIngredientsTablewareAndGarnish.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [searchIngredientsTablewareAndGarnish.fulfilled]: (state, action) => ({
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
