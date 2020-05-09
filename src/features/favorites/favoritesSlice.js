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

const initialState = { items: [], isPending: false };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialState,
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
  },
});

export default favoritesSlice.reducer;
