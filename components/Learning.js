'use client';

import React from 'react';
import { LEARNING } from '../lib/config';

export default function Learning() {
  return (
    <section id="learning" className="relative w-full min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-20 md:py-32">
        <div className="relative z-10">
          {/* Section Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 md:mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Learning & Foundation
          </h2>
          
          {/* Learning Items */}
          <div className="space-y-6">
            {LEARNING.map((item, idx) => (
              <div
                key={idx}
                className="backdrop-blur-md bg-slate-800/30 rounded-xl p-6 md:p-8 border border-indigo-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-102"
              >
                <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-3">{item.title}</h3>
                {item.instructor && (
                  <p className="text-slate-400 text-sm md:text-base mb-4">Instructor: <span className="text-purple-400 font-medium">{item.instructor}</span></p>
                )}
                <p className="text-slate-300 leading-relaxed text-base md:text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}