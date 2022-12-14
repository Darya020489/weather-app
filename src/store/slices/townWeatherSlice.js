import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherService from "../../services/weatherService";

const initialState = {
  weatherForecast: null,
  isLoading: true,
  error: "",
};

export const getWeatherByCoord = createAsyncThunk(
  "townWeather/getWeatherByCoord",
  async (coord, { rejectWithValue }) => {
    try {
      const result = await weatherService.getByCoord(coord);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      console.log(rejectWithValue(err));
      return rejectWithValue(err);
    }
  }
);

export const getWeatherByName = createAsyncThunk(
  "townWeather/getWeatherByName",
  async (name, { rejectWithValue }) => {
    try {
      const result = await weatherService.getByName(name);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      console.log(rejectWithValue(err));
      return rejectWithValue(err);
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

    [getWeatherByName.pending]: (state) => {
      state.isLoading = true;
    },
    [getWeatherByName.fulfilled]: (state, { payload }) => {
      state.weatherForecast = payload;
      state.isLoading = false;
    },
    [getWeatherByName.rejected]: (state, { payload }) => {
      state.error = payload.message;
    },
  },
});

export default townWeatherSlice.reducer;
