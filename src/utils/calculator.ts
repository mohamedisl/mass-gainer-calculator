import { UserData, SupplementProfile, CalculationResults } from '../types';

export function calculateNutrition(
  userData: UserData,
  supplementProfile: SupplementProfile
): CalculationResults {
  const { age, gender, heightCm, weightKg, activityLevel, goal, targetSpeed } = userData;

  const safeWeight = weightKg > 0 ? weightKg : 70;
  const safeHeight = heightCm > 0 ? heightCm : 175;
  const safeAge = age > 0 ? age : 25;

  // 1. Calculate BMR (Mifflin-St Jeor)
  let bmr = 10 * safeWeight + 6.25 * safeHeight - 5 * safeAge;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // 2. Activity Multiplier
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    high: 1.725,
    extreme: 1.9,
  };

  const multiplier = activityMultipliers[activityLevel] || 1.55;
  const tdee = Math.round(bmr * multiplier);

  // 3. Calorie Surplus / Deficit Adjustment
  let calorieAdjustment = 0;
  if (goal === 'weight_gain') {
    if (targetSpeed === 'slow') calorieAdjustment = 300;
    else if (targetSpeed === 'standard') calorieAdjustment = 500;
    else if (targetSpeed === 'aggressive') calorieAdjustment = 750;
  } else if (goal === 'fat_loss') {
    if (targetSpeed === 'slow') calorieAdjustment = -300;
    else if (targetSpeed === 'standard') calorieAdjustment = -500;
    else if (targetSpeed === 'aggressive') calorieAdjustment = -700;
  }

  const targetCalories = Math.max(1200, Math.round(tdee + calorieAdjustment));

  // 4. Protein Target (g per kg)
  let proteinRatio = 2.0; // default g/kg
  if (userData.customProteinRatio) {
    proteinRatio = userData.customProteinRatio;
  } else if (goal === 'weight_gain') {
    proteinRatio = targetSpeed === 'aggressive' ? 2.2 : 2.0;
  } else if (goal === 'fat_loss') {
    proteinRatio = 2.2; // higher protein needed in deficit to preserve muscle
  } else {
    proteinRatio = 1.8; // maintenance
  }

  const dailyProteinGrams = Math.round(safeWeight * proteinRatio);

  // 5. Fats (approx 25% of target calories)
  const fatCalories = targetCalories * 0.25;
  const dailyFatGrams = Math.round(fatCalories / 9);

  // 6. Carbs (Remaining calories)
  const proteinCalories = dailyProteinGrams * 4;
  const remainingCaloriesForCarbs = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const dailyCarbsGrams = Math.round(remainingCaloriesForCarbs / 4);

  // 7. AB Power Mass Gainer Serving Recommendation
  // Calculate recommended scoops based on goal and weight
  let recommendedScoops = 2; // Default 1 full serving = 2 scoops

  if (goal === 'weight_gain') {
    if (safeWeight > 85 || targetSpeed === 'aggressive') {
      recommendedScoops = 3; // 1.5 servings
    } else if (safeWeight < 60) {
      recommendedScoops = 2;
    } else {
      recommendedScoops = 2;
    }
  } else if (goal === 'maintenance') {
    recommendedScoops = 1; // 1 scoop = half serving
  } else if (goal === 'fat_loss') {
    recommendedScoops = 1; // 1 scoop post-workout for quick protein + fast carbs without excess calories
  }

  const scoopRatio = recommendedScoops / supplementProfile.scoopsPerServing;
  const recommendedServings = parseFloat(scoopRatio.toFixed(1));

  const supplementProteinContribution = Math.round(supplementProfile.proteinPerServing * scoopRatio);
  const supplementCalorieContribution = Math.round(supplementProfile.caloriesPerServing * scoopRatio);

  const foodProteinContribution = Math.max(0, dailyProteinGrams - supplementProteinContribution);
  const foodCalorieContribution = Math.max(0, targetCalories - supplementCalorieContribution);

  // 8. Hydration & Creatine
  const waterIntakeLiters = parseFloat((safeWeight * 0.035 + (activityLevel === 'high' || activityLevel === 'extreme' ? 0.8 : 0.5)).toFixed(1));
  const creatineGrams = safeWeight > 80 ? 5 : 3;

  // 9. Schedule Tips according to dosage
  const timingTips = generateTimingTips(recommendedScoops, goal);

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    calorieSurplusDeficit: calorieAdjustment,
    dailyProteinGrams,
    dailyCarbsGrams,
    dailyFatGrams,
    dailyFatsGrams: dailyFatGrams,
    recommendedServings,
    recommendedScoops,
    supplementProteinContribution,
    supplementCalorieContribution,
    foodProteinContribution,
    foodCalorieContribution,
    waterIntakeLiters,
    creatineGrams,
    timingTips,
  };
}

function generateTimingTips(scoops: number, goal: string) {
  if (scoops >= 3) {
    return [
      {
        titleAr: "الجرعة الأولى: بعد التمرين مباشرة 🏋️",
        titleEn: "First Serving: Right Post-Workout 🏋️",
        descAr: "تناول 1.5 سكوپ (75-100غ) مع 400 مل ماء أو حليب بارد لإنعاش العضلات وسرعة الامتصاص.",
        descEn: "Take 1.5 scoops with 400ml cold water or milk to accelerate muscle recovery.",
        iconName: "Dumbbell",
      },
      {
        titleAr: "الجرعة الثانية: بين الوجبات أو قبل النوم 🌙",
        titleEn: "Second Serving: Between Meals or Before Bed 🌙",
        descAr: "تناول 1.5 سكوپ كوجبة سريعة بين الغداء والعشاء لضمان استمرار بناء العضلات واستكمال السعرات.",
        descEn: "Take 1.5 scoops between lunch and dinner to maintain an anabolic caloric surplus.",
        iconName: "Moon",
      },
    ];
  } else if (scoops === 2) {
    return [
      {
        titleAr: "الجرعة الرئيسية: بعد التمرين (أو صباحاً) ⚡",
        titleEn: "Main Serving: Post-Workout (or Morning) ⚡",
        descAr: "خذ سكوپ واحد (75غ) بعد التمرين مباشرة لبناء الألياف العضلية وتغذيتها.",
        descEn: "Take 1 scoop (75g) immediately post-workout to feed fatigued muscles.",
        iconName: "Zap",
      },
      {
        titleAr: "الجرعة الثانية: وجبة خفيفة عصراً أو مساءً 🥛",
        titleEn: "Second Scoop: Afternoon or Evening Snack 🥛",
        descAr: "خذ سكوپ واحد بين الوجبات مع كوب حليب وفاكهة لتزويد جسمك بطاقة بروتينية عالية.",
        descEn: "Take 1 scoop between meals with milk or a banana for nutrient density.",
        iconName: "Coffee",
      },
    ];
  } else {
    return [
      {
        titleAr: "الجرعة الموصى بها: سكوپ واحد بعد التمرين 🎯",
        titleEn: "Recommended Dose: 1 Scoop Post-Workout 🎯",
        descAr: "تناول سكوپ واحد (75غ) مدمج مع ماء بارد أو خافق بروتين بعد التمرين لدعم التعافي دون المبالغة بالسعرات.",
        descEn: "Take 1 scoop (75g) in cold water post-workout for fast protein recovery without excess calories.",
        iconName: "CheckCircle2",
      },
    ];
  }
}
