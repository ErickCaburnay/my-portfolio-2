"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import styles from '../Services/Services.module.css';
import DevelopmentSection from "../Development/DevelopmentSection";

const ServicesSection = () => {
  const servicesRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Using a class in a CSS module requires .querySelectorAll(`[class*="box"]`)
    // or assigning a dedicated ref for each box if you want animation.
    // For simplicity, keep .box as the main animation selector:
    const boxes = document.querySelectorAll(`.${styles.box}`);

    boxes.forEach((box, index) => {
      gsap.set(box, { opacity: 0, y: 50, scale: 0.8 });

      gsap.to(box, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: box,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, []);

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

  const services = [
    {
      icon: "bx-mobile-alt",
      title: "Web Design",
      description: "Creating visually stunning and user-friendly web interfaces with modern design principles. I focus on aesthetics, usability, and responsive design to ensure your website looks great on all devices.",
      features: ["Responsive Design", "UI/UX Optimization", "Brand Integration", "Cross-browser Compatibility"]
    },
    {
      icon: "bx-code-alt",
      title: "Web Development",
      description: "Building robust and scalable web applications using modern technologies. From frontend to backend, I ensure your website is fast, secure, and maintainable with clean, efficient code.",
      features: ["Frontend Development", "Backend Integration", "Database Design", "API Development"]
    },
    {
      icon: "bx-edit-alt",
      title: "Creative Design",
      description: "Bringing creative concepts to life through innovative design solutions. I combine artistic vision with technical expertise to create memorable digital experiences that engage and inspire.",
      features: ["Graphic Design", "Brand Identity", "Digital Art", "Creative Concepts"]
    }
  ];

  // FloatingOrb Component for the animated orbs
  const FloatingOrb = ({ delay, size, color, position }) => (
    <motion.div
      className="absolute rounded-full opacity-20 blur-xl"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: position.x,
        top: position.y,
      }}
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <div ref={servicesRef} className={styles.services}>
      <motion.div
        className={styles["main-text"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.p variants={itemVariants}>What I am Expert In</motion.p>
        <motion.h2 variants={itemVariants}>
          <span>My</span> Services
        </motion.h2>
      </motion.div>

      <motion.div
        className={styles["services-content"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className={styles.box}
            variants={itemVariants}
            whileHover={{ 
              y: -10, 
              transition: { duration: 0.3 } 
            }}
          >
            <motion.div 
              className={styles["s-icons"]}
              whileHover={{ 
                scale: 1.1, 
                rotate: 10,
                transition: { duration: 0.3 }
              }}
            >
              <i className={`bx ${service.icon}`}></i>
            </motion.div>
            
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            
            <div className="features-list mb-6">
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center text-sm text-second-color"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <i className="bx bx-check text-primary mr-2"></i>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.a
              href="#contact"
              className={styles.read}
              whileHover={{ x: 5 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started
              <motion.i 
                className="bx bx-right-arrow-alt ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ x: 5 }}
              ></motion.i>
            </motion.a>

            {/* Hover overlay effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ServicesSection;
