import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSmall: true,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    changeSize(state, { payload }) {
      state.isSmall = !state.isSmall;
      localStorage.setItem("mapSize", JSON.stringify(state.isSmall));
    },
    setSize(state, { payload }) {
      state.isSmall = payload;
      localStorage.setItem("mapSize", JSON.stringify(state.isSmall));
    },
  },
});

export default mapSlice.reducer;
export const { changeSize, setSize } = mapSlice.actions;
