import "../styles/globals.css";
import type { ReactElement as RE, ReactNode } from "react";
import type { NextPage as NP } from "next";
import type { AppProps } from "next/app";

// FOR THEMES
import { ThemeProvider } from "next-themes";
import themes from "../theme/daisy-themes";
//

// LAYOUTS
import PlayerLayout from "@/layouts/PlayerLayout";
//

export type NextPageWithLayout = NP & {
  getLayout?: (page: RE) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // IF Component.getLayout IS null OR undefined
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  // WITH THIS SETTING

  // YOU CAN STILL WRAP APP COMPONENT
  // IF YOU WANT COMMON LAYOUT FOR EVERY PAGE

  // AND IF YOU PROVIDE LAYOUTS ON PAGE BASIS
  // THAT PAGE LAYOUT IS ALSO APPLYING FOR THAT PAGE

  return (
    <>
      <ThemeProvider
        enableSystem={false}
        attribute="data-theme"
        defaultTheme={themes[0]}
        enableColorScheme={false}
      >
        <PlayerLayout>{getLayout(<Component {...pageProps} />)}</PlayerLayout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
