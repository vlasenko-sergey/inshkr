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

export const deleteParty = createAsyncThunk("party/delete", async (id) => {
  await PartiesService.deleteParty(id);
  return id;
});

export const updateParty = createAsyncThunk("party/update", async (party) => {
  const updatedParty = await PartiesService.updateParty(party);
  return updatedParty;
});

export const invite = createAsyncThunk(
  "party/invite",
  async ({ partyId, user }) => {
    await PartiesService.invite(partyId, user.id);
    return user;
  }
);

export const dismiss = createAsyncThunk(
  "party/dismiss",
  async ({ partyId, userId }) => {
    await PartiesService.dismiss(partyId, userId);
    return userId;
  }
);

const initialState = {
  item: null,
  isPending: false,
  isCreated: false,
  isDeletePending: false,
  deletedId: -1,
};

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
    [createParty.pending]: (state, action) => ({
      item: null,
      isPending: true,
    }),
    [createParty.fulfilled]: (state, action) => ({
      ...state,
      isPending: false,
      isCreated: true,
    }),
    [createParty.rejected]: (state, action) => ({
      ...state,
      isPending: false,
      isCreated: false,
    }),
    [updateParty.pending]: (state, action) => ({
      item: null,
      isPending: true,
    }),
    [updateParty.fulfilled]: (state, action) => ({
      ...state,
      isPending: false,
      isCreated: true,
    }),
    [updateParty.rejected]: (state, action) => ({
      ...state,
      isPending: false,
      isCreated: false,
    }),
    [deleteParty.pending]: (state, action) => ({
      ...state,
      isDeletePending: true,
    }),
    [deleteParty.fulfilled]: (state, action) => ({
      ...state,
      isDeletePending: false,
      deletedId: action.payload,
    }),
    [deleteParty.rejected]: (state, action) => ({
      ...state,
      isDeletePending: false,
    }),
    [invite.pending]: (state, action) => {},
    [invite.fulfilled]: (state, action) => {
      return {
        ...state,
        item: {
          ...state.item,
          members: [...state.item.members, action.payload],
        },
      };
    },
    [invite.rejected]: (state, action) => {},
    [dismiss.pending]: (state, action) => {},
    [dismiss.fulfilled]: (state, action) => {
      return {
        ...state,
        item: {
          ...state.item,
          members: state.item.members.filter(
            (member) => member.id !== action.payload
          ),
        },
      };
    },
    [dismiss.rejected]: (state, action) => {},
  },
});

export const { resetParty } = partySlice.actions;

export default partySlice.reducer;
