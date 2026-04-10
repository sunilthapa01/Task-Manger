import { createSlice } from "@reduxjs/toolkit";

const defaultPalette = {
  id: "neon",
  name: "Neon Cyber",
  primary: "#39FF14",
  secondary: "#8A2BE2",
  bg: "#0A0A0A"
};

const initialState = {
  themeValue: localStorage.getItem("theme") || "light",
  paletteValue: localStorage.getItem("palette") ? JSON.parse(localStorage.getItem("palette")) : defaultPalette,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, actions) => {
      const value = actions.payload;
      if (["light", "dark", "system"].includes(value)) {
        state.themeValue = value;
        localStorage.setItem("theme", value);
      }
    },
    setPalette: (state, actions) => {
      state.paletteValue = actions.payload;
      localStorage.setItem("palette", JSON.stringify(actions.payload));
    }
  },
});

export const { setTheme, setPalette } = themeSlice.actions;
export default themeSlice.reducer;
