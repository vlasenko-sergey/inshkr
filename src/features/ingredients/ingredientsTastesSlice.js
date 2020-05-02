import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const fetchIngredientsTastes = createAsyncThunk(
  "ingredientsTastes/fetchAll",
  async () => {
    const ingredientsTastes = await IngredientsService.getTastes();
    return ingredientsTastes;
  }
);

const ingredientsTastesSlice = createSlice({
  name: "ingredientsTastes",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchIngredientsTastes.pending]: (state, action) => {},
    [fetchIngredientsTastes.fulfilled]: (state, action) => action.payload,
    [fetchIngredientsTastes.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default ingredientsTastesSlice.reducer;
