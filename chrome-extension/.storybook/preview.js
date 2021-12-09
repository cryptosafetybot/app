import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";
import { themes } from "../src/themes";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

/**
 * Inject chrome stub
 */
globalThis.chrome = {
  storage: {
    sync: {
      get: (k, cb) => cb({}),
      set: (cb) => cb(),
      remove: (k, cb) => cb(),
      clear: (cb) => cb(),
      getBytesInUse: (cb) => cb(0),
    },
  },
};

addDecorator(withThemesProvider(Object.values(themes)), ThemeProvider);
