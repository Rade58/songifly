import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";

import themes from "../theme/daisy-themes";

/**
 *
 * @param currentTheme
 * @param themeList
 * @returns
 * @description helper
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

/**
 *
 * @description Use when you want to change theme, or you wantt an access to a current theme
 */
const useThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const {
    setTheme,
    theme: currentTheme,
    // resolvedTheme,
    // themes: passedThemes,
    // forcedTheme,
    // systemTheme,
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
