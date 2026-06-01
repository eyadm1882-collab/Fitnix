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

const MUSCLE_ORDER = ["صدر", "ظهر", "ارجل", "اكتاف", "باي", "تراي", "بطن"];

export async function GET() {
  const exercises: { name: string; muscleGroup: string; location: string }[] = [];

  for (const muscle of MUSCLE_ORDER) {
    for (const name of GYM_WORKOUTS[muscle] || []) {
      exercises.push({ name, muscleGroup: muscle, location: "gym" });
    }
  }

  for (const muscle of MUSCLE_ORDER) {
    for (const name of HOME_WORKOUTS[muscle] || []) {
      const exists = exercises.find((e) => e.name === name && e.location === "gym");
      if (exists) {
        exercises.push({ name, muscleGroup: muscle, location: "home" });
      } else {
        exercises.push({ name, muscleGroup: muscle, location: "home" });
      }
    }
  }

  return Response.json({ exercises, muscles: MUSCLE_ORDER });
}
