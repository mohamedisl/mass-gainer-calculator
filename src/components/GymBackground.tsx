import React from 'react';
import { motion } from 'motion/react';

export const GymBackground: React.FC = () => {
  return (
    <div
      id="app-professional-background"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 no-print select-none bg-slate-50"
      aria-hidden="true"
    >
      {/* 1. Subtle Radial Ambient Lighting Mesh */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#007979]/8 via-[#7CD5C7]/5 to-transparent rounded-[100%] blur-3xl opacity-80" 
      />
      <div 
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/5 via-slate-200/20 to-transparent rounded-full blur-3xl" 
      />
      <div 
        className="absolute bottom-10 -left-40 w-[650px] h-[650px] bg-gradient-to-tr from-slate-200/40 via-[#007979]/4 to-transparent rounded-full blur-3xl" 
      />

      {/* 2. Precision Geometric Cross Grid (High-Tech Architectural Aesthetic) */}
      <svg
        className="absolute inset-0 w-full h-full stroke-slate-200/50 [mask-image:radial-gradient(100%_100%_at_top_center,white_30%,transparent_90%)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="pro-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(0, 0)"
          >
            <path d="M.5 48V.5H48" fill="none" strokeWidth="1" />
            <circle cx="0.5" cy="0.5" r="1" className="fill-slate-300/80" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#pro-grid-pattern)" />
      </svg>

      {/* 3. Subtle Corner Technical Accents (Precision Lab / Sports Science) */}
      <div className="absolute top-6 left-6 opacity-25 hidden lg:block">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#007979]" />
          <span>BIO-METRIC / NUTRITION LAB</span>
        </div>
        <div className="w-16 h-px bg-slate-300 mt-1" />
      </div>

      <div className="absolute top-6 right-6 opacity-25 hidden lg:block text-right">
        <div className="font-mono text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
          SYS.CALC v2.4
        </div>
        <div className="w-16 h-px bg-slate-300 mt-1 ml-auto" />
      </div>

      {/* 4. Fine Ambient Soft Waveform Line (Scientific ECG / Performance Flow) */}
      <svg
        className="absolute bottom-16 inset-x-0 w-full h-32 opacity-15 stroke-[#007979]"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          d="M0,60 Q360,20 720,60 T1440,60"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
          d="M0,75 C240,40 480,100 720,70 C960,40 1200,90 1440,65"
          strokeWidth="1"
        />
      </svg>

      {/* 5. Minimal Grain Texture for Depth */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
    </div>
  );
};
