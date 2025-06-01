"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const ProjectsCarousel = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const timelineRef = useRef(null);

  // Portfolio items data - 8 projects as requested
  const portfolioItems = [
    {
      id: 1,
      src: "/images/SS.png",
      alt: "PC Builder X",
      tag: "Web Application",
      title: "PC Builder X",
      description: "A comprehensive desktop application for PC building enthusiasts featuring component compatibility checks, performance benchmarks, and price comparisons.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      src: "/images/project2.png",
      alt: "E-Commerce Dashboard",
      tag: "Dashboard",
      title: "E-Commerce Analytics",
      description: "Real-time analytics dashboard for e-commerce platforms with advanced data visualization and sales tracking capabilities.",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      src: "/images/project3.png",
      alt: "Task Management App",
      tag: "Mobile App",
      title: "TaskFlow Pro",
      description: "Cross-platform task management application with team collaboration features and AI-powered productivity insights.",
      technologies: ["React Native", "Firebase", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      src: "/images/project4.png",
      alt: "Weather Forecast",
      tag: "Web Application",
      title: "WeatherWise",
      description: "Advanced weather forecasting application with interactive maps, severe weather alerts, and personalized recommendations.",
      technologies: ["Next.js", "Tailwind CSS", "Weather API"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      src: "/images/project5.png",
      alt: "Social Media Platform",
      tag: "Full Stack",
      title: "ConnectHub",
      description: "Modern social media platform with real-time messaging, content sharing, and advanced privacy controls.",
      technologies: ["React", "Socket.io", "Node.js", "Redis"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      src: "/images/project6.png",
      alt: "Learning Management System",
      tag: "Education",
      title: "EduPlatform",
      description: "Comprehensive learning management system with interactive courses, progress tracking, and virtual classroom features.",
      technologies: ["Angular", "Spring Boot", "MySQL", "WebRTC"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 7,
      src: "/images/project7.png",
      alt: "Cryptocurrency Tracker",
      tag: "Finance",
      title: "CryptoTracker Pro",
      description: "Real-time cryptocurrency tracking and portfolio management tool with advanced charting and market analysis.",
      technologies: ["React", "Chart.js", "Node.js", "CoinGecko API"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 8,
      src: "/images/project8.png",
      alt: "Recipe Finder",
      tag: "Lifestyle",
      title: "RecipeExplorer",
      description: "AI-powered recipe discovery platform with ingredient-based search, nutritional analysis, and meal planning features.",
      technologies: ["Vue.js", "Python", "TensorFlow", "Spoonacular API"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...portfolioItems, ...portfolioItems];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Calculate scroll width after render
    const calculateScrollWidth = () => {
      return scrollContainer.scrollWidth / 2;
    };

    // GSAP infinite scroll animation with optimized performance
    const tl = gsap.timeline({ 
      repeat: -1,
      paused: isHovered
    });
    
    // Store timeline reference for cleanup
    timelineRef.current = tl;

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const scrollWidth = calculateScrollWidth();
      
      tl.to(scrollContainer, {
        x: -scrollWidth,
        duration: 30,
        ease: "none",
        force3D: true, // Force hardware acceleration
        onComplete: () => {
          // Reset position for seamless loop
          gsap.set(scrollContainer, { x: 0 });
        }
      });

      // Handle hover state
      if (isHovered) {
        tl.pause();
      } else {
        tl.resume();
      }
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [isHovered]);

  // Separate effect for hover state changes to avoid recreation
  useEffect(() => {
    if (timelineRef.current) {
      if (isHovered) {
        timelineRef.current.pause();
      } else {
        timelineRef.current.resume();
      }
    }
  }, [isHovered]);

  const handleProjectClick = (project) => {
    // Handle project click - could open modal or navigate
    console.log("Project clicked:", project.title);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Showcasing innovative solutions and creative implementations across various technologies and industries
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={scrollRef}
            className="flex gap-8 w-fit"
            style={{ transform: 'translateX(0)' }}
          >
            {duplicatedItems.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 w-96 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 dark:border-slate-700">
                  {/* Project Image */}
                  {/* <div className="relative h-48 overflow-hidden"> */}
                  <div className="relative h-48 min-h-[12rem] w-full overflow-hidden">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 384px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Project Tag */}
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.tag}
                    </div>

                    {/* Hover Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button 
                        className="bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.liveUrl, '_blank');
                        }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        className="bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span>Hover to pause • Click to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;