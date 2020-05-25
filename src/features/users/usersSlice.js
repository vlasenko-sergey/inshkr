import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UsersService from "../../services/usersService";

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const users = await UsersService.getUsers();
  return users;
});

const initialState = { items: null };

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    resetUsers: (state, action) => initialState,
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => ({
      items: null,
    }),
    [fetchUsers.fulfilled]: (state, action) => ({
      items: action.payload,
    }),
    [fetchUsers.rejected]: (state, action) => ({}),
  },
});

export const { resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
