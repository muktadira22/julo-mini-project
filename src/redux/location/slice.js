import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../utils/request";

const initialState = {
  list: [],
  status: "",
  error: null,
  loading: false,
};

export const getCoordinate = createAsyncThunk(
  "location/get-coordinate",
  async ({ location }) => {
    const response = await client("", {
      url: `https://nominatim.openstreetmap.org/search.php?q=${location}&polygon_geojson=1&format=jsonv2`,
    });

    return response;
  }
);

export const getLocationName = createAsyncThunk(
  "location/get-location-name",
  async ({ lat, lon }) => {
    const response = await client("", {
      url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
    });

    return response;
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Login Builder
      .addCase(getCoordinate.pending, (state) => {
        return {
          ...state,
          status: "loading",
          loading: true,
        };
      })
      .addCase(getCoordinate.fulfilled, (state) => {
        return {
          ...state,
          status: "succeeded",
          loading: false,
        };
      })
      .addCase(getCoordinate.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message,
          loading: false,
        };
      })

      // Login Builder
      .addCase(getLocationName.pending, (state) => {
        return {
          ...state,
          status: "loading",
          loading: true,
        };
      })
      .addCase(getLocationName.fulfilled, (state) => {
        return {
          ...state,
          status: "succeeded",
          loading: false,
        };
      })
      .addCase(getLocationName.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message,
          loading: false,
        };
      });
  },
});

export const { addHistory, removeHistory } = historySlice.actions;

export default historySlice.reducer;
