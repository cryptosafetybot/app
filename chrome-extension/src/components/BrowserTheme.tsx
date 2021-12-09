import React, { useEffect, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { themes } from "../themes";

/**
 * Configure styled components to match light/dark theme in browser
 */
export function BrowserTheme({ children }: React.PropsWithChildren<{}>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (!window.matchMedia) return;

    // update dark mode based on media query/media query event
    const updateDarkMode = (mq: MediaQueryList | MediaQueryListEvent) =>
      setIsDarkMode(mq.matches);

    // detect dark mode with media query
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // update dark mode based on current query
    updateDarkMode(mediaQuery);

    // listen for changes and update
    mediaQuery.addEventListener("change", updateDarkMode);

    // clean up
    return () => {
      mediaQuery.removeEventListener("change", updateDarkMode);
    };
  }, []);

  const theme = isDarkMode ? themes.dark : themes.light;
  const colorScheme = isDarkMode ? "dark" : "light";

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta name="theme-color" content={theme.bg} />
        <meta name="color-scheme" content={colorScheme} />
      </Helmet>
      <RootStyle colorScheme={colorScheme} />
      {children}
    </ThemeProvider>
  );
}

const RootStyle = createGlobalStyle<{ colorScheme: string }>`
    :root {
        color-scheme: ${(props) => props.colorScheme};
    }
`;
