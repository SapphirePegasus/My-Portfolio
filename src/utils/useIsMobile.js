import { useState, useEffect } from "react";

export default function useIsMobile(threshold = 500) {
  const [isMobile, setIsMobile] = useState(() => {
    // For SSR safety, you might want to check typeof window !== "undefined"
    if (typeof window !== "undefined") {
      return window.innerWidth <= threshold;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= threshold);
    };

    window.addEventListener("resize", handleResize);
    // Set initial value on mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [threshold]);

  return isMobile;
}
