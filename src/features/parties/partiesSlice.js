import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PartiesService from "../../services/partiesService";

export const fetchParties = createAsyncThunk(
  "parties/fetchAll",
  async () => {
    const parties = await PartiesService.getParties();
    return parties;
  }
);

const initialState = { items: [], isPending: false };

const partiesSlice = createSlice({
  name: "parties",
  initialState: initialState,
  extraReducers: {
    [fetchParties.pending]: (state, action) => ({
      items: [],
      isPending: true,
    }),
    [fetchParties.fulfilled]: (state, action) => ({
      items: action.payload,
      isPending: false,
    }),
    [fetchParties.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
  },
});

export default partiesSlice.reducer;
