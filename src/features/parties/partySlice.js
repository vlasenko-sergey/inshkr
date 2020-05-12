import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PartiesService from "../../services/partiesService";

export const fetchParty = createAsyncThunk("party/fetchById", async (id) => {
  const party = await PartiesService.getParty(id);
  return party;
});

export const createParty = createAsyncThunk("party/create", async (party) => {
  const createdParty = await PartiesService.createParty(party);
  return createdParty;
});

const initialState = { item: null, isPending: false };

const partySlice = createSlice({
  name: "party",
  initialState: initialState,
  reducers: {
    resetParty: (state, action) => initialState,
  },
  extraReducers: {
    [fetchParty.pending]: (state, action) => ({
      item: null,
      isPending: true,
    }),
    [fetchParty.fulfilled]: (state, action) => ({
      item: action.payload,
      isPending: false,
    }),
    [fetchParty.rejected]: (state, action) => ({
      ...state,
      isPending: false,
    }),
    [createParty.pending]: (state, action) => null,
    [createParty.fulfilled]: (state, action) => null,
    [createParty.rejected]: (state, action) => null,
  },
});

export const { resetParty } = partySlice.actions;

export default partySlice.reducer;
