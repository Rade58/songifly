import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import themes from "../daisy-themes";
/**
 *
 * @param currentTheme
 * @param themeList
 * @returns
 */
const change = (
  currentTheme: typeof themes[number],
  themeList: typeof themes
) => {
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
    setTheme(
      change(
        currentTheme
          ? (currentTheme as unknown as typeof themes[number])
          : themes[0],
        themes
      )
    );
  };

  const changeToSpecificTheme = (theme: typeof themes[number]) => {
    setTheme(theme);
  };

  return {
    theme: mounted && currentTheme ? currentTheme : themes[0],
    toggleTheme: mounted ? toggleTheme : () => undefined,
    availableThemes: themes ? themes : [],
    changeToSpecificTheme: mounted
      ? changeToSpecificTheme
      : (theme: typeof themes[number]) => undefined,
  };
};

export default useThemeSwitcher;
