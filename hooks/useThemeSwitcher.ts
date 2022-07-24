import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import themes from "../themes";
/**
 *
 * @param currentTheme
 * @param themeList
 * @returns
 */
const change = (currentTheme: string, themeList: string[]) => {
  //
  const indexOfCurrent = themeList.indexOf(currentTheme);
  const listLength = themeList.length;

  if (listLength !== indexOfCurrent + 1) {
    return themeList[indexOfCurrent + 1];
  }

  return themeList[0];
};

//
//
//
//
const useThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { setTheme, theme: currentTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(change(currentTheme ? currentTheme : themes[0], themes));
  };

  /* const chngeToSpecificTheme = (theme: (typeof themes[number]) as const) => {

  } */

  return {
    theme: mounted && currentTheme ? currentTheme : themes[0],
    toggleTheme: mounted ? toggleTheme : () => undefined,
    availableThemes: themes ? themes : [],
  };
};

export default useThemeSwitcher;
