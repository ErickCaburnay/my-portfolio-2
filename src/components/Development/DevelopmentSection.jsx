"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from './Development.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const steps = [
  {
    number: "01",
    imgSrc: "/images/step1.png",
    alt: "Requirements",
    title: "Requirements",
    description:
      "First, we gather your initial requirements to get a clear picture of the project usually thru exchanges of email, phone calls, video conferencing or actual meeting.",
  },
  {
    number: "02",
    imgSrc: "/images/step2.png",
    alt: "Project Plan",
    title: "Project Plan",
    description:
      "We will present a Project Plan which consists of technical aspect, features/requirements, schedule, milestones & reporting and pricing",
  },
  {
    number: "03",
    imgSrc: "/images/step3.png",
    alt: "Design, Coding & Testing",
    title: "Design, Coding & Testing",
    description:
      "Depends on the time constraints, priorities & milestones, we distribute the requirements in a 2-week long sprint, and based on that, we determine how many sprints the project will take.",
  },
  {
    number: "04",
    imgSrc: "/images/step4.png",
    alt: "Delivery",
    title: "Delivery",
    description:
      "Delivers the features/requirements at every sprint. At the end of every sprint, we hold a presentation and signoff of every features/requirements done.",
  },
];

const DevelopmentSection = () => {
  return (
    <section className={styles.devSection}>
      {/* Header */}
      <header className={styles.devSectionHeader}>
        <motion.div
          className={styles.mainText}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants}>How we work</motion.p>
          <motion.h2 variants={itemVariants}>
            We follow <span className={styles.agile}>agile</span> discipline
          </motion.h2>
        </motion.div>
      </header>

      {/* Steps row */}
      <div className={styles.stepsRow}>
        {steps.map(({ number, imgSrc, alt, title, description }, idx) => (
          <div
            key={number}
            className={styles.devStep +
              (idx === 0 ? ` ${styles.firstStep}` : '') +
              (idx === steps.length - 1 ? ` ${styles.lastStep}` : '')
            }
            style={{
              borderImage: "linear-gradient(to bottom, transparent 10%, #00FF88 20%, transparent 30%, transparent 60%, #00FF88 70%, transparent 80%) 1 100%",
              padding: "2.5rem",
            }}
          >
            {/* Circular image with green & red circular border */}
            <div className="relative mb-6 w-40 h-40">
              <svg
                className="absolute top-0 left-0"
                width="160"
                height="160"
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "scale(0.5)" }}
              >
                <circle
                  cx="80"
                  cy="80"
                  r="75"
                  stroke="#00ff88"
                  strokeWidth="4"
                  strokeDasharray="480 40"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="75"
                  stroke="#ff3b3f"
                  strokeWidth="2"
                  strokeDasharray="200 80"
                />
              </svg>
              <img
                src={imgSrc}
                alt={alt}
                className={styles.devImg + " relative z-10 shadow-lg"}
              />
            </div>
            {/* Number above title */}
            <span className={styles.devNumber}>
              {number}
            </span>
            {/* Title */}
            <h3 className={styles.devTitle}>{title}</h3>
            {/* Description */}
            <p className={styles.devDesc}>
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DevelopmentSection;
