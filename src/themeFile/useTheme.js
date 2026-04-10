import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { themeConfig } from "../themeFile/themeConfig";

export const useTheme = () => {
  const themeSelector = useSelector((state) => state.themeStore.themeValue);
  const paletteSelector = useSelector((state) => state.themeStore.paletteValue);

  const [systemTheme, setSystemTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setSystemTheme(e.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const finalTheme =
    themeSelector === "system" ? systemTheme : themeSelector;

  const theme = themeConfig[finalTheme] || themeConfig["dark"];

  return {
    theme,          // full object
    mode: finalTheme, // "dark" | "light"
    themeValue: themeSelector, // "dark" | "light" | "system"
    activePalette: paletteSelector   // full object payload
  };
};