"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Flame, Beef, Wheat, Droplets, ShoppingCart, Sun, Moon, Coffee, Apple } from "lucide-react";

interface Meal {
  name: string;
  time: string;
  foods: { name: string; amount: string; calories: number; protein: number; carbs: number; fats: number }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

interface MealPlan {
  dailyCalories: number;
  protein: { grams: number; calories: number };
  carbs: { grams: number; calories: number };
  fats: { grams: number; calories: number };
  waterMl: number;
  meals: Meal[];
  shoppingList: string[];
}

const mealIcons: Record<string, any> = {
  "الإفطار": Coffee,
  "وجبة ما قبل التمرين": Apple,
  "الغداء": Sun,
  "وجبة خفيفة": Apple,
  "العشاء": Moon,
  "وجبة قبل النوم": Moon,
  "وجبة خفيفة مسائية": Moon,
};

export default function MealPlanResult({ plan }: { plan: MealPlan }) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Macro Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "السعرات", value: plan.dailyCalories, unit: "سعرة", icon: Flame, color: "from-orange-500 to-red-500" },
          { label: "بروتين", value: plan.protein.grams, unit: "جم", icon: Beef, color: "from-fitnix to-fitnix-dark" },
          { label: "كربوهيدرات", value: plan.carbs.grams, unit: "جم", icon: Wheat, color: "from-amber-500 to-yellow-500" },
          { label: "دهون", value: plan.fats.grams, unit: "جم", icon: Droplets, color: "from-blue-500 to-indigo-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-md`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.label}</p>
            <p className="text-[10px] text-gray-300">{stat.unit}</p>
          </motion.div>
        ))}
      </div>

      {/* Water */}
      <motion.div
        className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-200/50">
          <Droplets className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-blue-800">شرب الماء</p>
          <p className="text-xs text-blue-600">{plan.waterMl} مل يومياً ({(plan.waterMl / 250).toFixed(0)} كوب)</p>
        </div>
        <span className="mr-auto text-2xl font-black text-blue-600">{(plan.waterMl / 1000).toFixed(1)}L</span>
      </motion.div>

      {/* Meals */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <UtensilsCrossed className="h-5 w-5 text-fitnix" />
          الوجبات
        </h3>
        {plan.meals.map((meal, mi) => {
          const Icon = mealIcons[meal.name] || UtensilsCrossed;
          return (
            <motion.div
              key={meal.name}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + mi * 0.1 }}
            >
              <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fitnix/10 to-fitnix/5">
                    <Icon className="h-5 w-5 text-fitnix" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{meal.name}</p>
                    <p className="text-xs text-gray-400">{meal.time}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-fitnix">{meal.totalCalories}</p>
                  <p className="text-[10px] text-gray-400">سعرة</p>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {meal.foods.map((food, fi) => (
                  <div key={fi} className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-fitnix/40" />
                      <div>
                        <p className="text-sm text-gray-700">{food.name}</p>
                        <p className="text-[10px] text-gray-400">{food.amount}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-[10px] text-gray-400">
                      <span>{food.calories} سعرة</span>
                      <span className="font-medium text-fitnix">P{food.protein}</span>
                      <span className="font-medium text-amber-500">C{food.carbs}</span>
                      <span className="font-medium text-blue-500">F{food.fats}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-around border-t border-gray-50 bg-gray-50/30 px-4 py-2 text-[10px] text-gray-400">
                <span>بروتين: {Math.round(meal.totalProtein)}جم</span>
                <span>كربوهيدرات: {Math.round(meal.totalCarbs)}جم</span>
                <span>دهون: {Math.round(meal.totalFats)}جم</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Shopping List */}
      <motion.div
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-fitnix" />
          <h3 className="text-lg font-bold text-gray-900">قائمة المشتريات</h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {plan.shoppingList.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.05 }}
            >
              <div className="h-2 w-2 rounded-full bg-fitnix/60" />
              <span className="text-sm text-gray-700">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
