import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  measure: "°C",
};

const townListSlice = createSlice({
  name: "townList",
  initialState,
  reducers: {
    changeMeasure(state, { payload }) {
      state.measure = payload;
    },
  },
});

export default townListSlice.reducer;
export const { changeMeasure } = townListSlice.actions;
