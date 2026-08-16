import React from 'react';
import { Language, SupplementProfile } from '../types';
import { translations } from '../data/translations';
import { Phone, MapPin, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  lang: Language;
  supplementProfile?: SupplementProfile;
}

export const Footer: React.FC<FooterProps> = ({ lang, supplementProfile }) => {
  const t = translations[lang];
  const brandName = supplementProfile?.brandName || t.appName;

  return (
    <footer className="bg-white border-t border-slate-200/80 mt-12 relative z-10 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Contact Info Header & Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#007979] ring-2 ring-teal-100"></div>
            <h3 className="text-sm font-bold text-slate-900">
              {t.contactTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            {/* Phone */}
            <a
              href={`tel:${t.contactPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200/60 hover:border-teal-200 transition text-slate-700 hover:text-[#007979]"
            >
              <div className="p-2 rounded-lg bg-white shadow-xs text-[#007979] shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === 'ar' ? 'الهاتف' : 'Téléphone'}</span>
                <span className="font-medium text-slate-800 font-mono block">{t.contactPhone}</span>
              </div>
            </a>

            {/* Location / Address */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700">
              <div className="p-2 rounded-lg bg-white shadow-xs text-[#007979] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === 'ar' ? 'العنوان' : 'Adresse'}</span>
                <span className="font-medium text-slate-800 block">{t.contactAddress}</span>
              </div>
            </div>

            {/* Facebook */}
            <a
              href={t.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200/60 hover:border-teal-200 transition text-slate-700 hover:text-teal-900"
            >
              <div className="p-2 rounded-lg bg-white shadow-xs text-[#1877F2] shrink-0">
                <Facebook className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Facebook</span>
                <span className="font-medium text-slate-800 truncate block">{brandName}</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={t.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200/60 hover:border-teal-200 transition text-slate-700 hover:text-teal-900"
            >
              <div className="p-2 rounded-lg bg-white shadow-xs text-[#E4405F] shrink-0">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Instagram</span>
                <span className="font-medium text-slate-800 truncate block">@{brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>
              </div>
            </a>

          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p className="font-semibold text-slate-500">
            {t.footerRights}
          </p>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>{brandName}</span>
            <span>•</span>
            
          </div>
        </div>

      </div>
    </footer>
  );
};
