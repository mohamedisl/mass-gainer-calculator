import React from 'react';
import { CalculationResults, SupplementProfile, Language } from '../types';
import { translations } from '../data/translations';
import { Share2, Printer, Sparkles } from 'lucide-react';

interface ResultsDisplayProps {
  results: CalculationResults;
  supplementProfile: SupplementProfile;
  lang: Language;
  onOpenShareModal: () => void;
  onPrint: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  supplementProfile,
  lang,
  onOpenShareModal,
  onPrint,
}) => {
  const t = translations[lang];

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900">
          {t.resultsTitle}
        </h2>

        {/* Quick Utility Icons (Share & Print) */}
        <div className="flex items-center gap-1.5 no-print">
          <button
            onClick={onOpenShareModal}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#007979]/10 text-slate-700 hover:text-[#007979] transition text-xs font-bold flex items-center gap-1 px-2.5"
            title={t.shareResult}
          >
            <Share2 className="w-3.5 h-3.5 text-[#007979]" />
            <span className="hidden sm:inline">{t.shareResult}</span>
          </button>
          <button
            onClick={onPrint}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#007979]/10 text-slate-700 hover:text-[#007979] transition text-xs font-bold flex items-center gap-1 px-2.5"
            title={t.printReport}
          >
            <Printer className="w-3.5 h-3.5 text-[#007979]" />
            <span className="hidden sm:inline">{t.printReport}</span>
          </button>
        </div>
      </div>

      {/* 3 Result Metric Cards */}
      <div className="space-y-4">
        
        {/* Card 1: Daily Required Calories (#007979) */}
        <div className="bg-[#007979] text-white rounded-2xl p-5 text-center space-y-2 shadow-sm border border-teal-700">
          <p className="text-xs font-bold text-teal-100">
            {t.dailyCaloriesRequired}
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
              {results.targetCalories.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-teal-200">
              {t.kcalSuffix}
            </span>
          </div>
        </div>

        {/* Card 2: Daily Protein Intake */}
        <div className="bg-teal-50/70 text-slate-800 rounded-2xl p-5 text-center space-y-2 border border-teal-100/80">
          <p className="text-xs font-semibold text-slate-600">
            {t.dailyProteinRequired}
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#007979] tracking-tight font-mono">
              {results.dailyProteinGrams}
            </span>
            <span className="text-sm font-bold text-slate-700">
              {t.gramsSuffix}
            </span>
          </div>
        </div>

        {/* Card 3: Suggested Supplement Servings (Soft Warm Cream `#FFF5EC`) */}
        <div className="bg-[#FFF5EC] text-slate-900 rounded-2xl p-5 text-center space-y-2 border border-amber-200/60">
          <p className="text-xs font-semibold text-slate-600 truncate px-1">
            {supplementProfile?.productName 
              ? `${t.suggestedSupplementServings} (${supplementProfile.productName})`
              : t.suggestedSupplementServings}
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              {results.recommendedServings}
            </span>
            <span className="text-sm font-bold text-slate-800">
              {t.servingsDailySuffix}
            </span>
          </div>
        </div>

      </div>

      {/* Disclaimer Footer Text */}
      <div className="text-center pt-2">
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
          {t.disclaimer}
        </p>
      </div>

    </div>
  );
};
