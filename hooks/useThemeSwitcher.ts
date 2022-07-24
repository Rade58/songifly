import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";

import themes from "../theme/daisy-themes";
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

  // console.log({ themeList, currentTheme });

  const indexOfCurrent = themeList.indexOf(currentTheme);
  const listLength = themeList.length;

  // console.log({ indexOfCurrent, listLength });

  if (listLength !== indexOfCurrent + 1) {
    // console.log(themeList[indexOfCurrent + 1]);

    return themeList[indexOfCurrent + 1];
  }

  // console.log(themeList[0]);

  return themeList[0];
};

//
//
//
//
const useThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const {
    setTheme,
    theme: currentTheme,
    resolvedTheme,
    themes: passedThemes,
    forcedTheme,
    systemTheme,
  } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    // console.log({ setTheme, mounted, currentTheme, resolvedTheme });
    /* console.log({
      setTheme,
      theme: currentTheme,
      resolvedTheme,
      themes: passedThemes,
      forcedTheme,
      systemTheme,
    });
 */
    if (!setTheme || !mounted) return;
    setTheme(
      change(
        currentTheme
          ? (currentTheme as unknown as typeof themes[number])
          : themes[0],
        themes
      )
    );
  }, [setTheme, currentTheme, mounted]);

  const changeToSpecificTheme = useCallback(
    (theme: typeof themes[number]) => {
      if (!setTheme || !mounted) return;
      setTheme(theme);
    },
    [setTheme, mounted]
  );

  return {
    theme: mounted && currentTheme ? currentTheme : themes[0],
    toggleTheme,
    availableThemes: themes ? themes : [],
    changeToSpecificTheme,
  };
};

export default useThemeSwitcher;
