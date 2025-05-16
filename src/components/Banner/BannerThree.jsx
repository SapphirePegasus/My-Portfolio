import VariableProximity from "../SpecialEffects/VariableProximity";
import { useRef } from "react";
import styles from "./Banner.module.css";

export default function BannerThree() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className={styles.bannercont}>
      <video className={styles.bannerimg} autoPlay loop muted playsInline>
        <source src="/assets/banner/banner3.webm" type="video/webm" />
      </video>
      <VariableProximity
        label={"Let's build something extraordinary together"}
        className={styles.variableproximity}
        fromFontVariationSettings="'wght' 400, 'opsz' 9"
        toFontVariationSettings="'wght' 1000, 'opsz' 40"
        containerRef={containerRef}
        radius={100}
        falloff="linear"
      />
    </div>
  );
}
