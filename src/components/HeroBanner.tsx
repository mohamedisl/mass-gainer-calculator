import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Flame, Dumbbell, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroBannerProps {
  lang: Language;
}

interface GymSlide {
  id: number;
  url: string;
  alt: string;
  taglineAr: string;
  taglineFr: string;
}

const gymSlides: GymSlide[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop',
    alt: 'Modern Gym with Weights and Equipment',
    taglineAr: 'حقق أفضل أداء بدني وتغذوي',
    taglineFr: 'Atteignez vos objectifs physiques et nutritionnels',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1920&auto=format&fit=crop',
    alt: 'Athlete Heavy Lifting and Muscle Training',
    taglineAr: 'بناء العضلات وحرق الدهون بدقة علمية',
    taglineFr: 'Développement musculaire & sèche calculée',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1920&auto=format&fit=crop',
    alt: 'CrossFit and Functional Gym Workout',
    taglineAr: 'تخطيط السعرات واحتياج البروتين اليومي',
    taglineFr: 'Planification précise des calories et protéines',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1920&auto=format&fit=crop',
    alt: 'Premium Gym Studio and Dumbbells',
    taglineAr: 'جرعات المكمل الغذائي المناسبة لهدفك',
    taglineFr: 'Dosage optimal de vos compléments alimentaires',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ lang }) => {
  const t = translations[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % gymSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + gymSlides.length) % gymSlides.length);
  }, []);

  // Automatic slide interval (every 4.5 seconds when not hovered)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const activeSlide = gymSlides[currentIndex];

  return (
    <section 
      aria-label="Hero Section"
      className="relative w-full overflow-hidden shadow-2xl border-b border-slate-200/80 no-print"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Slider with Automatic Cross-Fade & Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.url}
              alt={activeSlide.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated Dark Gradient & Brand Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#007979]/50 via-slate-950/30 to-[#007979]/50" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#007979 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Hero Foreground Content - Centered with Safe Margin Clearance so arrows never cover text */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-12 sm:px-20 md:px-28 py-12 sm:py-16 md:py-20 text-center space-y-5 sm:space-y-6 text-white">
        
        {/* Dynamic Tagline from Current Slide */}
        <div className="h-7 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-xs sm:text-sm md:text-base font-bold text-teal-300 tracking-wide uppercase font-mono"
            >
              {lang === 'ar' ? activeSlide.taglineAr : activeSlide.taglineFr}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-lg">
          {t.heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-md">
          {t.heroSubtitle}
        </p>

        {/* 3 Quick Value Highlights */}
        <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-slate-200">
          <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/10 transition shadow-sm">
           
            <span className="font-semibold text-[11px] sm:text-xs md:text-sm">
              {lang === 'ar' ? 'معادلة Mifflin-St Jeor' : 'Formule Mifflin-St Jeor'}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/10 transition shadow-sm">
            
            <span className="font-semibold text-[11px] sm:text-xs md:text-sm">
              {lang === 'ar' ? 'احتياج البروتين والماكروز' : 'Macros & Protéines'}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/10 transition shadow-sm">
            
            <span className="font-semibold text-[11px] sm:text-xs md:text-sm">
              {lang === 'ar' ? 'تخصيص المكملات والسكوبات' : 'Dosage Compléments'}
            </span>
          </div>
        </div>

      </div>

      {/* Manual Slide Controls (Positioned at extreme edges with guaranteed text clearance) */}
      <div dir="ltr" className="absolute inset-y-0 left-2 sm:left-4 md:left-6 right-2 sm:right-4 md:right-6 flex items-center justify-between pointer-events-none z-20">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-[#007979]/85 text-white/90 hover:text-white backdrop-blur-sm border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-[#007979]/85 text-white/90 hover:text-white backdrop-blur-sm border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Indicators & Progress Dots */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-2.5">
        {gymSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full h-2 ${
                isActive 
                  ? 'w-9 bg-[#007979] ring-2 ring-[#7CD5C7]/70 shadow-md' 
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};
