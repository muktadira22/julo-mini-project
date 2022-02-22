import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state) => {},
    removeFavorite: (state) => {},
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
