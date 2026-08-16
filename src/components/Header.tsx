import React from 'react';
import { Language, SupplementProfile } from '../types';
import { translations } from '../data/translations';
import { Globe, Sliders, Activity } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCustomizerModal: () => void;
  supplementProfile?: SupplementProfile;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenCustomizerModal,
  supplementProfile,
}) => {
  const t = translations[lang];
  const brandDisplayName = supplementProfile?.brandName || t.appName;
  
  // Generate 2-letter initials from brand name or fallback
  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header dir="ltr" className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 no-print transition-all">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-3">
        
        {/* Left Side: Brand Identity & Subtitle Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#007979] text-white flex items-center justify-center font-black text-xs shadow-sm ring-2 ring-teal-100 shrink-0">
            {getInitials(brandDisplayName)}
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-extrabold text-slate-900 text-sm sm:text-base md:text-lg tracking-tight truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
              {brandDisplayName}
            </span>
            
          </div>
        </div>

        {/* Right Side: Parameters & Language Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Customizer / Parameters Button */}
          <button
            onClick={onOpenCustomizerModal}
            className="min-h-[36px] min-w-[36px] px-2.5 py-1.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-[#007979]/10 text-slate-700 hover:text-[#007979] border border-slate-200/60 transition flex items-center gap-1.5 active:scale-95 text-xs font-bold"
            title={t.customizeSupplement}
            aria-label={t.customizeSupplement}
          >
            <Sliders className="w-4 h-4 text-[#007979] shrink-0" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'تخصيص' : 'Paramètres'}</span>
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => onLanguageChange(lang === 'ar' ? 'fr' : 'ar')}
            className="min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#007979]/10 border border-slate-200/60 text-xs font-bold text-slate-700 hover:text-[#007979] transition flex items-center gap-1.5 active:scale-95"
            title={t.langToggle}
            aria-label={t.langToggle}
          >
            <Globe className="w-3.5 h-3.5 text-[#007979] shrink-0" />
            <span className="font-semibold">{lang === 'ar' ? 'FR' : 'عربي'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};

