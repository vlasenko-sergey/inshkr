import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PartiesService from "../../services/partiesService";

export const fetchParties = createAsyncThunk("parties/fetchAll", async () => {
  const parties = await PartiesService.getParties();
  return parties;
});

const initialState = { items: [], isPending: false };

const partiesSlice = createSlice({
  name: "parties",
  initialState: initialState,
  reducers: {
    resetParties: (state, action) => initialState,
    deletePartyFromList: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index > -1) {
        const items = state.items;
        items.splice(index, 1);
        state.items = [...items];
      }
      return state;
    } 
  },
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

export const { resetParties, deletePartyFromList } = partiesSlice.actions;

export default partiesSlice.reducer;
