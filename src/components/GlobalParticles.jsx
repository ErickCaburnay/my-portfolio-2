import React, { useEffect, useRef } from "react";

const GlobalParticles = ({ 
  particleCount = 20, 
  className = "",
  particleSize = "4px",
  colors = ["#00ff88", "#00e676", "#4fc3f7"],
  speed = "slow" // slow, medium, fast
}) => {
  const containerRef = useRef(null);

  const getAnimationDuration = () => {
    switch(speed) {
      case "fast": return { min: 8, max: 15 };
      case "medium": return { min: 12, max: 20 };
      case "slow": 
      default: return { min: 15, max: 30 };
    }
  };

  const { min, max } = getAnimationDuration();

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomPosition = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    return {
      x: Math.random() * width,
      y: Math.random() * height
    };
  };

  const getRandomSize = () => {
    const baseSize = parseInt(particleSize);
    return Math.random() * baseSize + baseSize * 0.5;
  };

  // Generate particles data
  const particles = [...Array(particleCount)].map((_, i) => {
    const duration = Math.random() * (max - min) + min;
    const delay = Math.random() * 5;
    const initialPos = getRandomPosition();
    const color = getRandomColor();
    const size = getRandomSize();
    
    return {
      id: i,
      duration,
      delay,
      initialPos,
      color,
      size,
      opacity: Math.random() * 0.6 + 0.3
    };
  });

  // Generate geometric shapes data
  const shapes = [...Array(Math.floor(particleCount / 4))].map((_, i) => {
    const shapeTypes = ['circle', 'square', 'triangle'];
    const shape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const size = Math.random() * 20 + 10;
    const duration = Math.random() * 20 + 25;
    const initialPos = getRandomPosition();
    
    return {
      id: `shape-${i}`,
      shape,
      size,
      duration,
      initialPos,
      color: getRandomColor(),
      delay: Math.random() * 8
    };
  });

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ 
        zIndex: 1,
        mixBlendMode: 'normal' // Changed from 'screen' for better visibility
      }}
    >
      {/* Main particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, ${particle.color}88)`,
            filter: `blur(${Math.random() * 1.5 + 0.5}px)`,
            boxShadow: `0 0 ${Math.random() * 15 + 10}px ${particle.color}66`,
            left: `${particle.initialPos.x}px`,
            top: `${particle.initialPos.y}px`,
            opacity: particle.opacity,
            animation: `float-${particle.id} ${particle.duration}s linear infinite ${particle.delay}s`,
            transform: `scale(${Math.random() * 0.5 + 0.5})`
          }}
        />
      ))}
      
      {/* Floating geometric shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            border: `2px solid ${shape.color}88`,
            backgroundColor: `${shape.color}22`,
            borderRadius: shape.shape === 'circle' ? '50%' : shape.shape === 'square' ? '8px' : '0',
            clipPath: shape.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            left: `${shape.initialPos.x}px`,
            top: `${shape.initialPos.y}px`,
            opacity: 0.4,
            animation: `drift-${shape.id} ${shape.duration}s ease-in-out infinite ${shape.delay}s`,
            backdropFilter: 'blur(1px)'
          }}
        />
      ))}

      {/* Light rays */}
      {[...Array(3)].map((_, i) => {
        const position = getRandomPosition();
        return (
          <div
            key={`ray-${i}`}
            className="absolute"
            style={{
              width: '3px',
              height: '120px',
              background: `linear-gradient(to bottom, transparent, ${getRandomColor()}44, transparent)`,
              left: `${position.x}px`,
              top: `${position.y}px`,
              transformOrigin: 'center bottom',
              opacity: 0.6,
              animation: `rotate-ray-${i} ${Math.random() * 15 + 20}s linear infinite ${Math.random() * 10}s`
            }}
          />
        );
      })}

      {/* Enhanced CSS animations */}
      <style jsx>{`
        ${particles.map(particle => `
          @keyframes float-${particle.id} {
            0% {
              transform: translate(0, 0) scale(${Math.random() * 0.5 + 0.5}) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: ${particle.opacity};
            }
            50% {
              transform: translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 200}px) scale(${Math.random() * 1.2 + 0.8}) rotate(${Math.random() * 180}deg);
              opacity: ${particle.opacity * 1.2};
            }
            90% {
              opacity: ${particle.opacity * 0.8};
            }
            100% {
              transform: translate(${(Math.random() - 0.5) * 600}px, ${(Math.random() - 0.5) * 400}px) scale(${Math.random() * 0.3 + 0.2}) rotate(${Math.random() * 360}deg);
              opacity: 0;
            }
          }
        `).join('')}
        
        ${shapes.map(shape => `
          @keyframes drift-${shape.id} {
            0% {
              transform: translate(0, 0) rotate(0deg) scale(0.8);
              opacity: 0;
            }
            25% {
              opacity: 0.6;
            }
            50% {
              transform: translate(${Math.sin(shape.id) * 150}px, ${Math.cos(shape.id) * 100}px) rotate(180deg) scale(1.1);
              opacity: 0.8;
            }
            75% {
              opacity: 0.4;
            }
            100% {
              transform: translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 300}px) rotate(360deg) scale(0.5);
              opacity: 0;
            }
          }
        `).join('')}
        
        ${[...Array(3)].map((_, i) => `
          @keyframes rotate-ray-${i} {
            0% {
              transform: rotate(0deg) scaleY(0.5);
              opacity: 0;
            }
            50% {
              transform: rotate(180deg) scaleY(1.5);
              opacity: 0.6;
            }
            100% {
              transform: rotate(360deg) scaleY(0.5);
              opacity: 0;
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default GlobalParticles;