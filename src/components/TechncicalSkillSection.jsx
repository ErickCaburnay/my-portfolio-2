// File: TechncicalSkillSection.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const TechnicalSkillSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Variants for motion animations
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const skillsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Modern skills array
  const modernSkills = [
    { name: "HTML", icon: "/images/html.png" },
    { name: "CSS", icon: "/images/css.png" },
    { name: "Tailwind", icon: "/images/tailwind.png" },
    { name: "JS", icon: "/images/javascript.png" },
    { name: "React", icon: "/images/react.png" },
    { name: "Nodejs", icon: "/images/nodejs.png" },
    { name: "MongoDb", icon: "/images/mongo.png" },
    { name: "Firebase", icon: "/images/firebase.png" },
    { name: "UI/UX", icon: "/images/figma.png" },
  ];

  return (
    <div className="skills-visualization no-min">
      <motion.h3
        style={{ fontSize: "1rem" }}
        variants={itemVariants}
        className="text-4xl font-bold mb-2 text-center md:text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Technical <span className="text-primary">Skills</span>
      </motion.h3>

      <motion.div
        className="skills-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={skillsVariants}
      >
        {modernSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            variants={skillItemVariants}
            className="skill-card"
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
            whileHover={{
              y: -6,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <div className="skill-icon-wrapper">
              <Image
                src={skill.icon}
                alt={skill.name}
                width={20}
                height={20}
                className="object-contain"
              />
              <motion.div
                className="skill-icon-glow"
                animate={{
                  scale: hoveredSkill === index ? [1, 1.2, 1] : 1,
                  opacity: hoveredSkill === index ? [0.4, 0.7, 0.4] : 0,
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            <span className="skill-name">{skill.name}</span>

            {hoveredSkill === index && (
              <div className="skill-particles">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="skill-particle"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, Math.random() * 40 - 20],
                      y: [0, Math.random() * -30 - 10],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechnicalSkillSection;
