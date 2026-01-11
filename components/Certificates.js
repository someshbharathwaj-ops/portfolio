'use client';

import React, { useState } from 'react';
import { Award, ExternalLink, Calendar, Building2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CERTIFICATES } from '../lib/config';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const radius = 320;
  const angleStep = (2 * Math.PI) / CERTIFICATES.length;

  const rotateLeft = () => {
    setRotation(rotation + angleStep);
  };

  const rotateRight = () => {
    setRotation(rotation - angleStep);
  };

  const handleCertClick = (cert, index) => {
    const targetRotation = -index * angleStep;
    setRotation(targetRotation);
    setTimeout(() => setSelectedCert(cert), 300);
  };

  return (
    <section id="certificates" className="relative w-full min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden">
      {/* Ensure everything is above the background */}
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-50">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 md:mb-20 text-center">
          <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
            Certificates & Achievements
          </span>
        </h2>

        {/* Dark Background Panel */}
        <div className="relative bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-700/50 p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center">
            {/* Circular Carousel Container */}
            <div className="relative w-full max-w-5xl" style={{ height: '700px' }}>
              {/* Center Circle - Enhanced visibility */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.4)] z-[200]">
                <Award size={56} className="text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              </div>

              {/* Orbit Ring - More visible */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[90]">
                <div 
                  className="rounded-full border-2 border-dashed border-cyan-500/30"
                  style={{ 
                    width: `${radius * 2}px`, 
                    height: `${radius * 2}px`,
                    animation: 'spin 80s linear infinite',
                    boxShadow: '0 0 30px rgba(34, 211, 238, 0.15)'
                  }}
                />
              </div>

              {/* Certificate Cards in Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                {CERTIFICATES.map((cert, index) => {
                  const angle = index * angleStep + rotation;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                  const distanceFromFront = Math.abs(normalizedAngle - Math.PI / 2);
                  const scale = 1 - (distanceFromFront / Math.PI) * 0.4;
                  const opacity = 1 - (distanceFromFront / Math.PI) * 0.5;
                  const zIndex = Math.floor(scale * 100) + 100;
                  
                  const isHovered = hoveredIndex === index;
                  const isFront = distanceFromFront < 0.5;

                  return (
                    <div
                      key={cert.id}
                      onClick={() => handleCertClick(cert, index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out cursor-pointer"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isHovered ? scale * 1.15 : scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                      }}
                    >
                      <div 
                        className={`backdrop-blur-xl rounded-2xl p-5 border-2 transition-all duration-300 w-64 shadow-2xl ${
                          isHovered 
                            ? 'bg-slate-800/95 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.6)]' 
                            : isFront
                            ? 'bg-slate-800/90 border-cyan-500/60 shadow-[0_0_25px_rgba(34,211,238,0.3)]'
                            : 'bg-slate-900/85 border-cyan-500/30'
                        }`}
                      >
                        {/* Certificate Icon */}
                        <div className="mb-4 flex justify-center">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center border-2 transition-all duration-300 ${
                            isHovered ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'border-cyan-500/40'
                          }`}>
                            <Award size={32} className={`${isHovered ? 'text-cyan-300' : 'text-cyan-400'}`} />
                          </div>
                        </div>

                        {/* Certificate Name */}
                        <h3 className={`text-base font-bold mb-3 line-clamp-2 text-center transition-colors duration-300 ${
                          isHovered ? 'text-cyan-300' : 'text-cyan-400'
                        }`} style={{ textShadow: isHovered ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none' }}>
                          {cert.name}
                        </h3>

                        {/* Issuer */}
                        <div className="flex items-center gap-2 mb-3 justify-center">
                          <Building2 size={14} className="text-purple-400 flex-shrink-0" />
                          <span className="text-sm text-purple-200 font-medium line-clamp-1">{cert.issuer}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2 justify-center mb-4">
                          <Calendar size={14} className="text-slate-300 flex-shrink-0" />
                          <span className="text-sm text-slate-200">{cert.date}</span>
                        </div>

                        {/* Skills Preview */}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                            {cert.skills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 bg-purple-500/25 text-purple-200 text-xs rounded-full border border-purple-400/40 font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 3 && (
                              <span className="px-2.5 py-1 text-cyan-300 text-xs font-medium">
                                +{cert.skills.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Click hint */}
                        {isHovered && (
                          <div className="text-center pt-3 border-t border-cyan-500/30 animate-pulse">
                            <span className="text-sm text-cyan-300 font-bold">Click to view details</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-8 mt-12 z-[250]">
              <button
                onClick={rotateLeft}
                className="p-5 rounded-full bg-slate-800/80 backdrop-blur-xl border-2 border-cyan-500/50 hover:bg-slate-700 hover:border-cyan-400 transition-all duration-300 transform hover:scale-110 group shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                aria-label="Rotate left"
              >
                <ChevronLeft size={28} className="text-cyan-300 group-hover:text-cyan-200" />
              </button>

              <div className="text-center bg-slate-800/60 backdrop-blur-xl px-8 py-4 rounded-2xl border border-cyan-500/30 shadow-lg">
                <p className="text-cyan-300 text-lg font-bold mb-1">
                  {CERTIFICATES.length} Certificates
                </p>
                <p className="text-slate-300 text-sm">
                  Click cards or use arrows
                </p>
              </div>

              <button
                onClick={rotateRight}
                className="p-5 rounded-full bg-slate-800/80 backdrop-blur-xl border-2 border-cyan-500/50 hover:bg-slate-700 hover:border-cyan-400 transition-all duration-300 transform hover:scale-110 group shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                aria-label="Rotate right"
              >
                <ChevronRight size={28} className="text-cyan-300 group-hover:text-cyan-200" />
              </button>
            </div>

            {/* Helper Text */}
            <div className="mt-8 text-center z-[250]">
              <p className="text-slate-300 text-base font-medium">
                🎯 Hover over certificates to highlight • 👆 Click to view details
              </p>
            </div>
          </div>
        </div>
        {/* End of Dark Background Panel */}
      </div>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[300] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 max-w-3xl w-full border-2 border-cyan-500/50 max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(34,211,238,0.4)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-start gap-5 flex-1">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center border-2 border-cyan-400/60 flex-shrink-0 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  <Award size={40} className="text-cyan-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold text-cyan-300 mb-3 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                    {selectedCert.name}
                  </h3>
                  <p className="text-xl text-purple-300 font-semibold mb-3">{selectedCert.issuer}</p>
                  <div className="flex items-center gap-2 text-slate-200">
                    <Calendar size={18} className="text-cyan-400" />
                    <span className="text-sm font-medium">Issued: {selectedCert.date}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-4 p-2 hover:bg-slate-700/50 rounded-xl"
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Credential ID */}
              {selectedCert.credentialId && (
                <div className="bg-slate-900/60 backdrop-blur-sm p-5 rounded-xl border border-cyan-500/30">
                  <h4 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">
                    Credential ID
                  </h4>
                  <p className="text-slate-100 font-mono text-sm">{selectedCert.credentialId}</p>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-lg font-bold text-purple-400 mb-3">Description</h4>
                <p className="text-slate-100 leading-relaxed text-base">{selectedCert.description}</p>
              </div>

              {/* Skills */}
              {selectedCert.skills && selectedCert.skills.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-purple-400 mb-4">Skills Covered</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedCert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2.5 bg-purple-500/25 text-purple-200 rounded-xl text-sm border border-purple-400/40 font-semibold shadow-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-cyan-500/30">
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-center hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all flex items-center justify-center gap-3 font-bold text-lg"
                  >
                    <ExternalLink size={22} />
                    View Certificate
                  </a>
                )}
                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-4 bg-slate-700/80 backdrop-blur-sm border-2 border-slate-600 hover:border-purple-400 rounded-xl text-center hover:bg-slate-600 transition-all flex items-center justify-center gap-3 font-bold text-lg"
                  >
                    <Award size={22} />
                    Verify Credential
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}