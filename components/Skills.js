'use client';

import React from 'react';
import { Cpu, Database, Code, Wrench } from 'lucide-react';
import { SKILLS } from '../lib/config';

export default function Skills() {
  const iconMap = {
    "AI / ML": <Cpu className="text-cyan-400" size={28} />,
    "Data": <Database className="text-purple-400" size={28} />,
    "Software Engineering": <Code className="text-indigo-400" size={28} />,
    "Tools": <Wrench className="text-pink-400" size={28} />
  };

  return (
    <section id="skills" className="relative w-full min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-32">
        <div className="relative z-10">
          {/* Section Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 md:mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Skills
          </h2>
          
          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {Object.entries(SKILLS).map(([category, skills], idx) => (
              <div
                key={category}
                className="backdrop-blur-md bg-slate-800/30 rounded-xl p-6 md:p-8 border border-indigo-500/20 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  {iconMap[category]}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-200">{category}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {skills.map(skill => (
                    <div
                      key={skill}
                      className="px-4 py-3 bg-slate-900/50 rounded-lg text-slate-300 text-sm hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300 text-center"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}