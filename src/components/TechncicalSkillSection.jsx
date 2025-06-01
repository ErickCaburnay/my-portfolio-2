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
    { name: "HTML", percentage: 85, icon: "/images/html.png" },
    { name: "CSS", percentage: 85, icon: "/images/css.png" },
    { name: "Tailwind", percentage: 75, icon: "/images/tailwind.png" },
    { name: "JavaScript", percentage: 90, icon: "/images/javascript.png" },
    { name: "React", percentage: 95, icon: "/images/react.png" },
    { name: "Node.js", percentage: 80, icon: "/images/nodejs.png" },
    { name: "MongoDb", percentage: 75, icon: "/images/mongo.png" },
    { name: "Google Firebase", percentage: 75, icon: "/images/firebase.png" },
    { name: "UI/UX Design", percentage: 70, icon: "/images/figma.png" },
  ];

  return (
    // Tighten the wrapper: replaced mb-10 with py-4
    <div className="skills-visualization no-min">
      {/* Tighter heading: changed mb-6 → mb-2 */}
      <motion.h3
        variants={itemVariants}
        className="text-5xl font-bold mb-2 text-center md:text-left"
        initial="hidden"
        style={{ fontSize: "3rem" }}
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
            className="skill-card w-20 h-16 p-4 rounded-xl shadow-md"
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <div className="skill-header">
              <div className="skill-icon-wrapper">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-contain"
                />
                <motion.div
                  className="skill-icon-glow"
                  animate={{
                    scale: hoveredSkill === index ? [1, 1.2, 1] : 1,
                    opacity: hoveredSkill === index ? [0.5, 0.8, 0.5] : 0.3,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div className="skill-info">
                <h4 className="skill-name">{skill.name}</h4>
                <span className="skill-percentage">{skill.percentage}%</span>
              </div>
            </div>

            <div className="skill-progress-container">
              <motion.div
                className="skill-progress-bg"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <motion.div
                  className="skill-progress-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.1 + 0.3,
                    ease: "easeOut",
                  }}
                >
                  <motion.div
                    className="skill-progress-shimmer"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.2,
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

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
                      x: [0, Math.random() * 60 - 30],
                      y: [0, Math.random() * -40 - 10],
                    }}
                    transition={{
                      duration: 1.5,
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
