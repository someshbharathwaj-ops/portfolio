'use client';

import React, { useState, useEffect } from 'react';
import ThreeDBackground from '../components/ThreeDBackground';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Learning from '../components/Learning';
import Certificates from '/components/Certificates';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false); // false = 3D background ON
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'learning', 'certificates', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <LoadingScreen loading={loading} />
      
      {!loading && (
        <>
          <ThreeDBackground performanceMode={performanceMode} />
          
          <Navigation
            activeSection={activeSection}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            performanceMode={performanceMode}
            setPerformanceMode={setPerformanceMode}
          />
          
          <main className="relative">
            <Hero />
            <div className="h-32"></div> {/* Transparent gap */}
            
            <About />
            <div className="h-32"></div> {/* Transparent gap */}
            
            <Projects />
            <div className="h-32"></div> {/* Transparent gap */}
            
            <Skills />
            <div className="h-32"></div> {/* Transparent gap */}
            
            <Learning />
            <div className="h-32"></div> {/* Transparent gap */}
            
            <Certificates />
            <div className="h-32"></div> {/* Transparent gap */}
            
            <Experience />
            <div className="h-32"></div> {/* Transparent gap */}
            
            <Contact />
            <div className="h-32"></div> {/* Transparent gap */}
          </main>
          
          
        </>
      )}
    </div>
  );
}