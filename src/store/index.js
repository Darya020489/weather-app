import { configureStore } from "@reduxjs/toolkit";
import townListSlice from "./slices/townListSlice";
import themeSlice from "./slices/themeSlice";
import townWeatherSlice from "./slices/townWeatherSlice";

export const store = configureStore({
  reducer: {
    townList: townListSlice,
    theme: themeSlice,
    townWeather: townWeatherSlice,
  },
});
