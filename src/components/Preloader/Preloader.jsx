import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.css";
import { useProgress } from "@react-three/drei";
import { useToggle } from "../../utils/performanceToggle";

const Preloader = ({ onFinish }) => {
  const { progress } = useProgress();
  const { performanceCheckDone } = useToggle();
  const [isDone, setIsDone] = useState(false);
  const [visible, setVisible] = useState(true);

  // Fallback: if after 5 seconds of performance check completion progress is still 0, assume loading is done.
  useEffect(() => {
    let fallbackTimeout;
    if (performanceCheckDone && progress === 0) {
      fallbackTimeout = setTimeout(() => {
        setIsDone(true);
        setTimeout(() => {
          setVisible(false);
          if (onFinish) onFinish();
        }, 1000);
      }, 5000);
    }
    return () => {
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
    };
  }, [performanceCheckDone, progress, onFinish]);

  // When both performance check is done and asset loading reaches 100%, trigger fade out.
  useEffect(() => {
    if (performanceCheckDone && progress >= 100) {
      // Wait 500 ms after reaching 100% before starting fade out
      setTimeout(() => {
        setIsDone(true);
        // Wait for the fade-out transition to complete (1 second)
        setTimeout(() => {
          setVisible(false);
          if (onFinish) onFinish();
        }, 1000);
      }, 500);
    }
  }, [performanceCheckDone, progress, onFinish]);

  if (!visible) return null;

  return (
    <div className={`${styles.container} ${isDone ? styles.fadeOut : ""}`}>
      <div className={styles.centerText}>Loading Up My World</div>
      <div className={styles.progress}>{Math.floor(progress)}</div>
    </div>
  );
};

export default Preloader;
