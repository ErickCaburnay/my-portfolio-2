"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic"; // Import dynamic
// import Lenis from '@studio-freight/lenis'; // Commented out Lenis import
// import gsap from "gsap"; // Commented out gsap import
// import { ScrollTrigger } from "gsap/ScrollTrigger"; // Commented out ScrollTrigger import

import GlobalParticles from "../components/GlobalParticles";
// import Header from "@/components/Header/Header"; // Comment out direct import
import HeroSection from "@/components/Hero/HeroSection";
import AboutSection from "@/components/About/AboutSection";
import ServicesSection from "@/components/Services/ServicesSection";
import ProjectsCarousel from "@/components/Projects/ProjectsCarousel";
import ContactSection from "@/components/Contact/ContactSection";
import Footer from "@/components/Footer/Footer";
import DevelopmentSection from "@/components/Development/DevelopmentSection";
import Loader from "@/components/Loader/Loader";

// Dynamically import Header component to ensure it's only rendered on the client-side
const DynamicHeader = dynamic(() => import("@/components/Header/Header"), { ssr: false });

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    // const lenis = new Lenis({
    //   duration: 1.2,
    //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //   direction: 'vertical',
    //   gestureDirection: 'vertical',
    //   smooth: true,
    //   mouseMultiplier: 0.8,
    //   smoothTouch: false,
    //   touchMultiplier: 1.2,
    //   infinite: false,
    //   syncTouch: true,
    //   syncTouchLerp: 0.04,
    //   wheelMultiplier: 0.8,
    //   lerp: 0.1,
    // });

    // Optimize RAF loop
    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);

    // GSAP ScrollTrigger animations
    // const initScrollAnimations = () => {
    //   gsap.utils.toArray('section').forEach((section, index) => {
    //     gsap.fromTo(section, 
    //       {
    //         opacity: 0,
    //         y: 20
    //       },
    //       {
    //         opacity: 1,
    //         y: 0,
    //         duration: 0.4,
    //         ease: "power1.out",
    //         scrollTrigger: {
    //           trigger: section,
    //           start: "top 90%",
    //           toggleActions: "play none none reverse",
    //           fastScrollEnd: true
    //         }
    //       }
    //     );
    //   });

    //   // Simplified parallax effect
    //   gsap.to('.fixed-bg', {
    //     yPercent: -30,
    //     ease: "none",
    //     scrollTrigger: {
    //       trigger: "body",
    //       start: "top bottom",
    //       end: "bottom top",
    //       scrub: 1,
    //       fastScrollEnd: true
    //     }
    //   });

    //   // Optimized stagger animation for service boxes
    //   gsap.fromTo('.box', 
    //     {
    //       opacity: 0,
    //       y: 15
    //     },
    //     {
    //       opacity: 1,
    //       y: 0,
    //       duration: 0.4,
    //       ease: "power1.out",
    //       stagger: 0.1,
    //       scrollTrigger: {
    //         trigger: ".services-content",
    //         start: "top 85%",
    //         end: "bottom 20%",
    //         toggleActions: "play none none none",
    //         fastScrollEnd: true
    //       }
    //     }
    //   );

    //   // Simplified text reveal animations
    //   gsap.utils.toArray('.main-text h2').forEach(text => {
    //     gsap.fromTo(text,
    //       {
    //         opacity: 0,
    //         y: 10
    //       },
    //       {
    //         opacity: 1,
    //         y: 0,
    //         duration: 0.4,
    //         ease: "power1.out",
    //         scrollTrigger: {
    //           trigger: text,
    //           start: "top 95%",
    //           toggleActions: "play none none reverse",
    //           fastScrollEnd: true
    //         }
    //       }
    //     );
    //   });
    // };

    // Initialize animations after a short delay
    // const timer = setTimeout(() => {
    //   initScrollAnimations();
    //   setIsLoaded(true);
    // }, 50);

    // return () => {
    //   clearTimeout(timer);
    //   lenis.destroy();
    //   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // };
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      {/* Render GlobalParticles ONCE here, fixed and behind all content */}
      <GlobalParticles particleCount={30} speed="slow" />

      {/* Main content wrapper, ensure higher z-index so particles stay behind */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="main-content" 
        style={{ position: "relative", zIndex: 2 }} 
      >
        <DynamicHeader /> {/* Use DynamicHeader instead of Header */}
      
      <main>
        <section className="home" id="home">
          <HeroSection />
        </section>

        {/* <section>
          <Header />
        </section> */}

        <section className="about" id="about">
          <AboutSection />
        </section>

        {/* <section >
          <TechnicalSkillSection />
        </section> */}

        <section className="services" id="services">
          <ServicesSection />
        </section>

        <section>
          <DevelopmentSection/>
        </section>

        <section className="portfolio" id="portfolio">
          <ProjectsCarousel />
        </section>

        <section className="contact" id="contact">
          <ContactSection />
        </section>

        
      </main>
      <section>
        <Footer />
        </section>
    </motion.div>
    </>
  );
}