"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

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
      // Enhanced floating animation
      gsap.to(imageElement, {
        y: 20,
        rotation: 2,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Animated glow effect
      gsap.to(glowElement, {
        scale: 1.3,
        opacity: 0.6,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Parallax effect
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

    // Cleanup
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
      // Create 15 particles with random initial positions/scales once
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
    return null; // or a loader if you want
  }

  return (
    <>
      <div className="hero-section-container">
        <div className="hero-particles" ref={particlesRef}>
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="particle"
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

        {/* Removed inline style for flexDirection */}
        <motion.div
          ref={heroRef}
          className="hero-content-enhanced"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text-enhanced" variants={textVariants}>
            <motion.div
              className="hero-badge"
              variants={textVariants}
            >
              <span className="badge-dot"></span>
              Available for freelance
            </motion.div>

            <motion.h3 variants={textVariants} className="hero-greeting">
              Hello, I'm
            </motion.h3>

            <motion.h1 variants={textVariants} className="hero-name">
              Erick Jefferson
              <span className="hero-name-highlight">
                <span className="gradient-text">Caburnay</span>
                <motion.div
                  className="name-underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.5 }}
                />
              </span>
            </motion.h1>

            <motion.div
              variants={textVariants}
              className="hero-title-container"
            >
              <span className="hero-title-prefix">Creative</span>
              <motion.span
                className="hero-title-main"
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

            <motion.p variants={textVariants} className="hero-description">
              I craft{" "}
              <span className="highlight-text">exceptional digital experiences</span> through innovative web development. Specializing in modern
              frameworks and cutting-edge technologies to bring your vision to life with{" "}
              <span className="highlight-text">pixel-perfect precision</span>.
            </motion.p>

            <motion.div variants={textVariants} className="hero-buttons">
              <motion.button
                className="btn-primary-enhanced"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="btn-text">Let's Collaborate</span>
                <span className="btn-icon">
                  <i className="bx bx-right-arrow-alt"></i>
                </span>
              </motion.button>

              <motion.button
                className="btn-secondary-enhanced"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="btn-text">View Portfolio</span>
                <span className="btn-icon">
                  <i className="bx bx-folder-open"></i>
                </span>
              </motion.button>
            </motion.div>

            <motion.div variants={textVariants} className="hero-social-enhanced">
              <span className="social-label">Follow me</span>
              <div className="social-links">
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
                    className="social-link"
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

          <motion.div className="hero-image-enhanced" variants={imageVariants}>
            <div className="image-container" ref={imageRef}>
              {/* Animated background elements */}
              <div className="bg-decorations">
                <motion.div
                  className="decoration-circle decoration-1"
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
                  className="decoration-circle decoration-2"
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

              {/* Glow effect */}
              <div className="image-glow" ref={glowRef} />

              {/* Main image */}
              <div className="image-wrapper">
                <Image
                  src="/images/3d1.jpg"
                  alt="Erick Jefferson Caburnay"
                  width={450}
                  height={540}
                  className="hero-main-image"
                  priority
                  sizes="(max-width: 576px) 280px, (max-width: 968px) 350px, (max-width: 1200px) 400px, 450px"
                />

                {/* Floating badge */}
                <motion.div
                  className="floating-badge"
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

                {/* Skills floating around */}
                <motion.div
                  className="skill-tag skill-tag-1"
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
                  React
                </motion.div>

                <motion.div
                  className="skill-tag skill-tag-2"
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
                  Next.js
                </motion.div>

                <motion.div
                  className="skill-tag skill-tag-3"
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
                  Tailwind
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 970px) {
          .hero-content-enhanced {
            flex-direction: column;
            text-align: center;
            gap: 2.5rem;
            padding: 100px 4% 50px;
          }

          .hero-text-enhanced {
            order: 1;
          }

          .hero-image-enhanced {
            order: 2;
            margin-top: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default HeroSection;
