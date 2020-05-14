import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const fetchIngredientsProperties = createAsyncThunk(
  "ingredientsProperties/fetchAll",
  async () => {
    const properties = await IngredientsService.getItemProperties();
    return properties;
  }
);

const initialState = {
  pending: false,
  items: { groups: [], spirits: [], tastes: [] },
};

const ingredientsPropertiesSlice = createSlice({
  name: "ingredientsProperties",
  initialState: initialState,
  reducers: {
    resetIngredients: (state, action) => initialState,
  },
  extraReducers: {
    [fetchIngredientsProperties.pending]: (state, action) => ({
      items: {...initialState.items},
      isPending: true,
    }),
    [fetchIngredientsProperties.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchIngredientsProperties.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export default ingredientsPropertiesSlice.reducer;
