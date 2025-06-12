"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Hero.module.css";

const HeroSection = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false); // Track client-side hydration

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    // Set initial window size
    updateWindowSize();
    
    // Add resize listener with debounce
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateWindowSize, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    const imageElement = imageRef.current;
    const glowElement = glowRef.current;

    if (heroElement && imageElement && glowElement) {
      gsap.to(imageElement, {
        y: 20,
        rotation: 2,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(glowElement, {
        scale: 1.3,
        opacity: 0.6,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Removed GSAP scroll animation on heroElement to prevent overlap with header
      // gsap.to(heroElement, {
      //   yPercent: -25,
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: heroElement,
      //     start: "top bottom",
      //     end: "bottom top",
      //     scrub: 1.5,
      //   },
      // });
    }

    return () => {
      gsap.killTweensOf([heroElement, imageElement, glowElement]);
    };
  }, []);

  // Generate particles only when client-side and when needed
  useEffect(() => {
    if (isClient && windowSize.width > 0 && windowSize.height > 0 && particles.length === 0) {
      const newParticles = Array(15)
        .fill(null)
        .map(() => ({
          x: Math.random() * windowSize.width,
          y: Math.random() * windowSize.height,
          scale: Math.random() * 0.5 + 0.5,
        }));
      setParticles(newParticles);
    }
  }, [isClient, windowSize, particles.length]);

  // Regenerate particles on significant window size changes
  useEffect(() => {
    if (isClient && particles.length > 0) {
      const updatedParticles = particles.map(p => ({
        ...p,
        x: Math.min(p.x, windowSize.width),
        y: Math.min(p.y, windowSize.height),
      }));
      setParticles(updatedParticles);
    }
  }, [windowSize.width, windowSize.height, isClient]);

  return (
    <div className={styles["hero-section-container"]}>
      <div className={styles["hero-particles"]} ref={particlesRef}>
        {isClient && particles.map((p, i) => (
          <div
            key={i}
            className={styles.particle}
          />
        ))}
      </div>

      <div
        ref={heroRef}
        className={styles["hero-content-enhanced"]}
      >
        <div className={styles["hero-text-enhanced"]}>
          <div className={styles["hero-badge"]}>
            <span className={styles["badge-dot"]}></span>
            Available for freelance
          </div>

          <h3 className={styles["hero-greeting"]}>
            Hello, I'm
          </h3>

          <h1 className={styles["hero-name"]}>
            Erick Jefferson
            <span className={styles["hero-name-highlight"]}>
              <span className={styles["gradient-text"]}>Caburnay</span>
              <div
                className={styles["name-underline"]}
              />
            </span>
          </h1>

          <div className={styles["hero-title-container"]}>
            <span className={styles["hero-title-prefix"]}>Creative</span>
            <span
              className={styles["hero-title-main"]}
            >
              Web Developer
            </span>
          </div>

          <p className={styles["hero-description"]}>
            I craft{" "}
            <span className={styles["highlight-text"]}>exceptional digital experiences</span> through innovative web development. Specializing in modern
            frameworks and cutting-edge technologies to bring your vision to life with{" "}
            <span className={styles["highlight-text"]}>pixel-perfect precision</span>.
          </p>

          <div className={styles["hero-buttons"]}>
            <button
              className={styles["btn-primary-enhanced"]}
            >
              <span className="btn-text">Let's Collaborate</span>
              <span className={styles["btn-icon"]}>
                <i className="bx bx-right-arrow-alt"></i>
              </span>
            </button>

            <button
              className={styles["btn-secondary-enhanced"]}
            >
              <span className="btn-text">View Portfolio</span>
              <span className={styles["btn-icon"]}>
                <i className="bx bx-folder-open"></i>
              </span>
            </button>
          </div>

          <div className={styles["hero-social-enhanced"]}>
            <span className={styles["social-label"]}>Follow me</span>
            <div className={styles["social-links"]}>
              {[
                { icon: "bxl-github", href: "https://github.com/ErickCaburnay", color: "#333" },
                { icon: "bxl-linkedin", href: "www.linkedin.com/in/zibit03", color: "#0077b5" },
                { icon: "bxl-facebook", href: "https://www.facebook.com/zibit03", color: "#1769ff" },
                { icon: "bxl-twitter", href: "#", color: "#1da1f2" },
                { icon: "bxl-instagram-alt", href: "#", color: "instagram-gradient" },
                
              ].map((social, index) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className={styles["social-link"]}
                  style={{ "--social-color": social.color }}
                >
                  <i className={`bx ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles["hero-image-enhanced"]}>
          <div className={styles["image-container"]} ref={imageRef}>
            <div className={styles["bg-decorations"]}>
              <div
                className={`${styles["decoration-circle"]} ${styles["decoration-1"]}`}
              />
              <div
                className={`${styles["decoration-circle"]} ${styles["decoration-2"]}`}
              />
            </div>

            <div className={styles["image-glow"]} ref={glowRef} />

            <div className={styles["image-wrapper"]}>
              <Image
                src="/images/3d1.jpg"
                alt="Erick Jefferson Caburnay"
                width={450}
                height={540}
                className={styles["hero-main-image"]}
                priority
                sizes="(max-width: 576px) 280px, (max-width: 968px) 350px, (max-width: 1200px) 400px, 450px"
              />

              <div
                className={styles["floating-badge"]}
              >
                <i className="bx bx-code-alt"></i>
              </div>

              <div
                className={`${styles["skill-tag"]} ${styles["skill-tag-1"]}`}
              >
                HTML
              </div>

              <div
                className={`${styles["skill-tag"]} ${styles["skill-tag-2"]}`}
              >
                CSS
              </div>

              <div
                className={`${styles["skill-tag"]} ${styles["skill-tag-3"]}`}
              >
                Javascript
              </div>

              <div
                className={`${styles["skill-tag"]} ${styles["skill-tag-4"]}`}
              >
                React
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;