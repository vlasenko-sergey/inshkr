import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomCocktailsService from "../../services/customCocktailsService";

export const fetchCustomCocktailById = createAsyncThunk(
  "customCocktail/fetchById",
  async (id) => {
    const cocktail = await CustomCocktailsService.getCustomCocktail(id);
    return cocktail;
  }
);

const initialState = { item: null, isPending: false, isCreated: false };

const customCocktailSlice = createSlice({
  name: "customCocktail",
  initialState: initialState,
  reducers: {
    resetCustomCocktail: (state, action) => initialState,
  },
  extraReducers: {
    [fetchCustomCocktailById.pending]: (state, action) => ({
      isPending: true,
      item: null,
    }),
    [fetchCustomCocktailById.fulfilled]: (state, action) => ({
      item: action.payload,
      isPending: false,
    }),
    [fetchCustomCocktailById.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export const { resetCustomCocktail } = customCocktailSlice.actions;

export default customCocktailSlice.reducer;
