import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UsersService from "../../services/usersService";

export const fetchUser = createAsyncThunk("user/fetchAll", async () => {
  const user = await UsersService.getUser();
  return user;
});

const initialState = { item: null };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUser: (state, action) => initialState,
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => ({
      item: null,
    }),
    [fetchUser.fulfilled]: (state, action) => ({
      item: action.payload,
    }),
    [fetchUser.rejected]: (state, action) => ({}),
  },
});

export const { resetUsers } = userSlice.actions;

export default userSlice.reducer;
