import { configureStore } from "@reduxjs/toolkit";
import indicatorsSlice from "./slices/indicatorsSlice";
import themeSlice from "./slices/themeSlice";
import townWeatherSlice from "./slices/townWeatherSlice";
import errorsSlice from "./slices/errorsSlice";

export const store = configureStore({
  reducer: {
    indicators: indicatorsSlice,
    theme: themeSlice,
    townWeather: townWeatherSlice,
    errors: errorsSlice,
  },
});
