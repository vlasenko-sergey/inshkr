import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchCocktailsProperties = createAsyncThunk(
  "cocktailsProperties/fetchAll",
  async () => {
    const properties = await CocktailsService.getCocktailsProperties();
    return properties;
  }
);

const initialState = {
  pending: false,
  items: { groups: [], spirits: [], tastes: [], bases: [] },
};

const cocktailsPropertiesSlice = createSlice({
  name: "cocktailsProperties",
  initialState: initialState,
  reducers: {
    resetIngredients: (state, action) => initialState,
  },
  extraReducers: {
    [fetchCocktailsProperties.pending]: (state, action) => ({
      items: { ...initialState.items },
      isPending: true,
    }),
    [fetchCocktailsProperties.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchCocktailsProperties.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export default cocktailsPropertiesSlice.reducer;
