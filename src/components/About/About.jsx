import SplitText from "../SpecialEffects/SplitText";
import ScrollReveal from "../SpecialEffects/ScrollReveal";
import styles from "./About.module.css";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef(null);

  return (
    <section className={styles.aboutcont} id="about">
      <SplitText
        text="Hello, I'm Prittam"
        className={styles.splittextname}
        rootMargin="0px 0px -100px 0px"
      />
      <br />
      <SplitText
        text="a.k.a Sapphire Pegasus"
        className={styles.splittextaka}
        rootMargin="0px 0px -100px 0px"
      />
      <div className={styles.imgandtext}>
        <img className={styles.aboutimg} src="/assets/about/aboutImage.webp" />
        <div className={styles.abouttext}>
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={true}
            baseRotation={8}
            blurStrength={4}
          >
            A Power Platform Engineer & Frontend Developer who turns bold ideas
            into reality. I build apps that defy expectations and elevate
            experiences. From flashy, dynamic designs to sleek, modern
            minimalism, I craft digital products that are both elegant and
            efficient.
          </ScrollReveal>
          {/*<a
            className={styles.resumelink}
            href="https://drive.google.com/file/d/1iocL8BA-TXbpkxA0AENyTBQf7dkbBdG7/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here To Download Resume 
          </a>*/}
        </div>
      </div>
    </section>
  );
}
