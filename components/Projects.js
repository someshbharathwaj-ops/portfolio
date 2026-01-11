'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { PROJECTS } from '../lib/config';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const categories = ['All', 'AI-ML', 'Systems', 'Software'];
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  
  return (
    <section id="projects" className="relative w-full min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-32">
        <div className="relative z-10">
          {/* Section Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 md:mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Projects
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="backdrop-blur-md bg-slate-800/30 rounded-xl p-6 border border-indigo-500/20 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-cyan-400 flex-1">{project.title}</h3>
                  <ExternalLink size={20} className="text-slate-400 flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-slate-300 text-sm mb-4 line-clamp-2">{project.tagline}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-cyan-500/30 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 flex-1">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-4"
              >
                <X size={24} />
              </button>
            </div>
            
            <p className="text-slate-300 mb-6">{selectedProject.tagline}</p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-purple-400 font-semibold mb-2 text-lg">Problem</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.problem}</p>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-semibold mb-2 text-lg">Approach</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.approach}</p>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-semibold mb-2 text-lg">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map(tech => (
                    <span key={tech} className="px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-semibold mb-2 text-lg">Outcome</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.outcome}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-slate-800 rounded-lg text-center hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Github size={20} />
                  GitHub
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-center hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}