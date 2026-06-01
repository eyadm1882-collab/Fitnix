export type Goal = "loss" | "gain";
export type Location = "gym" | "home";
export type DayName = "السبت" | "الأحد" | "الاثنين" | "الثلاثاء" | "الأربعاء" | "الخميس" | "الجمعة";

export interface WorkoutExercise {
  name: string;
  muscleGroup: string;
  sets: string;
  reps: string;
}

export interface WorkoutDay {
  day: DayName;
  focus: string;
  exercises: WorkoutExercise[];
}

const GYM_WORKOUTS: Record<string, string[]> = {
  "صدر": ["بنش بريس مستوي", "دمبل صدر علوي", "تجميع دمبل علوي", "هامر مستوي", "بنش بريس علوي"],
  "ظهر": ["سحب دمبل زوجي", "سحب ضيق", "سحب مكينة", "سحب تي بار", "سحب ارضي ضيق"],
  "ارجل": ["دفع ارجل", "سحب خلفي", "دفع خارجي", "افخاذ داخلي", "بطات جالس"],
  "اكتاف": ["اكتاف أمامية دمبل", "دفع أمامي", "اكتاف جانبية دمبل", "دمبل جانبي منحني", "اكتاف خلفية"],
  "باي": ["دمبل زوجي على مستوى الكتف", "دمبل دوران فردي", "هامر فردي", "بار متعرج واسع", "سحب على مستوى الرأس"],
  "تراي": ["دمبل خلف الرقبة", "سحب عكس فردي", "تراي مسطرة", "دفع منحني دمبل", "دفع من ورا الرأس"],
  "بطن": ["بطن سفلي عامودي", "بلانك", "بطن جانبي"],
};

const HOME_WORKOUTS: Record<string, string[]> = {
  "صدر": ["تمارين الضغط", "ضغط بعرض الكتفين", "ضغط مائل", "ضغط بعرض ضيق"],
  "ظهر": ["سحب بالعقلة", "تمارين المقاومة", "سحب أمامي", "تمارين الظهر بالدمبل"],
  "ارجل": ["قرفصاء", "اندفاع أمامي", "رفع الساق", "جسر الأرداف"],
  "اكتاف": ["ضغط أكتاف بالدمبل", "رفع جانبي", "رفع أمامي", "رفع خلفي"],
  "باي": ["تمرين البايسبس بالدمبل", "هامر كيرل", "كونسنترشن كيرل"],
  "تراي": ["تمديد الترايسبس", "ضغط ترايسبس", "كيك باك"],
  "بطن": ["بلانك", "تمارين البطن السفلية", "تمارين البطن الجانبية", "تمارين البطن العلوية"],
};

const SPLITS: Record<number, { focus: string; muscles: string[] }[]> = {
  3: [
    { focus: "صدر - تراي", muscles: ["صدر", "تراي"] },
    { focus: "ظهر - باي", muscles: ["ظهر", "باي"] },
    { focus: "ارجل - اكتاف", muscles: ["ارجل", "اكتاف"] },
  ],
  4: [
    { focus: "صدر", muscles: ["صدر"] },
    { focus: "ظهر", muscles: ["ظهر"] },
    { focus: "ارجل - بطن", muscles: ["ارجل", "بطن"] },
    { focus: "اكتاف - تراي - باي", muscles: ["اكتاف", "تراي", "باي"] },
  ],
  5: [
    { focus: "صدر - تراي", muscles: ["صدر", "تراي"] },
    { focus: "ظهر - باي", muscles: ["ظهر", "باي"] },
    { focus: "ارجل - بطن", muscles: ["ارجل", "بطن"] },
    { focus: "اكتاف", muscles: ["اكتاف"] },
    { focus: "تراي - باي - بطن", muscles: ["تراي", "باي", "بطن"] },
  ],
};

function getSetsAndReps(goal: Goal, location: Location): { sets: string; reps: string } {
  if (location === "home") return { sets: "4", reps: "10x10x12x12" };
  if (goal === "gain") return { sets: "4", reps: "12x10x10x8" };
  return { sets: "4", reps: "10x12x12x14" };
}

export function generateWorkoutPlan(
  days: DayName[],
  goal: Goal,
  location: Location,
): WorkoutDay[] {
  const workoutMap = location === "gym" ? GYM_WORKOUTS : HOME_WORKOUTS;
  const { sets } = getSetsAndReps(goal, location);
  const splitProgress = SPLITS[days.length] || SPLITS[3];

  return days.map((day, i) => {
    const split = splitProgress[i % splitProgress.length];
    const exercises: WorkoutExercise[] = [];

    split.muscles.forEach((muscle) => {
      const available = workoutMap[muscle] || [];
      const selected = available.slice(0, 3);
      selected.forEach((name) => {
        exercises.push({
          name,
          muscleGroup: muscle,
          sets,
          reps: getSetsAndReps(goal, location).reps,
        });
      });
    });

    return { day, focus: split.focus, exercises };
  });
}
