import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservations: [],
  loading: false,
  error: null,
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    fetchReservationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReservationsSuccess: (state, action) => {
      state.loading = false;
      state.reservations = action.payload;
    },
    fetchReservationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchReservationsStart,
  fetchReservationsSuccess,
  fetchReservationsFailure,
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
