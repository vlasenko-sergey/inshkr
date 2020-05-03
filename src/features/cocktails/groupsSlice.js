import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CocktailsService from "../../services/cocktailsService";

export const fetchGroups = createAsyncThunk("groups/fetchAll", async () => {
  const groups = await CocktailsService.getGroups();
  return groups;
});

const groupsSlice = createSlice({
  name: "groups",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchGroups.pending]: (state, action) => {},
    [fetchGroups.fulfilled]: (state, action) => action.payload,
    [fetchGroups.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default groupsSlice.reducer;
