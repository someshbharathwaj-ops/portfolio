'use client';

import React, { useRef, useEffect } from 'react';

export default function ThreeDBackground({ performanceMode }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (performanceMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2 + 1,
          baseSize: Math.random() * 2 + 1,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    
    const animate = () => {
      // Create trailing effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        // Update pulse effect
        p.pulsePhase += p.pulseSpeed;
        p.size = p.baseSize + Math.sin(p.pulsePhase) * 0.5;
        
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 0.5;
            p.vy -= Math.sin(angle) * force * 0.5;
          }
        }
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges with damping
        if (p.x < 0 || p.x > canvas.width) {
          p.vx *= -0.95;
          p.x = Math.max(0, Math.min(canvas.width, p.x));
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.vy *= -0.95;
          p.y = Math.max(0, Math.min(canvas.height, p.y));
        }
        
        // Apply friction
        p.vx *= 0.998;
        p.vy *= 0.998;
        
        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.3;
            
            // Create gradient line
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(99, 102, 241, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 1.2})`);
            gradient.addColorStop(1, `rgba(99, 102, 241, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
        
        // Draw particle with enhanced glow
        const glowSize = p.size * 4;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 1)');
        gradient.addColorStop(0.2, 'rgba(139, 92, 246, 0.8)');
        gradient.addColorStop(0.4, 'rgba(99, 102, 241, 0.4)');
        gradient.addColorStop(0.7, 'rgba(99, 102, 241, 0.1)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core
        ctx.fillStyle = `rgba(${139 + Math.sin(p.pulsePhase) * 20}, ${92 + Math.sin(p.pulsePhase) * 20}, 246, 1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [performanceMode]);
  
  if (performanceMode) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}