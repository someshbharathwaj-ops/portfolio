'use client';
import React from 'react';
import { CONFIG } from '../lib/config';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-indigo-500/20 relative">
      <div className="max-w-6xl mx-auto px-4 text-center z-10">
        <p className="text-slate-400 mb-2">
          © {year} {CONFIG.personal.name}
        </p>
        <p className="text-slate-500 text-sm">{CONFIG.personal.brandLine}</p>
      </div>
    </footer>
  );
};

export default Footer;