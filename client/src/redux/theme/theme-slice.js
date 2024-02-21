import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

// Everything inside of the curly braces is called a reducer.
const themeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
