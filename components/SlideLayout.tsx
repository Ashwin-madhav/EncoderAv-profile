
import React from 'react';

interface SlideLayoutProps {
  children: React.ReactNode;
  active: boolean;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ children, active }) => {
  if (!active) return null;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden animate-slide-up">
      {/* 2D Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-purple-500/10 rounded-full animate-float opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-600/5 rounded-full blur-[100px] animate-pulse"></div>
      
      {/* Pixel decoration mimicking the logo */}
      <div className="absolute top-1/4 -left-10 opacity-20 hidden lg:block">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-purple-500 rounded-sm animate-pixel" style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>
      </div>

      <div className="z-10 w-full max-w-6xl h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default SlideLayout;
