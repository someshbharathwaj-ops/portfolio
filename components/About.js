'use client';

import React from 'react';
import { CONFIG } from '../lib/config';

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-screen flex items-center bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-20 md:py-32">
        <div className="relative z-10">
          {/* Section Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 md:mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          {/* Content Card */}
          <div className="backdrop-blur-md bg-slate-800/30 rounded-2xl p-6 sm:p-8 md:p-12 border border-indigo-500/20 shadow-2xl">
            {/* Summary */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
              {CONFIG.personal.summary}
            </p>
            
            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Core Interests */}
              <div className="p-6 md:p-8 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-xl md:text-2xl font-semibold text-cyan-400 mb-4">Core Interests</h3>
                <p className="text-slate-300 leading-relaxed">{CONFIG.personal.interests}</p>
              </div>
              
              {/* Career Direction */}
              <div className="p-6 md:p-8 rounded-xl bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-xl md:text-2xl font-semibold text-purple-400 mb-4">Career Direction</h3>
                <p className="text-slate-300 leading-relaxed">{CONFIG.personal.direction}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}