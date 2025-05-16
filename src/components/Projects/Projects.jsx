import React, { useEffect, useRef } from "react";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImageUrl } from "../../utils/getImage";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }) => {
  const imgRef = useRef(null);

  // Parallax effect on image hover
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Adjust these factors to control parallax strength
    const offsetX = ((x - rect.width / 2) / rect.width) * 30;
    const offsetY = ((y - rect.height / 2) / rect.height) * 30;
    if (imgRef.current) {
      imgRef.current.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.cardImageContainer}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={getImageUrl(project.imageSrc)}
          alt={project.title}
          ref={imgRef}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.chips}>
          {project.skills.map((skill, idx) => (
            <span key={idx} className={styles.chip}>
              {skill}
            </span>
          ))}
        </div>
        <div className={styles.cardTitleDemoCont}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                <g transform="rotate(0, 1024, 1024)">
                  <path
                    fill="#ffffff"
                    d="M2042 1024l-941 -941l-90 90l787 787h-1798v128h1798l-787 787l90 90z"
                  />
                </g>
              </svg>
            </a>
          )}
        </div>
        <p className={styles.cardDescription}>{project.description}</p>
      </div>
    </div>
  );
};

export default function Projects() {
  const galleryRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 768 && galleryRef.current && cardsRef.current) {
      const tweenDistance =
        cardsRef.current.scrollWidth - cardsRef.current.clientWidth;

      gsap.to(cardsRef.current, {
        x: -tweenDistance,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top top",
          end: `+=${tweenDistance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          //markers: true, 
        },
      });
    }
  }, []);

  return (
    <section className={styles.projectGallery} ref={galleryRef} id="projects">
      <div className={styles.projectCards} ref={cardsRef}>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  );
}
