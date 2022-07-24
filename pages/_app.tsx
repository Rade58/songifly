import "../styles/globals.css";
import type { AppProps } from "next/app";

// FOR THEMES
import { ThemeProvider } from "next-themes";
import themes from "../themes";
//

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider
        enableSystem={false}
        attribute="class"
        defaultTheme={themes[0]}
        enableColorScheme={false}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
