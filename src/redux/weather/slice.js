import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../utils/request";
const initialState = {
  list: [],
  status: "",
  error: null,
  loading: false,
};

export const fetchLocation = createAsyncThunk(
  "location/fetch",
  async ({ lat, lon }) => {
    const response = await client("weather", {
      params: {
        lat,
        lon,
      },
    });

    return response;
  }
);

export const fetchLocationDaily = createAsyncThunk(
  "location/fetch-daily",
  async ({ lat, lon }) => {
    const response = await client("onecall", {
      params: {
        lat,
        lon,
      },
    });

    return response;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Login Builder
      .addCase(fetchLocation.pending, (state) => {
        return {
          ...state,
          status: "loading",
          loading: true,
        };
      })
      .addCase(fetchLocation.fulfilled, (state) => {
        return {
          ...state,
          status: "succeeded",
          loading: false,
        };
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message,
          loading: false,
        };
      })

      .addCase(fetchLocationDaily.pending, (state) => {
        return {
          ...state,
          status: "loading",
          loading: true,
        };
      })
      .addCase(fetchLocationDaily.fulfilled, (state) => {
        return {
          ...state,
          status: "succeeded",
          loading: false,
        };
      })
      .addCase(fetchLocationDaily.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message,
          loading: false,
        };
      });
  },
});

export default weatherSlice.reducer;
