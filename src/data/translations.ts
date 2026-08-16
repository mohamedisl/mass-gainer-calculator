import { Language } from '../types';

export const translations = {
  ar: {
    appName: "Daily Needs",
    
    
    // Hero Banner
    heroTitle: "احسب احتياجك اليومي من السعرات الحرارية",
    heroSubtitle: "احصل على حساب دقيق لسعراتك اليومية واحتياجك من البروتين والماكروز، واعرف كمية المكمل الغذائي المناسبة لهدفك البدني.",

    // Form Section
    formTitle: "بياناتك الشخصية",
    formSubtitle: "أدخل بياناتك للحصول على حساب دقيق لسعراتك اليومية.",
    ageLabel: "العمر (سنة)",
    genderLabel: "الجنس",
    male: "ذكر",
    female: "أنثى",
    heightLabel: "الطول (سم)",
    weightLabel: "الوزن (كجم)",
    activityLabel: "مستوى النشاط",
    goalLabel: "الهدف البدني",
    submitBtn: "احسب سعراتي الآن",

    // Activity Levels Options
    actSedentary: "نشاط خامل (قليل الحركة)",
    actLight: "نشاط خفيف (1-3 أيام)",
    actModerate: "نشاط متوسط (3-5 أيام)",
    actHigh: "نشاط عالٍ (6-7 أيام)",
    actExtreme: "نشاط مكثف جداً (يومياً)",

    // Goals Options
    goalWeightGain: "زيادة الوزن والعضل",
    goalMaintenance: "المحافظة على الوزن",
    goalFatLoss: "التنشيف وخسارة الدهون",

    // Results Section
    resultsTitle: "نتائج التحليل الغذائي",
    dailyCaloriesRequired: "السعرات اليومية المطلوبة",
    kcalSuffix: "سعرة",
    dailyProteinRequired: "كمية البروتين اليومية",
    gramsSuffix: "جرام",
    suggestedSupplementServings: "الحصص اليومية المقترحة من المكمل",
    servingsDailySuffix: "حصة يومياً",
    scoopsSuffix: "سكوپ",
    disclaimer: "* النتائج تقديرية بناءً على معادلة Mifflin-St Jeor العلمية ولا تغني عن استشارة أخصائي تغذية.",

    // Bottom Cards
    card1Title: "حاسبة TDEE ومعدل الأيض",
    card1Subtitle: "سعراتك اليومية بدقة حسب نشاطك وهدفك الرياضي.",
    card2Title: "احتياج البروتين والماكروز",
    card2Subtitle: "كمية البروتين المثالية لبناء الكتلة العضلية والتعافي.",
    card3Title: "تحديد جرعات المكمل",
    card3Subtitle: "عدد الحصص والسكوبات المقترحة بناءً على وزنك وهدفك.",

    // Extra Utilities
    langToggle: "Français",
    qrGeneratorBtn: "رمز QR للمنتج",
    customizeSupplement: "تخصيص القالب والمكمل",
    shareResult: "مشاركة التقرير",
    printReport: "طباعة",
    copied: "تم النسخ!",
    
    // QR Modal & Customizer
    qrModalTitle: "مولد رمز الـ QR للعلب والمنتجات",
    qrModalDesc: "امسح رمز QR للحصول على حساب فوري للسعرات ومعرفة الجرعة المناسبة من المكمل.",
    downloadQr: "تحميل صورة QR",
    copyLink: "نسخ الرابط",
    customizerTitle: "تخصيص العلامة التجارية والمكمل",
    brandLabel: "اسم العلامة التجارية",
    productLabel: "اسم المنتج أو المكمل",
    servingSize: "حجم الحصة (جرام)",
    scoopsPerServing: "عدد السكوپ بالحصة",
    caloriesPerServing: "السعرات بالحصة",
    proteinPerServing: "البروتين بالحصة (جرام)",
    carbsPerServing: "الكارب بالحصة (جرام)",
    fatPerServing: "الدهون بالحصة (جرام)",
    saveCustomization: "حفظ التعديلات",
    resetDefault: "إعادة الضبط الافتراضي",

    qrBannerTitle: "احسب احتياجك وسعراتك بدقة مع كل علبة",
    qrBannerSub: "احصل على جدول تغذية يومي مخصص وجرعات المكمل المثالية لوزنك وهدفك الرياضي.",
    appSubTitle: "حاسبة التغذية وحساب جرعات المكملات الغذائية",
    proteinLabel: "البروتين",
    carbsLabel: "الكاربوهيدرات",
    fatsLabel: "الدهون",
    waterIntake: "احتياج الماء اليومي",
    litersSuffix: "لتر",
    creatineRecommendation: "الكرياتين الموصى به",
    genderMale: "ذكر",
    genderFemale: "أنثى",

    // Contact & Footer
    contactTitle: "تواصل معنا",
    contactPhone: "+212 6 00 00 00 00",
    contactAddress: "الجزائر",
    facebookName: "Daily Needs",
    instagramName: "@dailyneeds",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    footerRights: "جميع الحقوق محفوظة © 2026"
  },
  fr: {
    appName: "Daily Needs",
    
    // Hero Banner
    heroTitle: "Calculez vos Besoins Caloriques Journaliers",
    heroSubtitle: "Obtenez un calcul précis de vos calories quotidiennes, de vos besoins en protéines et du dosage optimal de vos compléments.",

    // Form Section
    formTitle: "Vos Informations Personnelles",
    formSubtitle: "Entrez vos données pour un calcul précis de vos besoins nutritionnels.",
    ageLabel: "Âge (Ans)",
    genderLabel: "Sexe",
    male: "Homme",
    female: "Femme",
    heightLabel: "Taille (cm)",
    weightLabel: "Poids (kg)",
    activityLabel: "Niveau d'activité",
    goalLabel: "Objectif Physique",
    submitBtn: "Calculer mes calories",

    // Activity Levels Options
    actSedentary: "Sédentaire (Peu ou pas d'exercice)",
    actLight: "Activité légère (1-3 jours/sem)",
    actModerate: "Activité modérée (3-5 jours/sem)",
    actHigh: "Activité élevée (6-7 jours/sem)",
    actExtreme: "Activité très intense (Quotidien)",

    // Goals Options
    goalWeightGain: "Prise de masse",
    goalMaintenance: "Maintien",
    goalFatLoss: "Sèche / Perte de gras",

    // Results Section
    resultsTitle: "Résultats Nutritionnels",
    dailyCaloriesRequired: "Calories Quotidiennes Requises",
    kcalSuffix: "kcal",
    dailyProteinRequired: "Apport Quotidien en Protéines",
    gramsSuffix: "Grammes",
    suggestedSupplementServings: "Portions Suggérées de Complément",
    servingsDailySuffix: "Portion(s) / jour",
    scoopsSuffix: "Dosettes",
    disclaimer: "* Les résultats sont des estimations basées sur la formule Mifflin-St Jeor et ne remplacent pas les conseils d'un nutritionniste.",

    // Bottom Cards
    card1Title: "Calculateur DEJ (TDEE)",
    card1Subtitle: "Dépense énergétique quotidienne selon votre activité et objectif.",
    card2Title: "Besoins en Protéines",
    card2Subtitle: "Quantité quotidienne optimale pour le développement musculaire.",
    card3Title: "Dosage du Complément",
    card3Subtitle: "Portions quotidiennes suggérées selon votre profil et poids.",

    // Extra Utilities
    langToggle: "العربية",
    qrGeneratorBtn: "Code QR d'emballage",
    customizeSupplement: "Personnaliser le modèle & complément",
    shareResult: "Partager le rapport",
    printReport: "Imprimer",
    copied: "Copié !",
    
    // QR Modal & Customizer
    qrModalTitle: "Générateur de Code QR pour Emballage",
    qrModalDesc: "Scannez le code QR pour calculer gratuitement vos calories et le dosage idéal.",
    downloadQr: "Télécharger l'image QR",
    copyLink: "Copier le lien",
    customizerTitle: "Personnaliser la Marque & le Complément",
    brandLabel: "Nom de la Marque / Boutique",
    productLabel: "Nom du Produit / Complément",
    servingSize: "Taille de portion (g)",
    scoopsPerServing: "Dosettes par portion",
    caloriesPerServing: "Calories par portion",
    proteinPerServing: "Protéines par portion (g)",
    carbsPerServing: "Glucides par portion (g)",
    fatPerServing: "Lipides par portion (g)",
    saveCustomization: "Enregistrer",
    resetDefault: "Réinitialiser",

    qrBannerTitle: "Calculez vos Besoins et Calories avec Précision",
    qrBannerSub: "Obtenez un plan nutritionnel personnalisé et le dosage idéal selon votre profil.",
    appSubTitle: "Calculateur Nutritionnel & Dosage des Compléments",
    proteinLabel: "Protéines",
    carbsLabel: "Glucides",
    fatsLabel: "Lipides",
    waterIntake: "Hydratation Quotidienne",
    litersSuffix: "L",
    creatineRecommendation: "Créatine Recommandée",
    genderMale: "Homme",
    genderFemale: "Femme",

    // Contact & Footer
    contactTitle: "Contactez-nous",
    contactPhone: "+212 6 00 00 00 00",
  contactAddress: "Alger",
    facebookName: "Daily Needs",
    instagramName: "@dailyneeds",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    footerRights: "Tous droits réservés © 2026"
  }
};

export const defaultSupplementProfile = {
  brandName: "Daily Needs",
  productName: "Mass Gainer / Protein",
  servingName: "1 Serving (2 Scoops)",
  servingSizeGrams: 150,
  scoopsPerServing: 2,
  caloriesPerServing: 600,
  proteinPerServing: 50,
  carbsPerServing: 90,
  fatPerServing: 4,
};
