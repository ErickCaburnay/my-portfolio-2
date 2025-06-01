"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const ServicesSection = () => {
  const servicesRef = useRef(null);

  useEffect(() => {
    const boxes = gsap.utils.toArray('.service-box');
    
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

  return (
    <div ref={servicesRef} className="services">
      <motion.div
        className="main-text"
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
        className="services-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="box service-box group"
            variants={itemVariants}
            whileHover={{ 
              y: -10, 
              transition: { duration: 0.3 } 
            }}
          >
            <motion.div 
              className="s-icons"
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
              className="read inline-flex items-center group-hover:gap-2 transition-all duration-300"
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

      {/* Additional section for process or approach */}
      <motion.div
        className="mt-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h3 
          className="text-2xl font-semibold mb-8 text-white"
          variants={itemVariants}
        >
          My <span className="text-primary">Development Process</span>
        </motion.h3>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {[
            { step: "01", title: "Discovery", desc: "Understanding your needs and goals" },
            { step: "02", title: "Design", desc: "Creating wireframes and mockups" },
            { step: "03", title: "Develop", desc: "Building with clean, efficient code" },
            { step: "04", title: "Deploy", desc: "Testing and launching your project" }
          ].map((process, index) => (
            <motion.div
              key={process.step}
              className="relative p-6 bg-second-bg rounded-lg border border-primary/20 hover:border-primary transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 30px rgba(0, 255, 136, 0.2)"
              }}
            >
              <div className="text-4xl font-bold text-primary mb-4">{process.step}</div>
              <h4 className="text-lg font-semibold text-white mb-2">{process.title}</h4>
              <p className="text-second-color text-sm">{process.desc}</p>
              
              {index < 3 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServicesSection;