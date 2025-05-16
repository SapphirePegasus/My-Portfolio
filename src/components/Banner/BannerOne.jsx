import VariableProximity from "../SpecialEffects/VariableProximity";
import { useRef } from "react";
import styles from "./Banner.module.css";

export default function BannerOne() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className={styles.bannercont}>
      <video className={styles.bannerimg} autoPlay loop muted playsInline>
        <source src="/assets/banner/banner1.webm" type="video/webm" />
      </video>
      <VariableProximity
        label={"From past roles to the future innovations"}
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
