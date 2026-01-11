'use client';

import React from 'react';
import { CONFIG } from '../lib/config';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative py-12 border-t border-indigo-500/20 bg-slate-900/50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center relative z-10">
          <p className="text-slate-400 mb-3 text-base md:text-lg flex items-center justify-center gap-2">
            © {year} {CONFIG.personal.name}. Made with <Heart size={16} className="text-red-500 animate-pulse" fill="currentColor" /> and code
          </p>
          <p className="text-slate-500 text-sm md:text-base">{CONFIG.personal.brandLine}</p>
        </div>
      </div>
    </footer>
  );
}