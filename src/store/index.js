import { configureStore } from "@reduxjs/toolkit";
import townSlice from "./slices/townSlice";
import themeSlice from "./slices/themeSlice";

export const store = configureStore({
  reducer: { townList: townSlice, theme: themeSlice },
});
