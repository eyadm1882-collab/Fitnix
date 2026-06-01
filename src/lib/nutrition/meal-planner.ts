export type Goal = "gain" | "loss" | "maintain";
export type Gender = "male" | "female";
export type ProteinPref = "chicken" | "fish" | "red-meat" | "plant-based";
export type CarbPref = "rice" | "potato" | "pasta" | "oats" | "mixed";
export type FatPref = "olive-oil" | "nuts" | "avocado" | "mixed";

export interface MealPlanInput {
  goal: Goal;
  weight: number;
  height: number;
  gender: Gender;
  age: number;
  trainingDays: number;
  protein: ProteinPref;
  carbs: CarbPref;
  fats: FatPref;
}

export interface Meal {
  name: string;
  time: string;
  foods: { name: string; amount: string; calories: number; protein: number; carbs: number; fats: number }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface MealPlan {
  dailyCalories: number;
  protein: { grams: number; calories: number };
  carbs: { grams: number; calories: number };
  fats: { grams: number; calories: number };
  waterMl: number;
  meals: Meal[];
  shoppingList: string[];
}

function calculateBMR(weight: number, height: number, age: number, gender: Gender): number {
  if (gender === "male") {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  }
  return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
}

function calculateTDEE(bmr: number, trainingDays: number): number {
  const activityMap: Record<number, number> = {
    0: 1.2, 1: 1.3, 2: 1.4, 3: 1.5, 4: 1.6, 5: 1.7, 6: 1.8, 7: 1.9,
  };
  return Math.round(bmr * (activityMap[trainingDays] || 1.5));
}

function calculateMacros(tdee: number, goal: Goal): { calories: number; proteinRatio: number; carbsRatio: number; fatsRatio: number } {
  switch (goal) {
    case "gain":
      return { calories: tdee + 300, proteinRatio: 0.30, carbsRatio: 0.45, fatsRatio: 0.25 };
    case "loss":
      return { calories: tdee - 400, proteinRatio: 0.35, carbsRatio: 0.35, fatsRatio: 0.30 };
    case "maintain":
      return { calories: tdee, proteinRatio: 0.30, carbsRatio: 0.40, fatsRatio: 0.30 };
  }
}

const proteinSources: Record<ProteinPref, { name: string; amount: string; per100: { protein: number; calories: number; carbs: number; fats: number } }[]> = {
  "chicken": [
    { name: "صدر دجاج مشوي", amount: "200g", per100: { protein: 31, calories: 165, carbs: 0, fats: 3.6 } },
    { name: "فخذ دجاج مشوي", amount: "150g", per100: { protein: 26, calories: 209, carbs: 0, fats: 11 } },
  ],
  "fish": [
    { name: "سمك سلمون مشوي", amount: "200g", per100: { protein: 25, calories: 208, carbs: 0, fats: 13 } },
    { name: "تونة", amount: "150g", per100: { protein: 26, calories: 116, carbs: 0, fats: 0.8 } },
  ],
  "red-meat": [
    { name: "ستيك لحم بقري", amount: "200g", per100: { protein: 26, calories: 250, carbs: 0, fats: 15 } },
    { name: "لحم مفروم قليل الدهن", amount: "150g", per100: { protein: 25, calories: 190, carbs: 0, fats: 10 } },
  ],
  "plant-based": [
    { name: "عدس", amount: "200g", per100: { protein: 9, calories: 116, carbs: 20, fats: 0.4 } },
    { name: "حمص", amount: "200g", per100: { protein: 8.9, calories: 139, carbs: 27, fats: 2.6 } },
    { name: "توفو", amount: "150g", per100: { protein: 8, calories: 76, carbs: 1.9, fats: 4.8 } },
  ],
};

const carbSources: Record<CarbPref, { name: string; amount: string; per100: { protein: number; calories: number; carbs: number; fats: number } }[]> = {
  "rice": [
    { name: "أرز بسمتي مطبوخ", amount: "200g", per100: { protein: 2.7, calories: 130, carbs: 28, fats: 0.3 } },
    { name: "أرز بني مطبوخ", amount: "200g", per100: { protein: 2.6, calories: 111, carbs: 23, fats: 0.9 } },
  ],
  "potato": [
    { name: "بطاطا حلوة مشوية", amount: "200g", per100: { protein: 2, calories: 90, carbs: 21, fats: 0.1 } },
    { name: "بطاطس مسلوق", amount: "200g", per100: { protein: 1.9, calories: 87, carbs: 20, fats: 0.1 } },
  ],
  "pasta": [
    { name: "معكرونة قمح كامل", amount: "200g", per100: { protein: 5, calories: 131, carbs: 25, fats: 0.8 } },
    { name: "معكرونة عادية", amount: "200g", per100: { protein: 4.5, calories: 131, carbs: 27, fats: 1 } },
  ],
  "oats": [
    { name: "شوفان", amount: "100g", per100: { protein: 13, calories: 389, carbs: 66, fats: 6.9 } },
    { name: "خبز أسمر", amount: "2 شرائح", per100: { protein: 9, calories: 247, carbs: 41, fats: 3.4 } },
  ],
  "mixed": [
    { name: "أرز بسمتي مطبوخ", amount: "150g", per100: { protein: 2.7, calories: 130, carbs: 28, fats: 0.3 } },
    { name: "بطاطا حلوة مشوية", amount: "150g", per100: { protein: 2, calories: 90, carbs: 21, fats: 0.1 } },
    { name: "خبز أسمر", amount: "شريحة", per100: { protein: 9, calories: 247, carbs: 41, fats: 3.4 } },
  ],
};

const fatSources: Record<FatPref, { name: string; amount: string; per100: { protein: number; calories: number; carbs: number; fats: number } }[]> = {
  "olive-oil": [
    { name: "زيت زيتون", amount: "2 ملعقة", per100: { protein: 0, calories: 884, carbs: 0, fats: 100 } },
    { name: "زيتون أسود", amount: "50g", per100: { protein: 0.8, calories: 115, carbs: 6, fats: 11 } },
  ],
  "nuts": [
    { name: "لوز", amount: "30g", per100: { protein: 21, calories: 579, carbs: 22, fats: 50 } },
    { name: "عين جمل", amount: "30g", per100: { protein: 15, calories: 654, carbs: 14, fats: 65 } },
  ],
  "avocado": [
    { name: "أفوكادو", amount: "نصف حبة", per100: { protein: 2, calories: 160, carbs: 8.5, fats: 15 } },
    { name: "زيت جوز هند", amount: "1 ملعقة", per100: { protein: 0, calories: 862, carbs: 0, fats: 100 } },
  ],
  "mixed": [
    { name: "زيت زيتون", amount: "1 ملعقة", per100: { protein: 0, calories: 884, carbs: 0, fats: 100 } },
    { name: "لوز", amount: "20g", per100: { protein: 21, calories: 579, carbs: 22, fats: 50 } },
    { name: "أفوكادو", amount: "نصف حبة", per100: { protein: 2, calories: 160, carbs: 8.5, fats: 15 } },
  ],
};

function calcMacro(amount: string, per100: { protein: number; calories: number; carbs: number; fats: number }): { protein: number; calories: number; carbs: number; fats: number } {
  const gramsMatch = amount.match(/(\d+)g/);
  const ratio = gramsMatch ? parseInt(gramsMatch[1]) / 100 : 1;
  return {
    protein: Math.round(per100.protein * ratio * 10) / 10,
    calories: Math.round(per100.calories * ratio),
    carbs: Math.round(per100.carbs * ratio * 10) / 10,
    fats: Math.round(per100.fats * ratio * 10) / 10,
  };
}

const mealTemplates: Record<string, { name: string; time: string }[]> = {
  "gain": [
    { name: "وجبة ما قبل التمرين", time: "07:00" },
    { name: "الإفطار", time: "08:30" },
    { name: "الغداء", time: "12:30" },
    { name: "وجبة خفيفة", time: "15:30" },
    { name: "العشاء", time: "19:00" },
    { name: "وجبة قبل النوم", time: "22:00" },
  ],
  "loss": [
    { name: "الإفطار", time: "08:00" },
    { name: "الغداء", time: "13:00" },
    { name: "وجبة خفيفة", time: "16:00" },
    { name: "العشاء", time: "19:30" },
  ],
  "maintain": [
    { name: "الإفطار", time: "07:30" },
    { name: "الغداء", time: "12:30" },
    { name: "وجبة خفيفة", time: "15:30" },
    { name: "العشاء", time: "19:00" },
    { name: "وجبة خفيفة مسائية", time: "21:30" },
  ],
};

const vegetables = [
  { name: "سلطة خضراء", amount: "كوب", calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: "بروكلي مبخر", amount: "100g", calories: 34, protein: 2.8, carbs: 7, fats: 0.4 },
  { name: "خضار مشكلة", amount: "150g", calories: 35, protein: 1.5, carbs: 7, fats: 0.3 },
];

export function generateMealPlan(input: MealPlanInput): MealPlan {
  const bmr = calculateBMR(input.weight, input.height, input.age, input.gender);
  const tdee = calculateTDEE(bmr, input.trainingDays);
  const { calories, proteinRatio, carbsRatio, fatsRatio } = calculateMacros(tdee, input.goal);

  const proteinGrams = Math.round((calories * proteinRatio) / 4);
  const carbsGrams = Math.round((calories * carbsRatio) / 4);
  const fatsGrams = Math.round((calories * fatsRatio) / 9);
  const waterMl = input.weight * 35;

  const proteinItems = proteinSources[input.protein];
  const carbItems = carbSources[input.carbs];
  const fatItems = fatSources[input.fats];

  const meals = mealTemplates[input.goal].map((template) => {
    const foods: Meal["foods"] = [];
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;

    const pItem = proteinItems[Math.floor(Math.random() * proteinItems.length)];
    const pMacro = calcMacro(pItem.amount, pItem.per100);
    foods.push({ name: pItem.name, amount: pItem.amount, ...pMacro });
    totalCalories += pMacro.calories; totalProtein += pMacro.protein; totalCarbs += pMacro.carbs; totalFats += pMacro.fats;

    const cItem = carbItems[Math.floor(Math.random() * carbItems.length)];
    const cMacro = calcMacro(cItem.amount, cItem.per100);
    foods.push({ name: cItem.name, amount: cItem.amount, ...cMacro });
    totalCalories += cMacro.calories; totalProtein += cMacro.protein; totalCarbs += cMacro.carbs; totalFats += cMacro.fats;

    const veg = vegetables[Math.floor(Math.random() * vegetables.length)];
    foods.push(veg);
    totalCalories += veg.calories; totalProtein += veg.protein; totalCarbs += veg.carbs; totalFats += veg.fats;

    const fItem = fatItems[Math.floor(Math.random() * fatItems.length)];
    const fMacro = calcMacro(fItem.amount, fItem.per100);
    foods.push({ name: fItem.name, amount: fItem.amount, ...fMacro });
    totalCalories += fMacro.calories; totalFats += fMacro.fats;

    return { ...template, foods, totalCalories, totalProtein, totalCarbs, totalFats };
  });

  const shoppingList = [
    ...new Set(meals.flatMap((m) => m.foods.map((f) => `${f.name} (${f.amount})`))),
    `ماء ${waterMl}ml يومياً`,
  ];

  return {
    dailyCalories: Math.round(calories),
    protein: { grams: proteinGrams, calories: Math.round(calories * proteinRatio) },
    carbs: { grams: carbsGrams, calories: Math.round(calories * carbsRatio) },
    fats: { grams: fatsGrams, calories: Math.round(calories * fatsRatio) },
    waterMl,
    meals,
    shoppingList,
  };
}
