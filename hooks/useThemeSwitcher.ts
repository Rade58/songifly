import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import themes from "../themes";

const change = (currentTheme: string, themeList: string[]) => {
  //
  const indexOfCurrent = themeList.indexOf(currentTheme);
  const listLength = themeList.length;

  if (listLength !== indexOfCurrent + 1) {
    return themeList[indexOfCurrent + 1];
  }

  return themeList[0];
};

const useThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { setTheme, theme: currentTheme } = useTheme();

  const changeTheme = () => {
    setTheme(change(currentTheme ? currentTheme : themes[0], themes));
  };

  return {
    theme: mounted && currentTheme ? currentTheme : themes[0],
    changeTheme: mounted ? changeTheme : () => undefined,
    availableThemes: themes ? themes : [],
  };
};

export default useThemeSwitcher;
