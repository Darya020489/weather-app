import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherService from "../../services/weatherService";

const initialState = {
  weatherForecast: null,
  isLoading: true,
  coordinates: null,
  townImage: null,
  isError: false,
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

export const getTownImage = createAsyncThunk(
  "townWeather/getTownImage",
  async (name, { rejectWithValue }) => {
    try {
      const result = await weatherService.getImageByName(name);
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
  reducers: {
    setWeatherForecast(state, { payload }) {
      state.weatherForecast = payload;
      state.coordinates = {
        lat: payload.city.coord.lat,
        lon: payload.city.coord.lon,
      };
      state.isLoading = false;
    },
    setCoordinates(state, { payload }) {
      state.coordinates = payload;
    },
    setIsError(state, { payload }) {
      state.isError = payload;
    },
  },
  extraReducers: {
    [getWeatherByCoord.pending]: (state) => {
      state.isLoading = true;
    },
    [getWeatherByCoord.fulfilled]: (state, { payload }) => {
      state.weatherForecast = payload;
      state.coordinates = {
        lat: payload.city.coord.lat,
        lon: payload.city.coord.lon,
      };
      state.isLoading = false;
      localStorage.setItem("weatherForecast", JSON.stringify(payload));
    },
    [getWeatherByCoord.rejected]: (state, { payload }) => {
      state.error = payload.message;
    },

    [getWeatherByName.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getWeatherByName.fulfilled]: (state, { payload }) => {
      state.weatherForecast = payload;
      state.coordinates = {
        lat: payload.city.coord.lat,
        lon: payload.city.coord.lon,
      };
      state.isLoading = false;
      state.isError = false;
      localStorage.setItem("weatherForecast", JSON.stringify(payload));
    },
    [getWeatherByName.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.isError = true;
      state.isLoading = false;
    },
    [getTownImage.fulfilled]: (state, { payload }) => {
      state.townImage = payload;
      localStorage.setItem("cityImage", payload);
    },
    [getTownImage.rejected]: (state, { payload }) => {
      state.townImage = null;
      localStorage.removeItem("cityImage");
    },
  },
});

export default townWeatherSlice.reducer;
export const { setWeatherForecast, setCoordinates, setIsError } =
  townWeatherSlice.actions;
