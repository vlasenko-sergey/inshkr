import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IngredientsService from "../../services/ingredientsService";

export const fetchIngredientssGroups = createAsyncThunk(
  "ingredientsGroups/fetchAll",
  async () => {
    const ingredientsGroups = await IngredientsService.getGroups();
    return ingredientsGroups;
  }
);

const ingredientsGroupsSlice = createSlice({
  name: "ingredientsGroups",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchIngredientssGroups.pending]: (state, action) => {},
    [fetchIngredientssGroups.fulfilled]: (state, action) => action.payload,
    [fetchIngredientssGroups.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default ingredientsGroupsSlice.reducer;
