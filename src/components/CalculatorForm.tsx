import React from 'react';
import { UserData, Gender, Goal, ActivityLevel, Language } from '../types';
import { translations } from '../data/translations';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface CalculatorFormProps {
  userData: UserData;
  onChange: (updated: Partial<UserData>) => void;
  lang: Language;
  onCalculate: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  userData,
  onChange,
  lang,
  onCalculate,
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const handleAgeChange = (valStr: string) => {
    const raw = valStr.replace(/[^0-9]/g, '');
    if (raw === '') {
      onChange({ age: 0 });
      return;
    }
    let num = parseInt(raw, 10);
    if (num > 100) num = 100;
    onChange({ age: num });
  };

  const handleHeightChange = (valStr: string) => {
    const raw = valStr.replace(/[^0-9]/g, '');
    if (raw === '') {
      onChange({ heightCm: 0 });
      return;
    }
    let num = parseInt(raw, 10);
    if (num > 250) num = 250;
    onChange({ heightCm: num });
  };

  const handleWeightChange = (valStr: string) => {
    const raw = valStr.replace(/[^0-9]/g, '');
    if (raw === '') {
      onChange({ weightKg: 0 });
      return;
    }
    let num = parseInt(raw, 10);
    if (num > 300) num = 300;
    onChange({ weightKg: num });
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
      
      {/* Title & Subtitle */}
      <div className={`space-y-1 border-b border-slate-100 pb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
        <h2 className="text-xl font-bold text-slate-900">
          {t.formTitle}
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          {t.formSubtitle}
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Row 1: Age & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Age Input with Manual Typing + Quick Steppers + Per-keystroke Clamping */}
          <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
            <label className="block text-xs font-bold text-slate-600">
              {t.ageLabel}
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#007979] focus-within:ring-2 focus-within:ring-[#007979]/20 focus-within:bg-white transition">
              <button
                type="button"
                onClick={() => onChange({ age: Math.max(12, (userData.age || 25) - 1) })}
                className="p-2 text-slate-400 hover:text-[#007979] hover:bg-slate-100/80 rounded-lg transition active:scale-95 shrink-0"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                value={userData.age === 0 ? '' : userData.age}
                onChange={(e) => handleAgeChange(e.target.value)}
                onBlur={() => {
                  if (userData.age < 12) onChange({ age: 12 });
                }}
                className="w-full text-center bg-transparent py-2.5 px-1 text-slate-900 font-bold text-sm outline-none"
                placeholder="25"
              />

              <button
                type="button"
                onClick={() => onChange({ age: Math.min(100, (userData.age || 25) + 1) })}
                className="p-2 text-slate-400 hover:text-[#007979] hover:bg-slate-100/80 rounded-lg transition active:scale-95 shrink-0"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Gender Segmented Control */}
          <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
            <label className="block text-xs font-bold text-slate-600">
              {t.genderLabel}
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => onChange({ gender: 'male' })}
                className={`py-2 px-3 rounded-lg font-bold text-xs transition ${
                  userData.gender === 'male'
                    ? 'bg-[#007979] text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.male}
              </button>
              <button
                type="button"
                onClick={() => onChange({ gender: 'female' })}
                className={`py-2 px-3 rounded-lg font-bold text-xs transition ${
                  userData.gender === 'female'
                    ? 'bg-[#007979] text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.female}
              </button>
            </div>
          </div>

        </div>

        {/* Row 2: Height & Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Height Input with Manual Typing + Quick Steppers + Per-keystroke Clamping */}
          <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
            <label className="block text-xs font-bold text-slate-600">
              {t.heightLabel}
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#007979] focus-within:ring-2 focus-within:ring-[#007979]/20 focus-within:bg-white transition">
              <button
                type="button"
                onClick={() => onChange({ heightCm: Math.max(80, (userData.heightCm || 175) - 1) })}
                className="p-2 text-slate-400 hover:text-[#007979] hover:bg-slate-100/80 rounded-lg transition active:scale-95 shrink-0"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                value={userData.heightCm === 0 ? '' : userData.heightCm}
                onChange={(e) => handleHeightChange(e.target.value)}
                onBlur={() => {
                  if (userData.heightCm > 0 && userData.heightCm < 80) onChange({ heightCm: 80 });
                }}
                className="w-full text-center bg-transparent py-2.5 px-1 text-slate-900 font-bold text-sm outline-none"
                placeholder="175"
              />

              <button
                type="button"
                onClick={() => onChange({ heightCm: Math.min(250, (userData.heightCm || 175) + 1) })}
                className="p-2 text-slate-400 hover:text-[#007979] hover:bg-slate-100/80 rounded-lg transition active:scale-95 shrink-0"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Weight Input with Manual Typing + Quick Steppers + Per-keystroke Clamping */}
          <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
            <label className="block text-xs font-bold text-slate-600">
              {t.weightLabel}
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#007979] focus-within:ring-2 focus-within:ring-[#007979]/20 focus-within:bg-white transition">
              <button
                type="button"
                onClick={() => onChange({ weightKg: Math.max(25, (userData.weightKg || 70) - 1) })}
                className="p-2 text-slate-400 hover:text-[#007979] hover:bg-slate-100/80 rounded-lg transition active:scale-95 shrink-0"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                value={userData.weightKg === 0 ? '' : userData.weightKg}
                onChange={(e) => handleWeightChange(e.target.value)}
                onBlur={() => {
                  if (userData.weightKg > 0 && userData.weightKg < 25) onChange({ weightKg: 25 });
                }}
                className="w-full text-center bg-transparent py-2.5 px-1 text-slate-900 font-bold text-sm outline-none"
                placeholder="70"
              />

              <button
                type="button"
                onClick={() => onChange({ weightKg: Math.min(300, (userData.weightKg || 70) + 1) })}
                className="p-2 text-slate-400 hover:text-[#007979] hover:bg-slate-100/80 rounded-lg transition active:scale-95 shrink-0"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Row 3: Activity Level Dropdown with Adjusted Custom Placement Choice Arrow */}
        <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label className="block text-xs font-bold text-slate-600">
            {t.activityLabel}
          </label>
          <div className="relative">
            <select
              value={userData.activityLevel}
              onChange={(e) => onChange({ activityLevel: e.target.value as ActivityLevel })}
              className={`w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2.5 text-slate-800 font-bold text-xs outline-none focus:border-[#007979] focus:ring-2 focus:ring-[#007979]/20 focus:bg-white transition cursor-pointer ${
                isRtl ? 'pr-3.5 pl-10 text-right' : 'pl-3.5 pr-10 text-left'
              }`}
            >
              <option value="sedentary">{t.actSedentary}</option>
              <option value="light">{t.actLight}</option>
              <option value="moderate">{t.actModerate}</option>
              <option value="high">{t.actHigh}</option>
              <option value="extreme">{t.actExtreme}</option>
            </select>
            
            {/* Custom Arrow correctly placed on the opposite side of the language alignment */}
            <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 ${
              isRtl ? 'left-3.5' : 'right-3.5'
            }`}>
              <ChevronDown className="w-4 h-4 text-[#007979]" />
            </div>
          </div>
        </div>

        {/* Row 4: Goal Segmented Buttons */}
        <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label className="block text-xs font-bold text-slate-600">
            {t.goalLabel}
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => onChange({ goal: 'weight_gain' })}
              className={`py-2 px-2 rounded-lg font-bold text-xs transition ${
                userData.goal === 'weight_gain'
                  ? 'bg-[#007979] text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.goalWeightGain}
            </button>
            <button
              type="button"
              onClick={() => onChange({ goal: 'maintenance' })}
              className={`py-2 px-2 rounded-lg font-bold text-xs transition ${
                userData.goal === 'maintenance'
                  ? 'bg-[#007979] text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.goalMaintenance}
            </button>
            <button
              type="button"
              onClick={() => onChange({ goal: 'fat_loss' })}
              className={`py-2 px-2 rounded-lg font-bold text-xs transition ${
                userData.goal === 'fat_loss'
                  ? 'bg-[#007979] text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.goalFatLoss}
            </button>
          </div>
        </div>

      </div>

      {/* Row 5: Primary Action Button */}
      <button
        type="button"
        onClick={onCalculate}
        className="w-full py-3 px-6 rounded-xl bg-[#007979] hover:bg-[#006666] text-white font-bold text-sm shadow-md shadow-[#007979]/20 transition active:scale-[0.98]"
      >
        {t.submitBtn}
      </button>

    </div>
  );
};
