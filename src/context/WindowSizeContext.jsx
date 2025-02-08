import { createContext, useContext, useEffect, useState } from "react";

const WindowSizeContext = createContext({
  windowSize: 0,
  setWindowSize: () => {},
});

export const WindowSizeProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const setWindowWidth = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", setWindowWidth);
    return () => window.removeEventListener("resize", setWindowWidth);
  }, [windowSize]);

  return (
    <WindowSizeContext.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSize = () => {
  return useContext(WindowSizeContext);
};
