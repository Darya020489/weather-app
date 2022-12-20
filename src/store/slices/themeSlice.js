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
      localStorage.setItem("theme", state.theme);
    },
    setTheme(state, { payload }) {
      state.theme = payload;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme, setTheme } = themeSlice.actions;
