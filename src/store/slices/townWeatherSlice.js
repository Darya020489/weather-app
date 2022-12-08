import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherService from "../../services/weatherService";

const initialState = {
  weatherForecast: null,
  isLoading: true,
  error: "",
};

export const getWeatherByCoord = createAsyncThunk(
  "town/getWeatherByCoord",
  async (coord, { rejectWithWalue }) => {
    try {
      const result = await weatherService.getByCoord(coord);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      console.log(rejectWithWalue(err));
      return rejectWithWalue(err);
    }
  }
);

const townWeatherSlice = createSlice({
  name: "townWeather",
  initialState,
  reducers: {},
  extraReducers: {
    [getWeatherByCoord.pending]: (state) => {
      state.isLoading = true;
    },
    [getWeatherByCoord.fulfilled]: (state, { payload }) => {
      state.weatherForecast = payload;
      state.isLoading = false;
    },
    [getWeatherByCoord.rejected]: (state, { payload }) => {
      state.error = payload.message;
    },
  },
});

export default townWeatherSlice.reducer;
