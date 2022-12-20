import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputError: "",
  text: {
    emptyEnter: "Enter the name of the city",
    alreadyExists: "Such a city already exists",
  },
};

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    changeError(state, { payload }) {
      state.inputError = state.text[payload];
    },
  },
});

export default errorsSlice.reducer;
export const { changeError } = errorsSlice.actions;
