import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UsersService from "../../services/usersService";

export const fetchUser = createAsyncThunk("user/fetchAll", async () => {
  const user = await UsersService.getUser();
  return user;
});

const initialState = { item: null, notAuthed: false };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUser: (state, action) => initialState,
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => ({
      item: null,
      notAuthed: false,
    }),
    [fetchUser.fulfilled]: (state, action) => ({
      item: action.payload,
      notAuthed: false,
    }),
    [fetchUser.rejected]: (state, action) => ({
      item: null,
      notAuthed: true,
    }),
  },
});

export const { resetUsers } = userSlice.actions;

export default userSlice.reducer;
