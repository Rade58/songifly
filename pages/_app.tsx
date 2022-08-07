import "../styles/globals.css";
import type { ReactElement as RE, ReactNode } from "react";
import type { NextPage as NP } from "next";
import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";
import themes from "../theme/daisy-themes";
//
import PlayerLayout from "@/layouts/PlayerLayout";

import useInterpreterStart from "@/hooks/xstate/useInterpreterStart";
import playerActor from "@/machines/player-machine";

export type NextPageWithLayout<P = any, IP = any> = NP<P, IP> & {
  getLayout?: (page: RE) => ReactNode;
  // I ADDED THE TYPE HERE BECAUSE IF YOU DON'T DO THIS
  // TYPSCRIPT WILL YELL AT YOU
  isAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useInterpreterStart(playerActor);

  return (
    <>
      <ThemeProvider
        enableSystem={false}
        attribute="data-theme"
        defaultTheme={themes[1]}
        enableColorScheme={false}
      >
        {/* HERE AS YOU CAN SE I DID CONDITIONAL RENDERING */}
        {!Component.isAuth && (
          <PlayerLayout>{getLayout(<Component {...pageProps} />)}</PlayerLayout>
        )}
        {Component.isAuth && <>{getLayout(<Component {...pageProps} />)}</>}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
