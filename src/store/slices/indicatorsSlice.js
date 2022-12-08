import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  measure: "°C",
};

const indicatorsSlice = createSlice({
  name: "indicators",
  initialState,
  reducers: {
    changeMeasure(state, { payload }) {
      state.measure = payload;
    },
  },
});

export default indicatorsSlice.reducer;
export const { changeMeasure } = indicatorsSlice.actions;
