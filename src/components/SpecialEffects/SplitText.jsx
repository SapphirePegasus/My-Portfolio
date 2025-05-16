import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SplitText = ({
  text = "Hello, I'm Prittam!",
  className = "",
  delay = 0.1, 
  animationFrom = { opacity: 0, y: 40 },
  animationTo = { opacity: 1, y: 0 },
  easing = "power3.out",
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef(null);
  const words = text.split(" ").map((word) => word.split(""));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const letters = containerRef.current.querySelectorAll(".letter");
          gsap.fromTo(letters, animationFrom, {
            ...animationTo,
            stagger: delay,
            ease: easing,
            onComplete: onLetterAnimationComplete,
          });
          observer.unobserve(containerRef.current);
        }
      },
      { threshold, rootMargin }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [
    animationFrom,
    animationTo,
    delay,
    easing,
    onLetterAnimationComplete,
    threshold,
    rootMargin,
  ]);

  return (
    <p
      ref={containerRef}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className="letter"
              style={{
                display: "inline-block",
                opacity: animationFrom.opacity,
                transform: `translateY(${animationFrom.y}px)`,
              }}
            >
              {letter}
            </span>
          ))}
          <span style={{ display: "inline-block", width: "0.3em" }}>
            &nbsp;
          </span>
        </span>
      ))}
    </p>
  );
};

export default SplitText;