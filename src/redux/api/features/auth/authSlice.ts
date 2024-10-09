/* eslint-disable @typescript-eslint/no-explicit-any */

import { RootState } from "@/redux/store";
import { TUser } from "@/types/user.types";
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: TUser | null;
};

const initialState: TAuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRedux: (state, action) => {
      const { data } = action.payload;
      state.user = data;
    },
    logout:(state)=>{
      state.user=null
    }
  },
});

export const { setUserRedux ,logout} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
