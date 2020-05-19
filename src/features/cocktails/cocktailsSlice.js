import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchAll",
  async () => {
    const cocktails = await CocktailsService.getCocktails();
    return cocktails;
  }
);

export const searchCocktails = createAsyncThunk(
  "cocktails/fetchAll",
  async (searchParams) => {
    const cocktails = await CocktailsService.searchCocktails(searchParams);
    return cocktails;
  }
);

export const addCocktail = createAsyncThunk(
  "cocktails/add",
  async (cocktail) => {
    await CocktailsService.createCocktail(cocktail);
  }
);

export const updateCocktail = createAsyncThunk(
  "cocktails/update",
  async (cocktail) => {
    await CocktailsService.updateCocktail(cocktail);
  }
);

export const deleteCocktail = createAsyncThunk(
  "cocktails/delete",
  async (id) => {
    await CocktailsService.deleteCocktail(id);
  }
);

const initialState = { items: [], isPending: false, isDeleted: false };

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState: initialState,
  reducers: {
    resetCocktails: (state, action) => initialState,
  },
  extraReducers: {
    [fetchCocktails.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [fetchCocktails.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchCocktails.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
    [searchCocktails.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [searchCocktails.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [searchCocktails.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
    [addCocktail.pending]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: true,
    }),
    [addCocktail.fulfilled]: (state, action) => ({
      ...state,
      isCreated: true,
      isPending: false,
    }),
    [addCocktail.rejected]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: false,
    }),
    [updateCocktail.pending]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: true,
    }),
    [updateCocktail.fulfilled]: (state, action) => ({
      ...state,
      isCreated: true,
      isPending: false,
    }),
    [updateCocktail.rejected]: (state, action) => ({
      ...state,
      isCreated: false,
      isPending: false,
    }),
    [deleteCocktail.pending]: (state, action) => ({
      ...state,
      isDeleted: false,
      isPending: true,
    }),
    [deleteCocktail.fulfilled]: (state, action) => ({
      ...state,
      isDeleted: true,
      isPending: false,
    }),
    [deleteCocktail.rejected]: (state, action) => ({
      ...state,
      isDeleted: false,
      isPending: false,
    }),
  },
});

export const { resetCocktails } = cocktailsSlice.actions;

export default cocktailsSlice.reducer;
