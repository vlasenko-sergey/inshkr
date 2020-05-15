import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomCocktailsService from "../../services/customCocktailsService";

export const fetchCustomCocktails = createAsyncThunk(
  "customCocktails/fetchAll",
  async () => {
    const cocktails = await CustomCocktailsService.getCustomCocktails();
    return cocktails;
  }
);

export const addCustomCocktail = createAsyncThunk(
  "customCocktails/add",
  async (cocktail) => {
    await CustomCocktailsService.addCustomCocktail(cocktail);
  }
);

export const updateCustomCocktail = createAsyncThunk(
  "customCocktails/update",
  async (cocktail) => {
    await CustomCocktailsService.updateCustomCocktail(cocktail);
  }
);

export const deleteCustomCocktail = createAsyncThunk(
  "customCocktails/delete",
  async (cocktail) => {
    await CustomCocktailsService.deleteCustomCocktail(cocktail);
  }
);

const initialState = { items: null, isPending: false, isCreated: false, isDeleted: false };

const customCocktailsSlice = createSlice({
  name: "customCocktails",
  initialState: initialState,
  reducers: {
    resetCustomCocktails: (state, action) => initialState,
  },
  extraReducers: {
    [fetchCustomCocktails.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [fetchCustomCocktails.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchCustomCocktails.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
    [addCustomCocktail.pending]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: true,
    }),
    [addCustomCocktail.fulfilled]: (state, action) => ({
      ...state,
      isCreated: true,
      isPending: false,
    }),
    [addCustomCocktail.rejected]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: false,
    }),
    [updateCustomCocktail.pending]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: true,
    }),
    [updateCustomCocktail.fulfilled]: (state, action) => ({
      ...state,
      isCreated: true,
      isPending: false,
    }),
    [updateCustomCocktail.rejected]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: false,
    }),
    [deleteCustomCocktail.pending]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: true,
      isDeleted: false,
    }),
    [deleteCustomCocktail.fulfilled]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: false,
      isDeleted: true,
    }),
    [deleteCustomCocktail.rejected]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: false,
      isDeleted: false,
    }),
  },
});

export const { resetCustomCocktails } = customCocktailsSlice.actions;

export default customCocktailsSlice.reducer;
