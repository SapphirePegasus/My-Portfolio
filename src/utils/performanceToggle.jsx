import React, { createContext, useContext, useState, useEffect } from "react";
import { getGPUTier } from "detect-gpu";

const ToggleContext = createContext({
  isOn: true,
  toggle: () => {},
  performanceCheckDone: false,
});

export const PerformanceToggle = ({ children }) => {
  const [isOn, setIsOn] = useState(true);
  const [performanceCheckDone, setPerformanceCheckDone] = useState(false);

  useEffect(() => {
    async function checkGPU() {
      try {
        const { tier } = await getGPUTier();
        // If tier is below 2, consider it low performance (disable heavy scene)
        if (tier < 2) {
          setIsOn(false);
        } else {
          setIsOn(true);
        }
      } catch (error) {
        setIsOn(false);
      } finally {
        setPerformanceCheckDone(true);
      }
    }
    checkGPU();
  }, []);

  const toggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <ToggleContext.Provider value={{ isOn, toggle, performanceCheckDone }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => useContext(ToggleContext);
