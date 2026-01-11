'use client';

import React from 'react';
import { Code, Download } from 'lucide-react';
import { CONFIG } from '../lib/config';

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-32">
        <div className="text-center relative z-10">
          {/* Avatar Icon */}
          <div className="inline-block mb-8 animate-fade-in">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-indigo-600 p-1 animate-pulse">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <Code size={48} className="text-cyan-400" />
              </div>
            </div>
          </div>
          
          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-fade-in leading-tight">
            {CONFIG.personal.name}
          </h1>
          
          {/* Tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-8 animate-fade-in font-light">
            {CONFIG.personal.tagline}
          </p>
          
          {/* Intro */}
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in px-4">
            {CONFIG.personal.intro}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in px-4">
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href={CONFIG.resume.url}
              className="w-full sm:w-auto px-8 py-4 border-2 border-cyan-500/50 rounded-xl font-semibold text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 hover:-translate-y-1"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}