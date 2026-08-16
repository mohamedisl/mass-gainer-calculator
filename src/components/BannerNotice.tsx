import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Target, Sparkles, QrCode, ShieldCheck } from 'lucide-react';

interface BannerNoticeProps {
  lang: Language;
}

export const BannerNotice: React.FC<BannerNoticeProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-6 mb-6 shadow-xl relative overflow-hidden group no-print">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shrink-0 shadow-lg shadow-amber-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Target className="w-7 h-7 text-amber-400 animate-pulse" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <ShieldCheck className="w-3 h-3" />
              {lang === 'ar' ? 'مسح رمز الـ QR الخاص بالعلبة' : 'Official Packaging QR Scan'}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            {t.qrBannerTitle}
          </h2>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            {t.qrBannerSub}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
          <QrCode className="w-5 h-5 text-amber-400" />
          <div className="text-start">
            <div className="font-bold text-white text-[11px]">{lang === 'ar' ? 'حساب مجاني ودقيق' : 'Free Instant Calculation'}</div>
            <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'معادلة TDEE + AB Power' : 'TDEE + AB Power Formula'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
