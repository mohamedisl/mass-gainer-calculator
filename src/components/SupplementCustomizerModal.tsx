import React, { useState } from 'react';
import { SupplementProfile, Language } from '../types';
import { translations, defaultSupplementProfile } from '../data/translations';
import { X, Sliders, Check, RotateCcw } from 'lucide-react';

interface SupplementCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  supplementProfile: SupplementProfile;
  onSave: (updated: SupplementProfile) => void;
}

export const SupplementCustomizerModal: React.FC<SupplementCustomizerModalProps> = ({
  isOpen,
  onClose,
  lang,
  supplementProfile,
  onSave,
}) => {
  const t = translations[lang];
  const [form, setForm] = useState<SupplementProfile>({ ...supplementProfile });

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReset = () => {
    setForm({ ...defaultSupplementProfile });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto no-print"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-5 text-right"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pl-6">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#007979] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
            <Sliders className="w-3.5 h-3.5 text-[#007979]" />
            <span>{t.customizerTitle}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {t.customizerTitle}
          </h3>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                {t.brandLabel}
              </label>
              <input
                type="text"
                value={form.brandName}
                onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold outline-none focus:border-[#007979] focus:ring-2 focus:ring-[#007979]/20"
                placeholder={t.brandLabel}
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                {t.productLabel}
              </label>
              <input
                type="text"
                value={form.productName}
                onChange={(e) => setForm({ ...form, productName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold outline-none focus:border-[#007979] focus:ring-2 focus:ring-[#007979]/20"
                placeholder={t.productLabel}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t.servingSize}</label>
              <input
                type="number"
                value={form.servingSizeGrams}
                onChange={(e) => setForm({ ...form, servingSizeGrams: parseInt(e.target.value) || 150 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold outline-none focus:border-[#007979] focus:ring-2 focus:ring-[#007979]/20"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t.scoopsPerServing}</label>
              <input
                type="number"
                value={form.scoopsPerServing}
                onChange={(e) => setForm({ ...form, scoopsPerServing: parseInt(e.target.value) || 2 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold outline-none focus:border-[#007979] focus:ring-2 focus:ring-[#007979]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t.caloriesPerServing}</label>
              <input
                type="number"
                value={form.caloriesPerServing}
                onChange={(e) => setForm({ ...form, caloriesPerServing: parseInt(e.target.value) || 600 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold outline-none focus:border-[#007979] focus:ring-2 focus:ring-[#007979]/20"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t.proteinPerServing}</label>
              <input
                type="number"
                value={form.proteinPerServing}
                onChange={(e) => setForm({ ...form, proteinPerServing: parseInt(e.target.value) || 50 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold outline-none focus:border-[#007979] focus:ring-2 focus:ring-[#007979]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t.carbsPerServing}</label>
              <input
                type="number"
                value={form.carbsPerServing}
                onChange={(e) => setForm({ ...form, carbsPerServing: parseInt(e.target.value) || 90 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold outline-none focus:border-[#007979] focus:ring-2 focus:ring-[#007979]/20"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t.fatPerServing}</label>
              <input
                type="number"
                value={form.fatPerServing}
                onChange={(e) => setForm({ ...form, fatPerServing: parseInt(e.target.value) || 4 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold outline-none focus:border-[#007979] focus:ring-2 focus:ring-[#007979]/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetDefault}</span>
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#007979] hover:bg-[#006666] text-white font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{t.saveCustomization}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
