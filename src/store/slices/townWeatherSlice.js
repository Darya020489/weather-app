import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherService from "../../services/weatherService";

const initialState = {
  weatherForecast: null,
  isLoading: true,
  // townImage: "",
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

// export const getTownImage = createAsyncThunk(
//   "townWeather/getTownImage",
//   async (name, { rejectWithValue }) => {
//     try {
//       const result = await weatherService.getImageByName(name);
//       console.log(result);
//       return result;
//     } catch (err) {
//       console.log(err);
//       console.log(rejectWithValue(err));
//       return rejectWithValue(err);
//     }
//   }
// );

const townWeatherSlice = createSlice({
  name: "townWeather",
  initialState,
  reducers: {
    setWeatherForecast(state, { payload }) {
      state.weatherForecast = payload;
      state.isLoading = false;
    },
    setTownImage(state, { payload }) {
      state.townImage = payload;
    },
  },
  extraReducers: {
    [getWeatherByCoord.pending]: (state) => {
      state.isLoading = true;
    },
    [getWeatherByCoord.fulfilled]: (state, { payload }) => {
      state.weatherForecast = payload;
      console.log(payload);
      state.isLoading = false;
      localStorage.setItem("weatherForecast", JSON.stringify(payload));
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
      localStorage.setItem("weatherForecast", JSON.stringify(payload));
    },
    [getWeatherByName.rejected]: (state, { payload }) => {
      state.error = payload.message;
    },
  },
});

export default townWeatherSlice.reducer;
export const { setWeatherForecast } = townWeatherSlice.actions;
