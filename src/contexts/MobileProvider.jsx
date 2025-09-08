import React, { createContext, useState, useEffect, useContext } from "react";

const MobileContext = createContext(false);

const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useIsMobile = () => useContext(MobileContext);

export default MobileProvider;
