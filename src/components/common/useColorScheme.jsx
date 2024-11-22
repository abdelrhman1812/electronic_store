import { useEffect, useState } from "react";

const useColorScheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDark]);

  return {
    isDark,
    setIsDark,
  };
};

export default useColorScheme;
