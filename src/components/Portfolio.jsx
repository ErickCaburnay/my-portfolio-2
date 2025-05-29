import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Portfolio() {
  const portfolioContentRef = useRef(null);

  // Your portfolio items as data array
  const portfolioItems = [
    {
      src: "/images/SS.png",
      alt: "PC Builder X",
      tag: "Project 1",
      title: "PC Builder X",
      description: "A powerful desktop application for PC building enthusiasts. Features component compatibility checks and performance benchmarks.",
    },
    {
      src: "/images/ss2.png",
      alt: "E-Commerce Platform",
      tag: "Project 2",
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform with secure payment integration, user authentication, and real-time inventory management.",
    },
    {
      src: "/images/ss3.png",
      alt: "Task Management App",
      tag: "Project 3",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and progress tracking.",
    },
    {
      src: "/images/SS.png",
      alt: "Weather Dashboard",
      tag: "Project 4",
      title: "Weather Dashboard",
      description: "An interactive weather dashboard that provides real-time weather updates, forecasts, and location-based weather information.",
    },
    {
      src: "/images/ss2.png",
      alt: "Fitness Tracker",
      tag: "Project 5",
      title: "Fitness Tracker",
      description: "A comprehensive fitness tracking application with workout planning, progress monitoring, and nutrition tracking features.",
    },
    {
      src: "/images/ss3.png",
      alt: "Recipe Finder",
      tag: "Project 6",
      title: "Recipe Finder",
      description: "A recipe discovery platform with ingredient-based search, meal planning, and nutritional information calculation.",
    },
  ];

  useEffect(() => {
    const container = portfolioContentRef.current;
    if (!container) return;

    let scrollPos = 0;
    const speed = 0.5; // pixels per frame, adjust speed here

    let animationFrameId;

    const scrollStep = () => {
      scrollPos += speed;
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="portfolio" id="portfolio">
      <div className="main-text">
        <p>Portfolio</p>
        <h2><span>Latest</span> Projects</h2>
        {/* Your nav buttons here */}
      </div>

      <div className="portfolio-content" ref={portfolioContentRef}>
        {/* Render the items twice for seamless looping */}
        {[...portfolioItems, ...portfolioItems].map((item, i) => (
          <div className="row" key={i}>
            <Image
              src={item.src}
              alt={item.alt}
              width={400}
              height={300}
              className="portfolio-image"
              priority={i < portfolioItems.length} // priority for first set
            />
            <div className="portfolio-text">
              <span className="portfolio-tag">{item.tag}</span>
              <h5>{item.title}</h5>
              <p>{item.description}</p>
              <a href="#" className="read">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
