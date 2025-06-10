"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from './About.module.css';
import TechnicalSkillSection from "../TechncicalSkillSection";

const AboutSection = () => {
  const aboutRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const aboutElement = aboutRef.current;
    const imageElement = imageRef.current;

    if (aboutElement && imageElement) {
      // Parallax scroll effect on the image
      gsap.to(imageElement, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: aboutElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hover effects on the image
      const handleMouseEnter = () => {
        gsap.to(imageElement, {
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imageElement, {
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      imageElement.addEventListener("mouseenter", handleMouseEnter);
      imageElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        imageElement.removeEventListener("mouseenter", handleMouseEnter);
        imageElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Variants for motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <div ref={aboutRef} className={styles.about}>
      {/* About Me Image */}
      <motion.div
        className={styles["about-img"]}        
        ref={imageRef}
      >
        <Image
          src="/images/3d1.jpg"
          alt="About Me"
          width={530}
          height={530}
          className=""
        />
        <motion.div
          className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-bg font-bold"         
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-20 h-20 bg-second-bg border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold"          
        >
          {/* <span className="text-sm">WebDev</span> */}
        </motion.div>
      </motion.div>

      {/* About Me Text */}
      <motion.div
        className={styles["about-text"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="">
          About <span className="text-primary">Me</span>
        </motion.h2>

        <motion.h4 variants={itemVariants} className="">
          Web & UI/UX Designer!
        </motion.h4>

        <motion.p variants={itemVariants} className="">
          I'm Erick Jefferson R. Caburnay, a dedicated web developer passionate
          about creating captivating digital experiences. With expertise in
          HTML, CSS, JavaScript, and modern frameworks like React and Next.js, 
          I specialize in building responsive websites and dynamic web applications. 
          Collaborative and detail-oriented, I work closely with clients to bring 
          their visions to life through innovative design and clean code.
        </motion.p>

        <div><TechnicalSkillSection/></div>
        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-6 mt-10 justify-center"
          variants={itemVariants}
        >
          <motion.a
            href="#contact"
            className={styles.btn}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 255, 136, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Hire Me
          </motion.a>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} bg-transparent border-2 border-primary ${styles["text-primary"]} hover:bg-primary hover:text-bg`}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 255, 136, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
