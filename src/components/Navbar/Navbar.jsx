import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import CustomButton from "../UiElements/Button";
import ToggleSwitch from "../UiElements/Toggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
    setIsClosing(false);
  };

  const closeMobileMenu = () => {
    setIsClosing(true);
    // Wait for the fade-out animation to complete (500ms)
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 500);
  };

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <a className={styles.logocont} href="/">
          <img className={styles.logoimg} src="/logo.png" alt="Logo" />
        </a>
        {/* Desktop menu */}
        <div className={styles.menu}>
          <ul>
            <li className={activeSection === "about" ? styles.active : ""}>
              <a href="#about">About</a>
            </li>
            <li className={activeSection === "experience" ? styles.active : ""}>
              <a href="#experience">Experience</a>
            </li>
            <li className={activeSection === "projects" ? styles.active : ""}>
              <a href="#projects">Projects</a>
            </li>
            <li className={activeSection === "contact" ? styles.active : ""}>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        {/* CTA button for desktop */}
        <div className={styles.actionbuttons}>
          <ToggleSwitch />
          <a className={styles.cta} href="mailto:prittam.work@gmail.com">
            <CustomButton />
          </a>
        </div>
        {/* Mobile menu icon */}
        <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="none"
                d="M18 6L6 18M6 6l12 12"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="none"
                d="M3 6h18M3 12h18M3 18h18"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </nav>
      {/* Mobile full-screen menu overlay */}
      {mobileMenuOpen && (
        <div
          className={`${styles.mobileMenuOverlay} ${
            isClosing ? styles.fadeOut : ""
          }`}
        >
          <ul className={styles.mobileMenuList}>
            <li className={activeSection === "about" ? styles.active : ""}>
              <a href="#about" onClick={closeMobileMenu}>
                About
              </a>
            </li>
            <li className={activeSection === "experience" ? styles.active : ""}>
              <a href="#experience" onClick={closeMobileMenu}>
                Experience
              </a>
            </li>
            <li className={activeSection === "projects" ? styles.active : ""}>
              <a href="#projects" onClick={closeMobileMenu}>
                Projects
              </a>
            </li>
            <li className={activeSection === "contact" ? styles.active : ""}>
              <a href="#contact" onClick={closeMobileMenu}>
                Contact
              </a>
            </li>
          </ul>
          
          {/*<div className={styles.socials}>
            <a href="mailto:prittam.work@gmail.com">Email</a>
            <a
              href="mailto:prittam.work@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/yourinvite"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
          </div>*/}

        </div>
      )}
    </>
  );
}
