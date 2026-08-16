import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FeatureCardsProps {
  lang: Language;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 no-print">
      
      {/* Card 1: TDEE */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 text-right shadow-sm space-y-1 hover:border-[#007979]/50 hover:shadow-md hover:shadow-[#007979]/5 transition">
        <h3 className="text-sm font-bold text-slate-900">
          {t.card1Title}
        </h3>
        <p className="text-xs text-slate-500">
          {t.card1Subtitle}
        </p>
      </div>

      {/* Card 2: Protein Requirement */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 text-right shadow-sm space-y-1 hover:border-[#007979]/50 hover:shadow-md hover:shadow-[#007979]/5 transition">
        <h3 className="text-sm font-bold text-slate-900">
          {t.card2Title}
        </h3>
        <p className="text-xs text-slate-500">
          {t.card2Subtitle}
        </p>
      </div>

      {/* Card 3: Supplement Dosage */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 text-right shadow-sm space-y-1 hover:border-[#007979]/50 hover:shadow-md hover:shadow-[#007979]/5 transition">
        <h3 className="text-sm font-bold text-slate-900">
          {t.card3Title}
        </h3>
        <p className="text-xs text-slate-500">
          {t.card3Subtitle}
        </p>
      </div>

    </div>
  );
};
