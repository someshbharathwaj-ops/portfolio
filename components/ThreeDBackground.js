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
    let stars = [];
    let shootingStars = [];
    let nebulaParticles = [];
    let lightRays = [];
    let time = 0;
    let cameraZ = 0;
    let cameraShake = { x: 0, y: 0 };
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse = { x: canvas.width / 2, y: canvas.height / 2 };
      initSpace();
    };
    
    const initSpace = () => {
      stars = [];
      nebulaParticles = [];
      lightRays = [];
      
      // Multiple layers of stars for incredible depth
      for (let i = 0; i < 800; i++) {
        const depth = Math.random();
        stars.push({
          x: (Math.random() - 0.5) * canvas.width * 4,
          y: (Math.random() - 0.5) * canvas.height * 4,
          z: Math.random() * 3000 + 500,
          size: Math.random() * 3 + 0.5,
          brightness: Math.random(),
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          speed: Math.random() * 2 + 0.5,
          color: depth > 0.95 ? '#22D3EE' : depth > 0.85 ? '#A855F7' : depth > 0.75 ? '#60A5FA' : '#FFFFFF',
          depth: depth
        });
      }
      
      // Nebula particles for atmosphere
      for (let i = 0; i < 100; i++) {
        nebulaParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 2000,
          size: Math.random() * 60 + 40,
          opacity: Math.random() * 0.15 + 0.05,
          color: Math.random() > 0.5 ? '#8B5CF6' : '#3B82F6',
          drift: (Math.random() - 0.5) * 0.3,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.01 + 0.005
        });
      }
      
      // Light rays for dramatic effect
      for (let i = 0; i < 8; i++) {
        lightRays.push({
          angle: (Math.PI * 2 / 8) * i,
          length: Math.random() * 400 + 300,
          opacity: Math.random() * 0.1 + 0.05,
          rotation: Math.random() * 0.001
        });
      }
    };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const createShootingStar = () => {
      if (Math.random() > 0.98 && shootingStars.length < 8) {
        const side = Math.floor(Math.random() * 4);
        let x, y, angle;
        
        switch(side) {
          case 0: x = Math.random() * canvas.width; y = -100; angle = Math.PI / 3 + (Math.random() - 0.5) * 0.4; break;
          case 1: x = canvas.width + 100; y = Math.random() * canvas.height; angle = Math.PI * 0.75 + (Math.random() - 0.5) * 0.4; break;
          case 2: x = Math.random() * canvas.width; y = canvas.height + 100; angle = -Math.PI / 3 + (Math.random() - 0.5) * 0.4; break;
          default: x = -100; y = Math.random() * canvas.height; angle = (Math.random() - 0.5) * 0.4; break;
        }
        
        shootingStars.push({
          x, y, angle,
          length: Math.random() * 200 + 100,
          speed: Math.random() * 12 + 6,
          opacity: 1,
          thickness: Math.random() * 3 + 1.5,
          color: Math.random() > 0.7 ? '#22D3EE' : '#FFFFFF'
        });
      }
    };
    
    const drawStar = (star) => {
      // Cinematic camera movement
      cameraZ += 0.5;
      star.z -= star.speed + cameraZ * 0.01;
      
      if (star.z <= 1) {
        star.z = 3500;
        star.x = (Math.random() - 0.5) * canvas.width * 4;
        star.y = (Math.random() - 0.5) * canvas.height * 4;
      }
      
      // 3D perspective projection
      const scale = 2000 / (2000 + star.z);
      const parallaxX = (mouse.x - canvas.width / 2) * star.depth * 0.08 + cameraShake.x;
      const parallaxY = (mouse.y - canvas.height / 2) * star.depth * 0.08 + cameraShake.y;
      
      const x = star.x * scale + canvas.width / 2 + parallaxX;
      const y = star.y * scale + canvas.height / 2 + parallaxY;
      const size = star.size * scale;
      
      // Motion blur for speed
      const prevScale = 2000 / (2000 + star.z + star.speed);
      const prevX = star.x * prevScale + canvas.width / 2 + parallaxX;
      const prevY = star.y * prevScale + canvas.height / 2 + parallaxY;
      
      // Cinematic twinkling - REMOVED for steady stars
      const brightness = star.brightness;
      const opacity = brightness * (1 - star.z / 3500) * 0.9;
      
      if (opacity > 0.05 && size > 0.3 && x > -100 && x < canvas.width + 100 && y > -100 && y < canvas.height + 100) {
        // Motion streak for hyperspace effect
        if (scale > 0.8) {
          const streakGradient = ctx.createLinearGradient(x, y, prevX, prevY);
          streakGradient.addColorStop(0, `${star.color}${Math.floor(opacity * 150).toString(16).padStart(2, '0')}`);
          streakGradient.addColorStop(1, `${star.color}00`);
          ctx.strokeStyle = streakGradient;
          ctx.lineWidth = size * 0.5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(prevX, prevY);
          ctx.stroke();
        }
        
        // Lens flare for bright stars
        if (brightness > 0.7 && scale > 0.5) {
          ctx.shadowBlur = 30 * scale;
          ctx.shadowColor = star.color;
          
          // Cross flare
          const flareSize = size * 15;
          const flareGradient = ctx.createRadialGradient(x, y, 0, x, y, flareSize);
          flareGradient.addColorStop(0, `${star.color}${Math.floor(opacity * 100).toString(16).padStart(2, '0')}`);
          flareGradient.addColorStop(0.3, `${star.color}${Math.floor(opacity * 40).toString(16).padStart(2, '0')}`);
          flareGradient.addColorStop(1, `${star.color}00`);
          ctx.fillStyle = flareGradient;
          ctx.beginPath();
          ctx.arc(x, y, flareSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Horizontal and vertical rays
          ctx.globalAlpha = opacity * 0.3;
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - flareSize * 2, y);
          ctx.lineTo(x + flareSize * 2, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y - flareSize * 2);
          ctx.lineTo(x, y + flareSize * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          
          ctx.shadowBlur = 0;
        }
        
        // Star glow with chromatic aberration
        const glowSize = size * 8;
        
        // Blue channel shift
        const blueGlow = ctx.createRadialGradient(x - 0.5, y - 0.5, 0, x - 0.5, y - 0.5, glowSize);
        blueGlow.addColorStop(0, `rgba(100, 150, 255, ${opacity * 0.6})`);
        blueGlow.addColorStop(1, 'rgba(100, 150, 255, 0)');
        ctx.fillStyle = blueGlow;
        ctx.beginPath();
        ctx.arc(x - 0.5, y - 0.5, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Red channel shift
        const redGlow = ctx.createRadialGradient(x + 0.5, y + 0.5, 0, x + 0.5, y + 0.5, glowSize);
        redGlow.addColorStop(0, `rgba(255, 150, 100, ${opacity * 0.6})`);
        redGlow.addColorStop(1, 'rgba(255, 150, 100, 0)');
        ctx.fillStyle = redGlow;
        ctx.beginPath();
        ctx.arc(x + 0.5, y + 0.5, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Main glow
        const mainGlow = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        mainGlow.addColorStop(0, `${star.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        mainGlow.addColorStop(0.4, `${star.color}${Math.floor(opacity * 150).toString(16).padStart(2, '0')}`);
        mainGlow.addColorStop(1, `${star.color}00`);
        ctx.fillStyle = mainGlow;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Bright core
        ctx.fillStyle = `${star.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    const drawNebula = (particle) => {
      particle.pulse += particle.pulseSpeed;
      const pulseScale = 0.9 + Math.sin(particle.pulse) * 0.1;
      
      particle.z -= 0.3;
      if (particle.z <= 1) {
        particle.z = 2000;
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
      }
      
      const scale = 1000 / (1000 + particle.z);
      const x = (particle.x - canvas.width / 2) * scale + canvas.width / 2 + particle.drift;
      const y = (particle.y - canvas.height / 2) * scale + canvas.height / 2;
      const size = particle.size * scale * pulseScale;
      const opacity = particle.opacity * (1 - particle.z / 2000);
      
      if (opacity > 0.01) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `${particle.color}${Math.floor(opacity * 80).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${particle.color}${Math.floor(opacity * 40).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${particle.color}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      particle.x += particle.drift;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
    };
    
    const drawLightRays = () => {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      lightRays.forEach(ray => {
        ray.angle += ray.rotation;
        
        const gradient = ctx.createLinearGradient(0, 0, Math.cos(ray.angle) * ray.length, Math.sin(ray.angle) * ray.length);
        gradient.addColorStop(0, `rgba(139, 92, 246, ${ray.opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${ray.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(ray.angle) * ray.length, Math.sin(ray.angle) * ray.length);
        ctx.stroke();
      });
      
      ctx.restore();
    };
    
    const drawShootingStar = (star, index) => {
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      star.opacity -= 0.004;
      
      if (star.opacity <= 0) {
        shootingStars.splice(index, 1);
        return;
      }
      
      // Epic glowing trail
      const gradient = ctx.createLinearGradient(
        star.x, star.y,
        star.x - Math.cos(star.angle) * star.length,
        star.y - Math.sin(star.angle) * star.length
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
      gradient.addColorStop(0.2, `${star.color}${Math.floor(star.opacity * 200).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(0.6, `${star.color}${Math.floor(star.opacity * 100).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${star.color}00`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = star.thickness * 3;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 25;
      ctx.shadowColor = star.color;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(
        star.x - Math.cos(star.angle) * star.length,
        star.y - Math.sin(star.angle) * star.length
      );
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Intense head glow
      const headGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 25);
      headGlow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
      headGlow.addColorStop(0.3, `${star.color}${Math.floor(star.opacity * 180).toString(16).padStart(2, '0')}`);
      headGlow.addColorStop(1, `${star.color}00`);
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.arc(star.x, star.y, 25, 0, Math.PI * 2);
      ctx.fill();
      
      // Bright core
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
      ctx.fill();
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    
    const animate = () => {
      time += 0.016;
      
      // Subtle camera shake for cinematic feel
      cameraShake.x = Math.sin(time * 0.8) * 1.5 + Math.sin(time * 2.3) * 0.5;
      cameraShake.y = Math.cos(time * 0.6) * 1.5 + Math.cos(time * 1.9) * 0.5;
      
      // Ultra deep space gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 1.2
      );
      bgGradient.addColorStop(0, '#0f0820');
      bgGradient.addColorStop(0.3, '#0a0515');
      bgGradient.addColorStop(0.6, '#050310');
      bgGradient.addColorStop(0.85, '#020108');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Animated nebula background
      ctx.globalAlpha = 0.2;
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.2 + Math.sin(time * 0.1) * 150,
        canvas.height * 0.3 + Math.cos(time * 0.15) * 150,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        600
      );
      nebula1.addColorStop(0, '#8B5CF6');
      nebula1.addColorStop(0.5, '#6D28D9');
      nebula1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.12) * 150,
        canvas.height * 0.6 + Math.sin(time * 0.18) * 150,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        500
      );
      nebula2.addColorStop(0, '#3B82F6');
      nebula2.addColorStop(0.5, '#1E40AF');
      nebula2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      
      // Draw light rays
      drawLightRays();
      
      // Draw nebula particles
      nebulaParticles.forEach(drawNebula);
      
      // Draw stars (sorted by depth for proper layering)
      stars.sort((a, b) => b.z - a.z);
      stars.forEach(drawStar);
      
      // Create and draw shooting stars
      createShootingStar();
      shootingStars.forEach(drawShootingStar);
      
      // Film grain effect
      ctx.globalAlpha = 0.03;
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#FFFFFF' : '#000000';
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1, 1
        );
      }
      ctx.globalAlpha = 1;
      
      // Cinematic vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.9
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [performanceMode]);
  
  if (performanceMode) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}