import styles from "./App.module.css";
import About from "./components/About/About";
import BannerOne from "./components/Banner/BannerOne";
import BannerThree from "./components/Banner/BannerThree";
import BannerTwo from "./components/Banner/BannerTwo";
import Contact from "./components/Contact/Contact";
import Experience from "./components/Experience/Experience";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Projects from "./components/Projects/Projects";
import SplashCursor from "./components/SpecialEffects/SplashCursor";
import Preloader from "./components/Preloader/Preloader";
import useIsMobile from "./utils/useIsMobile";

function App() {
  console.log(
    "Designed and Developed by Prittam Bhattacharyya • © 2025 || * The name and images given in the project section are a replica of the actual app. Actual names and images of apps or logos can't be shared under strict NDAs."
  );
  const isMobile = useIsMobile(768);

  return (
    <>
      <div className={styles.maincontainer}>
        <Preloader />
        {!isMobile && (
          <div className={styles.splash}>
            <SplashCursor />
          </div>
        )}
        <Navbar />
        <div className={styles.hero}>
          <Hero />
        </div>
        <div className={styles.contents}>
          <About />
          <BannerOne className={styles.banner} />
          <Experience />
          <BannerTwo />
          <Projects />
          <BannerThree />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
