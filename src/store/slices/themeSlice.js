import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, { payload }) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
