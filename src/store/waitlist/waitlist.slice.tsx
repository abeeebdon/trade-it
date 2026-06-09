import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  beta: false,
  modalDetails: { email: '', role: '' },
};

const waitlist = createSlice({
  name: 'beta',
  initialState: initialState,
  reducers: {
    setBeta(state, action) {
      state.beta = action.payload;
    },
    setWaitlistModalDetails(state, action) {
      state.modalDetails = action.payload;
    },
  },
});

export const { setBeta, setWaitlistModalDetails } = waitlist.actions;
export const waitlistReducer = waitlist.reducer;
