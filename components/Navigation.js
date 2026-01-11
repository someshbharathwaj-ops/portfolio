'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { CONFIG } from '../lib/config';

export default function Navigation({ activeSection, darkMode, setDarkMode, performanceMode, setPerformanceMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const sections = ['Home', 'About', 'Projects', 'Skills', 'Learning', 'Experience', 'Contact'];
  
  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase());
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-xl bg-slate-900/90 shadow-lg shadow-indigo-500/10' : 'backdrop-blur-md bg-slate-900/70'
    } border-b border-indigo-500/20`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('Home')}
            className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-purple-400 transition-all"
          >
            {CONFIG.personal.name}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === section.toLowerCase()
                    ? 'text-cyan-400 bg-slate-800'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 md:p-2.5 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun size={20} className="text-slate-300" />
              ) : (
                <Moon size={20} className="text-slate-300" />
              )}
            </button>
            
            {/* Performance Mode */}
            <button
              onClick={() => setPerformanceMode(!performanceMode)}
              className={`hidden md:flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                performanceMode
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {performanceMode ? '⚡ Performance' : '3D Effects'}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={24} className="text-slate-300" />
              ) : (
                <Menu size={24} className="text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-indigo-500/20">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeSection === section.toLowerCase()
                    ? 'text-cyan-400 bg-slate-800'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {section}
              </button>
            ))}
            
            {/* Mobile Performance Toggle */}
            <button
              onClick={() => setPerformanceMode(!performanceMode)}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                performanceMode
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {performanceMode ? '⚡ Performance Mode' : 'Enable 3D Effects'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}