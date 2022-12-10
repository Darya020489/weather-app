import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, { payload }) {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      state.theme = nextTheme;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
