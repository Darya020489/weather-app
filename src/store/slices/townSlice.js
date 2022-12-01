import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  measure: "°C",
};

const townSlice = createSlice({
  name: "townList",
  initialState,
  reducers: {
    changeMeasure(state, { payload }) {
      state.measure = payload;
    },
  },
});

export default townSlice.reducer;
export const { changeMeasure } = townSlice.actions;
