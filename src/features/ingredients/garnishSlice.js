import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GarnishsService from "../../services/garnishService";

export const fetchGarnishById = createAsyncThunk(
  "garnish/fetchById",
  async (id) => {
    const garnish = await GarnishsService.getGarnishById(id);
    return garnish;
  }
);

export const createGarnish = createAsyncThunk(
  "garnish/create",
  async (ingredient) => {
    await GarnishsService.createGarnish(ingredient);
  }
);

export const updateGarnish = createAsyncThunk(
  "garnish/update",
  async (ingredient) => {
    await GarnishsService.updateGarnish(ingredient);
  }
);

export const deleteGarnish = createAsyncThunk("garnish/delete", async (id) => {
  await GarnishsService.deleteGarnish(id);
});

const initialState = {
  isPending: false,
  item: null,
  isCreated: false,
  isDeleted: false,
  isDeletePending: false,
};

const garnishSlice = createSlice({
  name: "garnish",
  initialState: initialState,
  reducers: {
    resetGarnishs: (state, action) => initialState,
  },
  extraReducers: {
    [fetchGarnishById.pending]: (state, action) => ({
      item: null,
      isPending: true,
    }),
    [fetchGarnishById.fulfilled]: (state, action) => ({
      item: action.payload,
      isPending: false,
    }),
    [fetchGarnishById.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
    [createGarnish.pending]: (state, action) => ({
      isCreated: false,
      isPending: true,
    }),
    [createGarnish.fulfilled]: (state, action) => ({
      isCreated: true,
      isPending: false,
    }),
    [createGarnish.rejected]: (state, action) => ({
      isCreated: true,
      isPending: false,
    }),
    [updateGarnish.pending]: (state, action) => ({
      isCreated: false,
      isPending: true,
    }),
    [updateGarnish.fulfilled]: (state, action) => ({
      isCreated: true,
      isPending: false,
    }),
    [updateGarnish.rejected]: (state, action) => ({
      isCreated: false,
      isPending: false,
    }),
    [deleteGarnish.pending]: (state, action) => ({
      isDeleted: false,
      isPending: true,
      isDeletePending: true,
    }),
    [deleteGarnish.fulfilled]: (state, action) => ({
      isDeleted: true,
      isPending: false,
      isDeletePending: false,
    }),
    [deleteGarnish.rejected]: (state, action) => ({
      isDeleted: false,
      isPending: false,
      isDeletePending: false,
    }),
  },
});

export const { resetGarnishs } = garnishSlice.actions;

export default garnishSlice.reducer;
