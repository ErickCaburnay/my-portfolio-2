"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

      gsap.to(heroElement, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: heroElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    return () => {
      gsap.killTweensOf([heroElement, imageElement, glowElement]);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.7, x: 120, rotateY: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.08,
      y: -2,
      boxShadow: "0 20px 40px rgba(0, 255, 136, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.95 },
  };

  const socialVariants = {
    hover: {
      scale: 1.2,
      rotate: 15,
      y: -3,
      boxShadow: "0 10px 25px rgba(0, 255, 136, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.9 },
  };

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (
      windowSize.width > 0 &&
      windowSize.height > 0 &&
      particles.length === 0
    ) {
      const newParticles = Array(15)
        .fill(null)
        .map(() => ({
          x: Math.random() * windowSize.width,
          y: Math.random() * windowSize.height,
          scale: Math.random() * 0.5 + 0.5,
        }));
      setParticles(newParticles);
    }
  }, [windowSize, particles.length]);

  if (windowSize.width === 0 || windowSize.height === 0) {
    return null;
  }

  return (
    <div className={styles["hero-section-container"]}>
      <div className={styles["hero-particles"]} ref={particlesRef}>
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{ x: p.x, y: p.y, scale: p.scale }}
            animate={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        ref={heroRef}
        className={styles["hero-content-enhanced"]}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles["hero-text-enhanced"]} variants={textVariants}>
          <motion.div className={styles["hero-badge"]} variants={textVariants}>
            <span className={styles["badge-dot"]}></span>
            Available for freelance
          </motion.div>

          <motion.h3 variants={textVariants} className={styles["hero-greeting"]}>
            Hello, I'm
          </motion.h3>

          <motion.h1 variants={textVariants} className={styles["hero-name"]}>
            Erick Jefferson
            <span className={styles["hero-name-highlight"]}>
              <span className={styles["gradient-text"]}>Caburnay</span>
              <motion.div
                className={styles["name-underline"]}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            </span>
          </motion.h1>

          <motion.div variants={textVariants} className={styles["hero-title-container"]}>
            <span className={styles["hero-title-prefix"]}>Creative</span>
            <motion.span
              className={styles["hero-title-main"]}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Web Developer
            </motion.span>
          </motion.div>

          <motion.p variants={textVariants} className={styles["hero-description"]}>
            I craft{" "}
            <span className={styles["highlight-text"]}>exceptional digital experiences</span> through innovative web development. Specializing in modern
            frameworks and cutting-edge technologies to bring your vision to life with{" "}
            <span className={styles["highlight-text"]}>pixel-perfect precision</span>.
          </motion.p>

          <motion.div variants={textVariants} className={styles["hero-buttons"]}>
            <motion.button
              className={styles["btn-primary-enhanced"]}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="btn-text">Let's Collaborate</span>
              <span className={styles["btn-icon"]}>
                <i className="bx bx-right-arrow-alt"></i>
              </span>
            </motion.button>

            <motion.button
              className={styles["btn-secondary-enhanced"]}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="btn-text">View Portfolio</span>
              <span className={styles["btn-icon"]}>
                <i className="bx bx-folder-open"></i>
              </span>
            </motion.button>
          </motion.div>

          <motion.div variants={textVariants} className={styles["hero-social-enhanced"]}>
            <span className={styles["social-label"]}>Follow me</span>
            <div className={styles["social-links"]}>
              {[
                { icon: "bxl-github", href: "#", color: "#333" },
                { icon: "bxl-linkedin", href: "#", color: "#0077b5" },
                { icon: "bxl-twitter", href: "#", color: "#1da1f2" },
                { icon: "bxl-instagram-alt", href: "#", color: "#e4405f" },
                { icon: "bxl-behance", href: "#", color: "#1769ff" },
              ].map((social, index) => (
                <motion.a
                  key={social.icon}
                  href={social.href}
                  className={styles["social-link"]}
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                  style={{ "--social-color": social.color }}
                >
                  <i className={`bx ${social.icon}`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div className={styles["hero-image-enhanced"]} variants={imageVariants}>
          <div className={styles["image-container"]} ref={imageRef}>
            <div className={styles["bg-decorations"]}>
              <motion.div
                className={`${styles["decoration-circle"]} ${styles["decoration-1"]}`}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className={`${styles["decoration-circle"]} ${styles["decoration-2"]}`}
                animate={{
                  rotate: [360, 0],
                  scale: [1.1, 1, 1.1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
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

              <motion.div
                className={styles["floating-badge"]}
                animate={{
                  rotate: [0, 360],
                  y: [-5, 5, -5],
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <i className="bx bx-code-alt"></i>
              </motion.div>

              <motion.div
                className={`${styles["skill-tag"]} ${styles["skill-tag-1"]}`}
                animate={{
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                HTML
              </motion.div>

              <motion.div
                className={`${styles["skill-tag"]} ${styles["skill-tag-2"]}`}
                animate={{
                  x: [0, -8, 0],
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                CSS
              </motion.div>

              <motion.div
                className={`${styles["skill-tag"]} ${styles["skill-tag-3"]}`}
                animate={{
                  x: [0, 12, 0],
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                Javascript
              </motion.div>

              <motion.div
                className={`${styles["skill-tag"]} ${styles["skill-tag-4"]}`}
                animate={{
                  x: [0, 10, 0],
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                React
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
