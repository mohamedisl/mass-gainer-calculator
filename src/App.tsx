import React, { useState, useEffect } from 'react';
import { UserData, SupplementProfile, Language } from './types';
import { defaultSupplementProfile, translations } from './data/translations';
import { calculateNutrition } from './utils/calculator';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { FeatureCards } from './components/FeatureCards';
import { Footer } from './components/Footer';
import { SupplementCustomizerModal } from './components/SupplementCustomizerModal';
import { ShareReportModal } from './components/ShareReportModal';
import { GymBackground } from './components/GymBackground';
import { PrintableReport } from './components/PrintableReport';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [userData, setUserData] = useState<UserData>({
    age: 25,
    gender: 'male',
    heightCm: 175,
    weightKg: 70,
    activityLevel: 'moderate',
    goal: 'weight_gain',
    targetSpeed: 'standard',
  });

  const [supplementProfile, setSupplementProfile] = useState<SupplementProfile>(() => {
    try {
      const saved = localStorage.getItem('nutrifit_supplement_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.brandName === 'NutriFit Pro') {
          parsed.brandName = 'Daily Needs';
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return defaultSupplementProfile;
  });

  const handleSaveSupplementProfile = (profile: SupplementProfile) => {
    setSupplementProfile(profile);
    try {
      localStorage.setItem('nutrifit_supplement_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  };

  // Modals state
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Sync RTL / LTR document direction with language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Compute nutrition results reactively
  const results = calculateNutrition(userData, supplementProfile);

  const handleUserDataChange = (updated: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...updated }));
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#007979] selection:text-white relative overflow-x-hidden">
      
      {/* Screen Interactive UI (Hidden during Print / PDF generation) */}
      <div className="flex flex-col min-h-screen print:hidden">
        {/* Precision Professional Background */}
        <GymBackground />

        {/* Header */}
        <Header
          lang={lang}
          onLanguageChange={setLang}
          onOpenCustomizerModal={() => setIsCustomizerOpen(true)}
          supplementProfile={supplementProfile}
        />

        {/* Full Width Hero Banner */}
        <HeroBanner lang={lang} />

        {/* Main Content Container */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 relative z-10">
          
          {/* Central 2-Column Side-by-Side Cards (Matching Mockup) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Right Card (RTL) - Input Data Form */}
            <CalculatorForm
              userData={userData}
              onChange={handleUserDataChange}
              lang={lang}
              onCalculate={() => {
                // Smooth scroll to results or focus feedback
              }}
            />

            {/* Left Card (RTL) - Real-time Results */}
            <ResultsDisplay
              results={results}
              supplementProfile={supplementProfile}
              lang={lang}
              onOpenShareModal={() => setIsShareModalOpen(true)}
              onPrint={() => window.print()}
            />

          </div>

          {/* Bottom 3 Feature Cards */}
          <FeatureCards lang={lang} />

        </main>

        {/* Footer */}
        <Footer lang={lang} supplementProfile={supplementProfile} />
      </div>

      {/* Dedicated Clean Printable PDF Report (Active only when printing or saving as PDF) */}
      <PrintableReport
        userData={userData}
        results={results}
        supplementProfile={supplementProfile}
        lang={lang}
      />

      {/* Modals */}
      <SupplementCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        lang={lang}
        supplementProfile={supplementProfile}
        onSave={handleSaveSupplementProfile}
      />

      <ShareReportModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userData={userData}
        results={results}
        supplementProfile={supplementProfile}
        lang={lang}
      />

    </div>
  );
}
