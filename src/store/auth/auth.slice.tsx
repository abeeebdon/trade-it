import { InitialAuthStateType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { saveCookie } from './cookies';

const initialAuthState: InitialAuthStateType = {
  isAuth: false,
  user: null,
  authRole: null,
  userRole: null,
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
      if (state.user) {
        state.user.role = action.payload;
      }
      state.authRole = action.payload;
      saveCookie('role', action.payload);
    },
    // This is a new reducer to set the user role in the register and getstarted pages
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
  },
});

export const { login, logout, setUser, setAuthRole, setUserRole } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
