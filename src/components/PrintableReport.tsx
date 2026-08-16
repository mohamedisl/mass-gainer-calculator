import React from 'react';
import { UserData, CalculationResults, SupplementProfile, Language } from '../types';
import { translations } from '../data/translations';
import { Flame, Dumbbell, Pill, Droplets, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PrintableReportProps {
  userData: UserData;
  results: CalculationResults;
  supplementProfile: SupplementProfile;
  lang: Language;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  userData,
  results,
  supplementProfile,
  lang,
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const brandName = supplementProfile.brandName || t.appName;
  const productName = supplementProfile.productName || (lang === 'ar' ? 'المكمل الغذائي' : 'Complément Nutritionnel');

  const goalText = {
    weight_gain: lang === 'ar' ? 'زيادة الوزن والعضلات' : 'Prise de masse',
    fat_loss: lang === 'ar' ? 'تنشيف وحرق الدهون' : 'Sèche & Perte de gras',
    maintenance: lang === 'ar' ? 'المحافظة على الوزن' : 'Maintien & Forme',
  }[userData.goal];

  const formattedDate = new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dailyFats = results.dailyFatGrams ?? results.dailyFatsGrams ?? 0;

  return (
    <div
      className={`hidden print:block w-full max-w-[210mm] mx-auto p-8 bg-white text-slate-900 ${
        isRtl ? 'text-right' : 'text-left'
      }`}
      style={{ minHeight: '297mm' }}
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b-2 border-[#007979] pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#007979] text-white flex items-center justify-center font-black text-xl shadow-md">
            DN
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{brandName}</h1>
            <p className="text-xs font-semibold text-slate-500">{t.appSubTitle}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-teal-50 text-[#007979] border border-teal-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            {lang === 'ar' ? 'تقرير التغذية المعتمد' : 'Rapport Nutritionnel Officiel'}
          </span>
          <p className="text-xs text-slate-400 mt-1 font-mono">{formattedDate}</p>
        </div>
      </div>

      {/* Client Profile Overview Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#007979]"></span>
          {lang === 'ar' ? 'بيانات الرياضي / المتدرب' : 'Données Athlète'}
        </h2>
        <div className="grid grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[11px]">{t.ageLabel}</span>
            <span className="font-black text-slate-900 text-sm">{userData.age || 25} {lang === 'ar' ? 'سنة' : 'ans'}</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[11px]">{t.genderLabel}</span>
            <span className="font-black text-slate-900 text-sm">{userData.gender === 'male' ? t.genderMale : t.genderFemale}</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[11px]">{t.heightLabel} / {t.weightLabel}</span>
            <span className="font-black text-slate-900 text-sm">{userData.heightCm || 175}cm / {userData.weightKg || 70}kg</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[11px]">{t.goalLabel}</span>
            <span className="font-black text-[#007979] text-sm truncate block">{goalText}</span>
          </div>
        </div>
      </div>

      {/* 3 Main Result Metric Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Calories */}
        <div className="bg-[#007979] text-white rounded-2xl p-4 border border-teal-800 text-center flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-100">{t.dailyCaloriesRequired}</span>
            <Flame className="w-4 h-4 text-amber-300" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black tracking-tight font-mono">{results.targetCalories.toLocaleString()}</span>
            <span className="text-xs font-bold text-teal-200 block">{t.kcalSuffix}</span>
          </div>
          <div className="text-[10px] text-teal-200/80 border-t border-teal-700/60 pt-1">
            BMR: {Math.round(results.bmr)} | TDEE: {Math.round(results.tdee)}
          </div>
        </div>

        {/* Protein */}
        <div className="bg-teal-50 text-slate-900 rounded-2xl p-4 border border-teal-200 text-center flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">{t.dailyProteinRequired}</span>
            <Dumbbell className="w-4 h-4 text-[#007979]" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-[#007979] tracking-tight font-mono">{results.dailyProteinGrams}</span>
            <span className="text-xs font-bold text-slate-600 block">{t.gramsSuffix}</span>
          </div>
          <div className="text-[10px] text-slate-500 border-t border-teal-200/60 pt-1">
            {((results.dailyProteinGrams * 4 / results.targetCalories) * 100).toFixed(0)}% {lang === 'ar' ? 'من السعرات' : 'des calories'}
          </div>
        </div>

        {/* Supplement Servings */}
        <div className="bg-[#FFF5EC] text-slate-900 rounded-2xl p-4 border border-amber-200 text-center flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 truncate">{productName}</span>
            <Pill className="w-4 h-4 text-amber-700" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight font-mono">{results.recommendedServings}</span>
            <span className="text-xs font-bold text-slate-700 block">{t.servingsDailySuffix}</span>
          </div>
          <div className="text-[10px] text-amber-800 font-bold border-t border-amber-200 pt-1">
            {results.recommendedScoops} {lang === 'ar' ? 'سكوپ يومياً' : 'Scoops / jour'}
          </div>
        </div>
      </div>

      {/* Macronutrient Distribution Table */}
      <div className="border border-slate-200 rounded-2xl p-4 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
          <span>{lang === 'ar' ? 'توزيع الماكروز والمغذيات الكبرى (Macros)' : 'Répartition des Macronutriments'}</span>
          <span className="text-[11px] font-normal text-slate-500">100% {t.kcalSuffix}</span>
        </h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100">
            <span className="text-xs font-bold text-[#007979] block mb-1">🥩 {t.proteinLabel}</span>
            <p className="text-xl font-black text-slate-900 font-mono">{results.dailyProteinGrams} <span className="text-xs font-normal">g</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">{results.dailyProteinGrams * 4} kcal</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
            <span className="text-xs font-bold text-amber-800 block mb-1">🌾 {t.carbsLabel}</span>
            <p className="text-xl font-black text-slate-900 font-mono">{results.dailyCarbsGrams} <span className="text-xs font-normal">g</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">{results.dailyCarbsGrams * 4} kcal</p>
          </div>

          <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
            <span className="text-xs font-bold text-rose-800 block mb-1">🥑 {t.fatsLabel}</span>
            <p className="text-xl font-black text-slate-900 font-mono">{dailyFats} <span className="text-xs font-normal">g</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">{dailyFats * 9} kcal</p>
          </div>
        </div>
      </div>

      {/* Hydration & Supplementation Protocol */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-sky-50/60 border border-sky-200/80 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-sky-900 block">{t.waterIntake}</span>
            <p className="text-base font-black text-slate-900 font-mono">
              {results.waterIntakeLiters} <span className="text-xs font-bold text-sky-800">{t.litersSuffix}</span>
            </p>
          </div>
        </div>

        <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-900 block">{t.creatineRecommendation}</span>
            <p className="text-base font-black text-slate-900 font-mono">
              {results.creatineGrams} <span className="text-xs font-bold text-purple-800">{t.gramsSuffix} / {lang === 'ar' ? 'يومياً' : 'jour'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations & Timing Tips */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
        <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#007979]" />
          {lang === 'ar' ? 'توصيات الجرعات وأوقات التناول:' : 'Conseils et moments de prise :'}
        </h3>
        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
          <li>{lang === 'ar' ? `تناول ${results.recommendedScoops} سكوپ من ${productName} مقسمة بعد التمرين أو بين الوجبات الرئيسية.` : `Prendre ${results.recommendedScoops} dosettes de ${productName} après l'entraînement ou entre les repas.`}</li>
          <li>{lang === 'ar' ? `احرص على شرب ${results.waterIntakeLiters} لتر ماء يومياً لتعزيز امتصاص البروتين وتجنب الجفاف.` : `Boire au minimum ${results.waterIntakeLiters}L d'eau par jour pour optimiser l'assimilation.`}</li>
          <li>{lang === 'ar' ? 'تأكد من النوم لمدة 7-8 ساعات يومياً لتسريع عملية الاستشفاء العضلي.' : 'Assurer 7 à 8 heures de sommeil pour une récupération musculaire maximale.'}</li>
        </ul>
      </div>

      {/* Official Footer & Disclaimer */}
      <div className="border-t border-slate-200 pt-4 text-center space-y-1 text-slate-400 text-[11px]">
        <p className="font-semibold text-slate-500">
          {brandName} • {t.contactAddress} • {t.contactPhone}
        </p>
        <p>{t.disclaimer}</p>
      </div>
    </div>
  );
};
