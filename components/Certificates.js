'use client';

import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, Calendar, Building2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CERTIFICATES } from '../lib/config';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const radius = 280; // Radius of the circle
  const angleStep = (2 * Math.PI) / CERTIFICATES.length;

  const rotateLeft = () => {
    setRotation(rotation + angleStep);
  };

  const rotateRight = () => {
    setRotation(rotation - angleStep);
  };

  const handleCertClick = (cert, index) => {
    // Rotate to center the clicked certificate
    const targetRotation = -index * angleStep;
    setRotation(targetRotation);
    setTimeout(() => setSelectedCert(cert), 300);
  };

  return (
    <section id="certificates" className="relative w-full min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-32">
        <div className="relative z-10">
          {/* Section Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 md:mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Certificates & Achievements
          </h2>

          <div className="flex flex-col items-center">
            {/* Circular Carousel Container */}
            <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center mb-8">
              {/* Center Circle - Decorative */}
              <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/30 flex items-center justify-center backdrop-blur-md z-10">
                <Award size={48} className="text-cyan-400" />
              </div>

              {/* Orbit Ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="absolute rounded-full border-2 border-dashed border-indigo-500/20"
                  style={{ 
                    width: `${radius * 2}px`, 
                    height: `${radius * 2}px`,
                    animation: 'spin 60s linear infinite'
                  }}
                />
              </div>

              {/* Certificate Cards in Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                {CERTIFICATES.map((cert, index) => {
                  const angle = index * angleStep + rotation;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  // Calculate scale and opacity based on position
                  const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                  const distanceFromFront = Math.abs(normalizedAngle - Math.PI / 2);
                  const scale = 1 - (distanceFromFront / Math.PI) * 0.5;
                  const opacity = 1 - (distanceFromFront / Math.PI) * 0.6;
                  const zIndex = Math.floor(scale * 100);
                  
                  const isHovered = hoveredIndex === index;

                  return (
                    <div
                      key={cert.id}
                      onClick={() => handleCertClick(cert, index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="absolute transition-all duration-500 ease-out cursor-pointer"
                      style={{
                        transform: `translate(${x}px, ${y}px) scale(${isHovered ? scale * 1.1 : scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                      }}
                    >
                      <div 
                        className={`backdrop-blur-md bg-slate-800/40 rounded-xl p-4 border transition-all duration-300 w-48 ${
                          isHovered 
                            ? 'border-cyan-500/70 shadow-2xl shadow-cyan-500/30' 
                            : 'border-indigo-500/20'
                        }`}
                      >
                        {/* Certificate Icon */}
                        <div className="mb-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30">
                            <Award size={24} className="text-cyan-400" />
                          </div>
                        </div>

                        {/* Certificate Name */}
                        <h3 className="text-sm font-bold text-cyan-400 mb-2 line-clamp-2">
                          {cert.name}
                        </h3>

                        {/* Issuer */}
                        <div className="flex items-center gap-1 text-slate-300 mb-2">
                          <Building2 size={12} className="text-purple-400 flex-shrink-0" />
                          <span className="text-xs line-clamp-1">{cert.issuer}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-1 text-slate-400">
                          <Calendar size={12} className="flex-shrink-0" />
                          <span className="text-xs">{cert.date}</span>
                        </div>

                        {/* Click hint */}
                        {isHovered && (
                          <div className="mt-3 text-center">
                            <span className="text-xs text-cyan-400 font-medium">Click to view</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={rotateLeft}
                className="p-4 rounded-full bg-slate-800/50 border border-cyan-500/30 hover:bg-slate-800 hover:border-cyan-500 transition-all duration-300 transform hover:scale-110 group"
                aria-label="Rotate left"
              >
                <ChevronLeft size={24} className="text-cyan-400 group-hover:text-cyan-300" />
              </button>

              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  {CERTIFICATES.length} Certificates
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Click cards or use arrows
                </p>
              </div>

              <button
                onClick={rotateRight}
                className="p-4 rounded-full bg-slate-800/50 border border-cyan-500/30 hover:bg-slate-800 hover:border-cyan-500 transition-all duration-300 transform hover:scale-110 group"
                aria-label="Rotate right"
              >
                <ChevronRight size={24} className="text-cyan-400 group-hover:text-cyan-300" />
              </button>
            </div>

            {/* Helper Text */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Hover over certificates to highlight • Click to view details
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-cyan-500/30 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30 flex-shrink-0">
                  <Award size={32} className="text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">
                    {selectedCert.name}
                  </h3>
                  <p className="text-purple-400 font-medium text-lg">{selectedCert.issuer}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-4"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Date and ID */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar size={18} className="text-cyan-400" />
                  <span className="text-sm">Issued: {selectedCert.date}</span>
                </div>
                {selectedCert.credentialId && (
                  <div className="text-slate-400 text-sm">
                    ID: <span className="text-slate-300 font-mono">{selectedCert.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedCert.description && (
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2 text-lg">Description</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedCert.description}</p>
                </div>
              )}

              {/* Skills Covered */}
              {selectedCert.skills && selectedCert.skills.length > 0 && (
                <div>
                  <h4 className="text-purple-400 font-semibold mb-3 text-lg">Skills Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-center hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
                  >
                    <ExternalLink size={20} />
                    View Certificate
                  </a>
                )}
                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-slate-800 rounded-lg text-center hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Award size={20} />
                    Verify
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}