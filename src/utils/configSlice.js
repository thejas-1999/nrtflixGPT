import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "app-config",
  initialState: {
    preferdLanguage: "english",
  },
  reducers: {
    selectPreferdLanguage: (state, action) => {
      state.preferdLanguage = action.payload;
    },
  },
});

export const { selectPreferdLanguage } = configSlice.actions;

export default configSlice.reducer;
