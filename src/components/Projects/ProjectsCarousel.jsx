import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Projects.module.css";

// Sample data with project links
const features = [
  {
    id: 1,
    image: "/images/quizapp.svg",
    title: "QuizApp",
    desc: "Create, share, and take interactive quizzes with real-time scoring. (3rd year project)",
    tech: ["HTML", "CSS", "Javascript"],
    link: "https://your-quizapp-demo.com", // Replace with actual project URL
  },
  {
    id: 2,
    image: "/images/mlj.svg",
    title: "Memorylane Journal",
    desc: "Journaling app with beautiful memory visualizations. (3rd year project)",
    tech: ["Android", "Kotlin", "Java"],
    link: "https://your-memorylane-demo.com", // Replace with actual project URL
  },
  {
    id: 3,
    image: "/images/SS.png",
    title: "PC Builder X",
    desc: "Guided PC building platform with compatibility checks and suggestions. (2nd year project)",
    tech: ["C#", "MySQL"],
    link: "https://your-pcbuilder-demo.com", // Replace with actual project URL
  },
  {
    id: 4,
    image: "/images/bims.svg",
    title: "BIMS",
    desc: "Comprehensive business info system with analytics and workflow. (Capstone Project)",
    tech: ["HTML", "CSS", "Javascript", "Firebase"],
    link: "https://your-bims-demo.com", // Replace with actual project URL
  },
  {
    id: 5,
    image: "/images/bsphere.svg",
    title: "B-Sphere",
    desc: "All-in-one business networking and collaboration portal. (WIP personal project)",
    tech: ["React.js", "Next.js", "Node.js", "Tailwindcss"],
    link: "https://your-bsphere-demo.com", // Replace with actual project URL
  },
];

export default function ProjectsCarousel() {
  const [activeIdx, setActiveIdx] = useState(2); // center card
  const [focusIdx, setFocusIdx] = useState(0);
  const cardStackRef = useRef(null);
  const touchStartY = useRef(null);

  // Wheel scroll only on card area
  useEffect(() => {
    const el = cardStackRef.current;
    if (!el) return;
    const handler = (e) => {
      if (el.matches(":hover")) {
        e.preventDefault();
        if (e.deltaY > 0) setActiveIdx((prev) => Math.min(prev + 1, features.length - 1));
        else if (e.deltaY < 0) setActiveIdx((prev) => Math.max(prev - 1, 0));
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  // Keyboard: arrow up/down navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && focusIdx < features.length - 1) {
      setFocusIdx((idx) => idx + 1);
    } else if (e.key === "ArrowUp" && focusIdx > 0) {
      setFocusIdx((idx) => idx - 1);
    }
  };

  // Touch scroll for mobile
  useEffect(() => {
    const el = cardStackRef.current;
    if (!el) return;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (touchStartY.current == null) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchY - touchStartY.current;
      if (Math.abs(deltaY) > 32) { 
        if (deltaY > 0) {
          setActiveIdx((prev) => Math.max(prev - 1, 0)); 
        } else {
          setActiveIdx((prev) => Math.min(prev + 1, features.length - 1)); 
        }
        touchStartY.current = touchY; 
      }
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Handle card click - navigate to project link
  const handleCardClick = (idx, link) => {
    if (idx === activeIdx && link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      setActiveIdx(idx);
    }
  };

  // Animation/config
  const visibleRange = 2; 
  const cardHeight = 500; 
  const scaleAdjacent = 0.92;
  const scaleFar = 0.85;
  const blurAdjacent = 6;
  const blurFar = 12;

  // Card stack logic: cards above/below
  const getCardProps = (idx) => {
    const pos = idx - activeIdx;
    let y = pos * 65; 
    let zIndex = 10 - Math.abs(pos);
    let scale = 1;
    let blur = 0;
    let opacity = 1;

    if (pos === 0) {
      scale = 1;
      blur = 0;
      opacity = 1;
    } else if (Math.abs(pos) === 1) {
      scale = scaleAdjacent;
      blur = blurAdjacent;
      opacity = 0.78;
    } else if (Math.abs(pos) === 2) {
      scale = scaleFar;
      blur = blurFar;
      opacity = 0.5;
    } else {
      opacity = 0;
      scale = 0.6;
      blur = 20;
    }
    return { y, zIndex, scale, blur, opacity, pos };
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* LEFT */}
        <div className={styles.left}>
          <span className={styles.badge}>FEATURED PROJECTS</span>
          <h2 className={styles.title}>Build, Design, and <span style={{ color: '#22c55e' }}>Deliver</span>
          </h2>
          <p className={styles.desc}>
          Explore the projects I've developed, designed, and deployed — from smart
    information systems to community-centered digital solutions. Each project
    reflects my commitment to efficiency, security, and user-centered design.
          </p>
        </div>
        {/* RIGHT: Vertical Card Stack */}
        <div className={styles.cardsCol} ref={cardStackRef} tabIndex={0}>
          <AnimatePresence mode="popLayout" initial={false}>
            {features.map((feature, idx) => {
              const { y, zIndex, scale, blur, opacity, pos } = getCardProps(idx);
              if (Math.abs(pos) > visibleRange) return null;

              return (
                <motion.div
                  key={feature.id}
                  className={styles.card}
                  style={{
                    position: "absolute",
                    width: "100%",
                    minHeight: `${cardHeight}px`,
                    top: "15%",
                    left: 0,
                    transform: `translateY(-50%)`,
                    zIndex,
                    cursor: pos === 0 ? "pointer" : "auto",
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    filter: `blur(${blur + 10}px)`,
                  }}
                  animate={{
                    opacity,
                    scale,
                    y,
                    filter: `blur(${blur}px)`,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                    filter: `blur(18px)`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                  }}
                  tabIndex={pos === 0 ? 0 : -1}
                  onClick={() => handleCardClick(idx, feature.link)}
                  aria-hidden={pos !== 0}
                  title={pos === 0 ? `Visit ${feature.title} project` : ''}
                >
                  {/* Card background image glass effect */}
                  <div
                    style={{
                      background: `url(${feature.image}) center/contain no-repeat`,
                      position: "absolute",
                      zIndex: 1,
                      top: 0, left: 0, right: 0, bottom: 0,
                      borderRadius: "2rem",
                      filter: "brightness(0.65) blur(0.8px)",
                      pointerEvents: "none",
                    }}
                  />
                  <div className={styles.cardContent}>
                    {/* Spacer to push content to bottom */}
                    <div style={{ flex: 1 }}></div>
                    
                    {/* Text content */}
                    <div className={styles.cardTextContent}>
                      <h3 className={styles.cardTitle} style={{ color: "#fff", textShadow: "0 2px 16px rgba(30,30,50,0.28)" }}>
                        {feature.title}
                      </h3>
                      <p className={styles.cardDesc} style={{ color: "#e5e5ee", fontWeight: 500 }}>
                        {feature.desc}
                      </p>
                    </div>
                    
                    {/* Tech badges at bottom */}
                    <div className={styles.techBadges}>
                      {feature.tech?.map((t) => (
                        <span key={t} className={styles.techBadge}>{t}</span>
                      ))}
                    </div>

                    {/* Link indicator for active card */}
                    {pos === 0 && (
                      <div style={{ 
                        marginTop: '1rem', 
                        textAlign: 'center',
                        color: '#22c55e',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textShadow: '0 1px 8px rgba(0,0,0,0.3)'
                      }}>
                        Click to visit project →
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}