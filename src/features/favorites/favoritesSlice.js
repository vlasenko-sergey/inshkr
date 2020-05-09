import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FavoriteService from "../../services/favoriteService";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",
  async () => {
    const favorites = await FavoriteService.getFavorites();
    return favorites;
  }
);

export const addToFavorites = createAsyncThunk("favorites/add", async (id) => {
  const favorites = await FavoriteService.addToFavorites(id);
  return favorites;
});

export const deleteFromFavorites = createAsyncThunk(
  "favorites/delete",
  async (id) => {
    await FavoriteService.deleteFromFavorites(id);
  }
);

const initialState = { items: [], isPending: false };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    resetFavorites: (state, action) => initialState,
  },
  extraReducers: {
    [fetchFavorites.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [fetchFavorites.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchFavorites.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
    [addToFavorites.pending]: () => {},
    [addToFavorites.fulfilled]: () => {},
    [addToFavorites.rejected]: () => {},
    [deleteFromFavorites.pending]: () => {},
    [deleteFromFavorites.fulfilled]: () => {},
    [deleteFromFavorites.rejected]: () => {},
  },
});

export const { resetFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
