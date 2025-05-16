import VariableProximity from "../SpecialEffects/VariableProximity";
import { useRef } from "react";
import styles from "./Banner.module.css";

export default function BannerTwo() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className={styles.bannercont}>
      <video className={styles.bannerimg} autoPlay loop muted playsInline>
        <source src="/assets/banner/banner2.webm" type="video/webm" />
      </video>
      <VariableProximity
        label={"Creating Elegant Experiences with Efficiency"}
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
