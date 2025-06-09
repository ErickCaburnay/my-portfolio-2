import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const DevelopmentProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // Parallax transforms for the background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      subtitle: "Deep Dive Analysis",
      desc: "I immerse myself into your vision, conducting thorough market research and user analysis to craft the perfect foundation.",
      icon: "🔍",
      bgColor: "bg-gradient-to-br from-cyan-400 to-blue-600",
      textColor: "text-white",
      accentColor: "cyan"
    },
    {
      step: "02", 
      title: "Design",
      subtitle: "Creative Visualization",
      desc: "Transforming ideas into stunning visual experiences through wireframes, prototypes, and cutting-edge design systems.",
      icon: "🎨",
      bgColor: "bg-gradient-to-br from-purple-400 to-pink-600",
      textColor: "text-white",
      accentColor: "purple"
    },
    {
      step: "03",
      title: "Develop", 
      subtitle: "Code Craftsmanship",
      desc: "Building robust, scalable applications with clean architecture and modern technologies that perform flawlessly.",
      icon: "⚡",
      bgColor: "bg-gradient-to-br from-emerald-400 to-teal-600",
      textColor: "text-white",
      accentColor: "emerald"
    },
    {
      step: "04",
      title: "Deploy",
      subtitle: "Launch Excellence", 
      desc: "Rigorous testing, optimization, and seamless deployment ensuring your project exceeds all expectations.",
      icon: "🚀",
      bgColor: "bg-gradient-to-br from-orange-400 to-red-600",
      textColor: "text-white",
      accentColor: "orange"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -15,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const ParticleField = ({ count, color }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: color === 'cyan' ? '#67e8f9' : 
                              color === 'purple' ? '#c084fc' :
                              color === 'emerald' ? '#6ee7b7' : '#fbbf24'
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

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
    <section 
      className="relative min-h-screen overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1f2937 0%, #000000 50%, #374151 100%)',
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1), rgba(16, 185, 129, 0.1))'
          }}
        />
        {[...Array(8)].map((_, i) => (
          <FloatingOrb 
            key={i} 
            delay={i * 0.5} 
            size={`${60 + Math.random() * 120}px`}
            color={['#06b6d4', '#a855f7', '#10b981', '#f97316'][i % 4]}
            position={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>

      {/* Interactive Mesh Gradient */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          style={{ y: textY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            className="inline-block mb-6"
            variants={cardVariants}
          >
            <span 
              className="px-6 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(6, 182, 212, 0.2)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: '#67e8f9',
                backdropFilter: 'blur(10px)'
              }}
            >
              HOW I WORK
            </span>
          </motion.div>
          
          <motion.h2
            className="font-bold mb-6 leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              background: 'linear-gradient(135deg, #ffffff 0%, #67e8f9 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            variants={cardVariants}
          >
            My Development
            <br />
            Process
          </motion.h2>
          
          <motion.p
            className="text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#d1d5db' }}
            variants={cardVariants}
          >
            From concept to launch, I follow a proven methodology that transforms your vision into exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Process Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
        >
          {processSteps.map((process, index) => (
            <motion.div
              key={process.step}
              className="relative group cursor-pointer"
              variants={cardVariants}
              onHoverStart={() => setActiveStep(index)}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              {/* Card Background with Glassmorphism */}
              <div 
                className={`
                  relative rounded-3xl p-8 shadow-2xl border border-white/10
                  transition-all duration-500 group-hover:scale-105
                  ${activeStep === index ? 'ring-2 ring-white/30' : ''}
                `}
                style={{
                  height: '400px',
                  background: process.bgColor.includes('cyan') ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' :
                             process.bgColor.includes('purple') ? 'linear-gradient(135deg, #a855f7, #ec4899)' :
                             process.bgColor.includes('emerald') ? 'linear-gradient(135deg, #10b981, #14b8a6)' :
                             'linear-gradient(135deg, #f97316, #ef4444)',
                  backdropFilter: 'blur(16px)'
                }}
              >
                {/* Particle Field */}
                <ParticleField count={12 + index * 3} color={process.accentColor} />
                
                {/* Glow Effect */}
                <div 
                  className={`
                    absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 
                    transition-opacity duration-500 blur-xl
                  `}
                  style={{
                    background: process.bgColor.includes('cyan') ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' :
                               process.bgColor.includes('purple') ? 'linear-gradient(135deg, #a855f7, #ec4899)' :
                               process.bgColor.includes('emerald') ? 'linear-gradient(135deg, #10b981, #14b8a6)' :
                               'linear-gradient(135deg, #f97316, #ef4444)'
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)'
                      }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span 
                        className="text-2xl font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #1f2937, #374151)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {process.step}
                      </span>
                    </motion.div>
                    
                    <motion.div
                      className="text-4xl"
                      animate={{ 
                        rotate: activeStep === index ? [0, 360] : 0,
                        scale: activeStep === index ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      {process.icon}
                    </motion.div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                      {process.title}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {process.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed flex-grow" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {process.desc}
                  </p>

                  {/* Bottom Accent */}
                  <motion.div
                    className="h-1 rounded-full mt-6"
                    style={{ background: 'rgba(255, 255, 255, 0.3)' }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>

                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 z-20"
                    style={{
                      background: 'linear-gradient(to right, rgba(255, 255, 255, 0.5), transparent)'
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                  />
                )}
              </div>

              {/* Interactive Hover Overlay */}
              <AnimatePresence>
                {activeStep === index && (
                  <motion.div
                    className="absolute -inset-2 rounded-3xl blur-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="flex justify-center mb-20 space-x-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {processSteps.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index 
                  ? 'scale-150' 
                  : 'hover:scale-125'
              }`}
              style={{
                background: activeStep === index 
                  ? 'linear-gradient(135deg, #06b6d4, #a855f7)' 
                  : 'rgba(255, 255, 255, 0.3)'
              }}
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.button
            className="group relative px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-300 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
              color: 'white'
            }}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Ready to Start Your Project?</span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #06b6d4)'
              }}
              layoutId="button-bg"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default DevelopmentProcessSection;
