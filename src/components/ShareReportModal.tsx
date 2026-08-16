import React, { useState } from 'react';
import { UserData, CalculationResults, SupplementProfile, Language } from '../types';
import { translations } from '../data/translations';
import { X, Copy, Check, Share2, MessageCircle, Printer } from 'lucide-react';

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  results: CalculationResults;
  supplementProfile: SupplementProfile;
  lang: Language;
}

export const ShareReportModal: React.FC<ShareReportModalProps> = ({
  isOpen,
  onClose,
  userData,
  results,
  supplementProfile,
  lang,
}) => {
  const t = translations[lang];
  const [copied, setCopied] = useState<boolean>(false);

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

  // Formatted text report for WhatsApp / Copy
  const brandName = supplementProfile.brandName || t.appName;
  const productName = supplementProfile.productName || 'المكمل الغذائي';

  const formattedReport = lang === 'ar'
    ? ` *تقرير حساب السعرات والبروتين - ${brandName}* 

 *البيانات الشخصية:*
• العمر: ${userData.age} سنة
• الوزن: ${userData.weightKg} كجم
• الطول: ${userData.heightCm} سم
• الهدف: ${userData.goal === 'weight_gain' ? 'زيادة وزن وعضل' : userData.goal === 'fat_loss' ? 'تنشيف' : 'محافظة'}

 *النتائج اليومية:*
 السعرات اليومية المطلوبة: *${results.targetCalories.toLocaleString()} سعرة*
 كمية البروتين اليومية: *${results.dailyProteinGrams} جرام*
 الجرعة المقترحة من ${productName}: *${results.recommendedServings} حصة يومياً (${results.recommendedScoops} سكوپ)*

تم الحساب بواسطة حاسبة ${brandName} `
    : ` *Rapport Nutritionnel - ${brandName}* 

📌 *Données Personnelles :*
• Âge : ${userData.age} ans
• Poids : ${userData.weightKg} kg
• Taille : ${userData.heightCm} cm
• Objectif : ${userData.goal === 'weight_gain' ? 'Prise de masse' : userData.goal === 'fat_loss' ? 'Sèche' : 'Maintien'}

 *Objectifs Quotidiens :*
 Calories Requises : *${results.targetCalories.toLocaleString()} kcal*
 Protéines Quotidiennes : *${results.dailyProteinGrams} g*
 Portion Suggérée ${productName} : *${results.recommendedServings} Portion(s) / jour (${results.recommendedScoops} dosettes)*

Calculé avec l'application ${brandName} `;

  const handleCopyText = () => {
    navigator.clipboard.writeText(formattedReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsapp = () => {
    const encoded = encodeURIComponent(formattedReport);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
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
        className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-4 text-right"
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
            <Share2 className="w-3.5 h-3.5 text-[#007979]" />
            <span>{t.shareResult}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {lang === 'ar' ? 'تقريرك الشخصي جاهز للمشاركة' : 'Votre rapport personnel est prêt'}
          </h3>
        </div>

        {/* Formatted Text Preview */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto select-all text-right">
          {formattedReport}
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleShareWhatsapp}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إرسال عبر WhatsApp' : 'Envoyer par WhatsApp'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyText}
              className="py-2.5 px-4 rounded-xl bg-[#007979] hover:bg-[#006666] text-white font-bold text-xs transition flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copied : (lang === 'ar' ? 'نسخ النص' : 'Copier le texte')}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#007979]" />
              <span>{t.printReport}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
