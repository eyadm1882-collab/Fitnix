"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Dumbbell, Info, Bot, Sparkles } from "lucide-react";
import AIChat from "@/components/ai/AIChat";

type BodyView = "front" | "back";

interface Exercise {
  name: string;
  image?: string;
}

interface MuscleGroup {
  id: string;
  name: string;
  exercises: Exercise[];
}

const muscleGroups: MuscleGroup[] = [
  {
    id: "back",
    name: "الظهر",
    exercises: [
      { name: "سحب دمبل زوجي" },
      { name: "سحب ضيق" },
      { name: "سحب مكينة" },
      { name: "سحب تي بار" },
      { name: "سحب ارضي ضيق" },
    ],
  },
  {
    id: "biceps",
    name: "الباي",
    exercises: [
      { name: "دمبل زوجي على مستوى الكتف" },
      { name: "دمبل دوران فردي" },
      { name: "هامر فردي" },
      { name: "بار متعرج واسع" },
      { name: "سحب على مستوى الرأس" },
    ],
  },
  {
    id: "chest",
    name: "الصدر",
    exercises: [
      { name: "صدر علوي دمبل" },
      { name: "تجميع دمبل علوي" },
      { name: "هامر مستوي" },
      { name: "بنش بريس مستوي" },
      { name: "بنش بريس علوي" },
    ],
  },
  {
    id: "forearms",
    name: "سواعد",
    exercises: [
      { name: "سواعد خارجي" },
      { name: "سواعد داخلي" },
    ],
  },
  {
    id: "legs",
    name: "ارجل",
    exercises: [
      { name: "دفع ارجل" },
      { name: "سحب خلفي" },
      { name: "دفع خارجي" },
      { name: "افخاذ داخلي" },
      { name: "بطات جالس" },
    ],
  },
  {
    id: "shoulders",
    name: "الاكتاف",
    exercises: [
      { name: "اكتاف أمامية دمبل" },
      { name: "دفع أمامي" },
      { name: "اكتاف جانبية دمبل" },
      { name: "دمبل جانبي منحني" },
      { name: "اكتاف خلفية" },
    ],
  },
  {
    id: "triceps",
    name: "تراي",
    exercises: [
      { name: "دمبل خلف الرقبة" },
      { name: "سحب عكس فردي" },
      { name: "تراي مسطرة" },
      { name: "دفع منحني دمبل" },
      { name: "دفع من ورا الرأس" },
    ],
  },
  {
    id: "abs",
    name: "البطن",
    exercises: [
      { name: "بطن سفلي عامودي" },
      { name: "بلانك" },
      { name: "بطن جانبي" },
    ],
  },
];

export default function ExerciseLibrary() {
  const [bodyView, setBodyView] = useState<BodyView>("front");
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [aiContext, setAiContext] = useState<string | null>(null);
  const [exerciseMedia, setExerciseMedia] = useState<Record<string, { image?: string; video?: string }>>({});

  useEffect(() => {
    const stored = localStorage.getItem("fitnix_exercise_media");
    if (stored) setExerciseMedia(JSON.parse(stored));
  }, []);

  const selectedGroup = muscleGroups.find((g) => g.id === selectedMuscle);

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="mx-auto max-w-7xl px-4 pb-36 pt-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
            مكتبة التمارين
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            اختر العضلة المستهدفة لعرض التمارين
          </p>
        </motion.div>

        {/* Body Image Section - Large + Toggle */}
        <motion.div
          className="relative mx-auto mb-8 flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Body Image - Large */}
          <div className="relative mx-auto aspect-[3/5] w-full max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-sm md:mx-0 md:max-w-xs lg:max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={bodyView}
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={`/body.tsx/${bodyView}.png`}
                  alt={bodyView === "front" ? "الوجه الأمامي" : "الوجه الخلفي"}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Toggle + Muscle Categories Side Panel */}
          <div className="flex w-full flex-1 flex-col gap-4 md:w-auto">
            {/* Premium Toggle - Single button on right */}
            <div className="flex justify-end">
              <motion.button
                onClick={() => setBodyView(bodyView === "front" ? "back" : "front")}
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all hover:shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-sm font-bold text-gray-700">
                  {bodyView === "front" ? "الوجه الخلفي" : "الوجه الأمامي"}
                </span>
                {bodyView === "front" ? (
                  <ChevronLeft className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </motion.button>
            </div>

            {/* Muscle Categories Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {muscleGroups.map((group, i) => (
                <motion.button
                  key={group.id}
                  onClick={() => setSelectedMuscle(group.id)}
                  className={`flex items-center gap-3 rounded-2xl border-2 p-3 transition-all ${
                    selectedMuscle === group.id
                      ? "border-fitnix bg-fitnix/10 shadow-md shadow-fitnix/10"
                      : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.04 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                    <Image
                      src={`/muscleslibrary.tsx/${group.id}.png`}
                      alt={group.name}
                      fill
                      className="object-cover p-0.5"
                    />
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      selectedMuscle === group.id ? "text-fitnix" : "text-gray-700"
                    }`}
                  >
                    {group.name}
                  </span>
                  {selectedMuscle === group.id && (
                    <span className="mr-auto flex h-5 w-5 items-center justify-center rounded-full bg-fitnix/20">
                      <span className="h-2 w-2 rounded-full bg-fitnix" />
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Exercises Section */}
        <AnimatePresence mode="wait">
          {selectedMuscle && selectedGroup ? (
            <motion.div
              key={selectedMuscle}
              className="mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    تمارين <span className="text-fitnix">{selectedGroup.name}</span>
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">{selectedGroup.exercises.length} تمارين</p>
                </div>
                <button
                  onClick={() => setSelectedMuscle(null)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300"
                >
                  إلغاء الاختيار
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {selectedGroup.exercises.map((exercise, i) => (
                  <motion.div
                    key={exercise.name}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:shadow-fitnix/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    {/* Exercise Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-2xl">
                      {exerciseMedia[exercise.name]?.image ? (
                        <img src={exerciseMedia[exercise.name].image!} alt={exercise.name} className="h-full w-full object-cover transition-all group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center transition-all group-hover:scale-105">
                          <Dumbbell className="mb-2 h-10 w-10 text-gray-200" />
                          <span className="text-xs text-gray-300">صورة التمرين</span>
                        </div>
                      )}
                      {exerciseMedia[exercise.name]?.video && (
                        <div className="absolute right-2 top-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur-sm">
                          🎬 فيديو
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-fitnix/0 opacity-0 transition-all group-hover:bg-fitnix/10 group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-gray-900 shadow-lg backdrop-blur-sm">
                          <Info className="h-4 w-4" />
                          عرض التفاصيل
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-900 transition-colors group-hover:text-fitnix leading-relaxed">
                        {exercise.name}
                      </h3>
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className="rounded-full bg-fitnix/5 px-2.5 py-0.5 text-[11px] font-medium text-fitnix">
                          {selectedGroup.name}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] text-gray-500">
                          تمرين
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAiContext(`شرح تمرين ${exercise.name} للعضلة ${selectedGroup.name}`);
                        }}
                        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-fitnix/20 bg-fitnix/5 px-3 py-2 text-xs font-bold text-fitnix transition-all hover:bg-fitnix/10 hover:border-fitnix/30"
                      >
                        <Bot className="h-3.5 w-3.5" />
                        اسأل AI
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white/60 p-16 backdrop-blur-sm">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-fitnix/5">
                  <Dumbbell className="h-8 w-8 text-fitnix/30" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-400">
                  اختر عضلة من القائمة
                </h3>
                <p className="text-sm text-gray-300">
                  اختر العضلة التي تريد تدريبها لعرض التمارين المتاحة
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exercise Details Modal */}
      <AnimatePresence>
        {selectedExercise && selectedGroup && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedExercise(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Modal Header */}
              <div className={`relative ${exerciseMedia[selectedExercise.name]?.video ? "h-72" : "h-48"} bg-gradient-to-br from-fitnix/20 to-fitnix/5`}>
                {exerciseMedia[selectedExercise.name]?.image ? (
                  <div className="relative h-full w-full">
                    <img src={exerciseMedia[selectedExercise.name].image!} alt={selectedExercise.name} className="h-full w-full object-contain p-4" />
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">
                    <Dumbbell className="mb-3 h-14 w-14 text-fitnix/40" />
                    <span className="text-xs text-gray-400">صورة التمرين</span>
                  </div>
                )}
                {exerciseMedia[selectedExercise.name]?.video && (
                  <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-4">
                    <video
                      src={exerciseMedia[selectedExercise.name].video!}
                      controls
                      className="w-full max-w-xs rounded-2xl shadow-lg ring-1 ring-white/20"
                      poster={exerciseMedia[selectedExercise.name]?.image}
                    >
                      متصفحك لا يدعم تشغيل الفيديو
                    </video>
                  </div>
                )}
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h2 className="mb-2 text-2xl font-black text-gray-900">
                  {selectedExercise.name}
                </h2>
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-fitnix/10 px-3 py-1 text-sm font-medium text-fitnix">
                    {selectedGroup.name}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
                    تمرين قوة
                  </span>
                </div>

                <p className="mb-5 leading-relaxed text-gray-500">
                  تمرين {selectedExercise.name} يستهدف عضلات {selectedGroup.name}
                  بشكل أساسي. يمكن أداؤه في النادي الرياضي أو المنزل.
                </p>

                <div className="mb-5 flex gap-3">
                  <div className="flex-1 rounded-xl bg-gray-50 p-3 text-center">
                    <span className="block text-xs text-gray-400">المجموعات</span>
                    <span className="text-lg font-bold text-gray-900">4</span>
                  </div>
                  <div className="flex-1 rounded-xl bg-gray-50 p-3 text-center">
                    <span className="block text-xs text-gray-400">التكرارات</span>
                    <span className="text-lg font-bold text-gray-900">12-10-10-8</span>
                  </div>
                  <div className="flex-1 rounded-xl bg-gray-50 p-3 text-center">
                    <span className="block text-xs text-gray-400">الراحة</span>
                    <span className="text-lg font-bold text-gray-900">60 ث</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setAiContext(`شرح تمرين ${selectedExercise.name} للعضلة ${selectedGroup.name} مع مجموعات وتكرارات`);
                      setSelectedExercise(null);
                    }}
                    className="flex-1 rounded-2xl border-2 border-fitnix bg-fitnix/5 py-3.5 text-sm font-bold text-fitnix transition-all hover:bg-fitnix/10"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Bot className="h-4 w-4" />
                      اسأل AI
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-3.5 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
                  >
                    فهمت
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {aiContext && (
          <AIChat
            initialContext={aiContext}
            onClose={() => setAiContext(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
