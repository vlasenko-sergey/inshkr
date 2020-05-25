import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TablewaresService from "../../services/tablewareService";

export const fetchTablewareById = createAsyncThunk(
  "tableware/fetchById",
  async (id) => {
    const tableware = await TablewaresService.getTablewareById(id);
    return tableware;
  }
);

export const createTableware = createAsyncThunk(
  "tableware/create",
  async (ingredient) => {
    await TablewaresService.createTableware(ingredient);
  }
);

export const updateTableware = createAsyncThunk(
  "tableware/update",
  async (ingredient) => {
    await TablewaresService.updateTableware(ingredient);
  }
);

export const deleteTableware = createAsyncThunk(
  "tableware/delete",
  async (id) => {
    await TablewaresService.deleteTableware(id);
  }
);

const initialState = {
  isPending: false,
  item: null,
  isCreated: false,
  isDeleted: false,
  isDeletePending: false,
};

const tablewareSlice = createSlice({
  name: "tableware",
  initialState: initialState,
  reducers: {
    resetTablewares: (state, action) => initialState,
  },
  extraReducers: {
    [fetchTablewareById.pending]: (state, action) => ({
      item: null,
      isPending: true,
    }),
    [fetchTablewareById.fulfilled]: (state, action) => ({
      item: action.payload,
      isPending: false,
    }),
    [fetchTablewareById.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
    [createTableware.pending]: (state, action) => ({
      isCreated: false,
      isPending: true,
    }),
    [createTableware.fulfilled]: (state, action) => ({
      isCreated: true,
      isPending: false,
    }),
    [createTableware.rejected]: (state, action) => ({
      isCreated: true,
      isPending: false,
    }),
    [updateTableware.pending]: (state, action) => ({
      isCreated: false,
      isPending: true,
    }),
    [updateTableware.fulfilled]: (state, action) => ({
      isCreated: true,
      isPending: false,
    }),
    [updateTableware.rejected]: (state, action) => ({
      isCreated: false,
      isPending: false,
    }),
    [deleteTableware.pending]: (state, action) => ({
      isDeleted: false,
      isPending: true,
      isDeletePending: true,
    }),
    [deleteTableware.fulfilled]: (state, action) => ({
      isDeleted: true,
      isPending: false,
      isDeletePending: false,
    }),
    [deleteTableware.rejected]: (state, action) => ({
      isDeleted: false,
      isPending: false,
      isDeletePending: false,
    }),
  },
});

export const { resetTablewares } = tablewareSlice.actions;

export default tablewareSlice.reducer;
