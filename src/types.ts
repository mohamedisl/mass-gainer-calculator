export type Gender = 'male' | 'female';

export type Goal = 'weight_gain' | 'maintenance' | 'fat_loss';

export type ActivityLevel = 
  | 'sedentary' 
  | 'light' 
  | 'moderate' 
  | 'high' 
  | 'extreme';

export type CalculationFormula = 'mifflin' | 'harris_benedict';

export type Language = 'ar' | 'fr';

export interface UserData {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  targetSpeed: 'slow' | 'standard' | 'aggressive'; // Surplus/Deficit pace
  customProteinRatio?: number; // g per kg
}

export interface SupplementProfile {
  brandName: string;
  productName: string;
  servingName: string; // e.g. "حصة (2 سكوپ)" / "1 Serving (2 Scoops)"
  servingSizeGrams: number; // e.g. 150g
  scoopsPerServing: number; // e.g. 2 scoops
  caloriesPerServing: number; // e.g. 600 kcal
  proteinPerServing: number; // e.g. 50g
  carbsPerServing: number; // e.g. 90g
  fatPerServing: number; // e.g. 4g
  imageUrl?: string;
}

export interface CalculationResults {
  bmr: number;
  tdee: number;
  targetCalories: number;
  calorieSurplusDeficit: number; // positive for gain, negative for cut
  dailyProteinGrams: number;
  dailyCarbsGrams: number;
  dailyFatGrams: number;
  dailyFatsGrams?: number;
  
  // Mass Gainer Dosage
  recommendedServings: number; // e.g. 1.0 or 1.5 or 2.0
  recommendedScoops: number; // e.g. 2 scoops
  supplementProteinContribution: number; // g
  supplementCalorieContribution: number; // kcal
  foodProteinContribution: number; // g
  foodCalorieContribution: number; // kcal
  
  // Health
  waterIntakeLiters: number;
  creatineGrams: number;
  
  // Specific timing advice
  timingTips: {
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    iconName: string;
  }[];
}
