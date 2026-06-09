import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  beta: false,
};

const waitlist = createSlice({
  name: 'beta',
  initialState: initialAuthState,
  reducers: {
    setBeta(state, action) {
      state.beta = action.payload;
    },
  },
});

export const { setBeta } = waitlist.actions;
export const waitlistReducer = waitlist.reducer;
