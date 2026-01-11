import React from 'react';

const LoadingScreen = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-cyan-400 text-lg">Loading Experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;