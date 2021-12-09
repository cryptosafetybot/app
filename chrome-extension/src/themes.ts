import { DefaultTheme, useTheme } from "styled-components";

export interface AppTheme extends DefaultTheme {
  name: string;
  bg: string;
  fg: string;
  border: string;
  switch: {
    on: string;
    off: string;
  };
}

const light: AppTheme = {
  name: "Light",
  bg: "#ffffff",
  fg: "#464547",
  border: "rgba(0,0,0,0.1)",
  switch: {
    on: "#8ab4f8",
    off: "#8a8a8a",
  },
};

const dark: AppTheme = {
  name: "Dark",
  bg: "#292a2d",
  fg: "#e8eaed",
  border: "rgba(255,255,255,0.1)",
  switch: {
    on: "#8ab4f8",
    off: "#8a8a8a",
  },
};

export const themes = {
  light,
  dark,
};

export const useAppTheme = () => useTheme() as AppTheme;
