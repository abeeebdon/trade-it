import { InitialAuthStateType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState: InitialAuthStateType = {
  isAuth: false,
  user: null,
  authRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthRole(state, action) {
      state.authRole = action.payload;
    },
  },
});

export const { login, logout, setUser, setAuthRole } = authSlice.actions;
export const authReducer = authSlice.reducer;
