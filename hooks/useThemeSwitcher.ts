import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import themes from "../themes";

const useThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { setTheme, theme: currentTheme } = useTheme();

  const changeTheme = (theme: string) => {
    setTheme(theme);
  };

  return {
    theme: mounted ? currentTheme : themes[0],
    changeTheme: mounted ? changeTheme : (theme: string) => undefined,
    availableThemes: themes,
  };
};

export default useThemeSwitcher;
