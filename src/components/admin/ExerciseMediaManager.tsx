"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Dumbbell, Image, Upload, Trash2, Loader2, CheckCircle2, ChevronDown, ChevronUp, Video, X } from "lucide-react";

interface Exercise {
  name: string;
  muscleGroup: string;
  location: string;
}

interface ExerciseMedia {
  image?: string;
  video?: string;
}

export default function ExerciseMediaManager() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscles, setMuscles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMuscle, setFilterMuscle] = useState<string>("all");
  const [filterLocation, setFilterLocation] = useState<string>("all");
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<"image" | "video" | null>(null);
  const [mediaMap, setMediaMap] = useState<Record<string, ExerciseMedia>>({});
  const [expandedMuscle, setExpandedMuscle] = useState<string>("all");
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchExercises();
    const stored = localStorage.getItem("fitnix_exercise_media");
    if (stored) setMediaMap(JSON.parse(stored));
  }, []);

  const fetchExercises = async () => {
    try {
      const res = await fetch("/api/admin/exercises/list");
      const data = await res.json();
      setExercises(data.exercises || []);
      setMuscles(data.muscles || []);
    } catch {
      console.error("Failed to fetch exercises");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (exerciseName: string, type: "image" | "video") => {
    setUploadingFor(exerciseName);
    setUploadType(type);
    if (type === "image") imageRef.current?.click();
    else videoRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingFor || !uploadType) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("exerciseName", uploadingFor);
    formData.append("mediaType", uploadType);

    try {
      const res = await fetch("/api/admin/exercises/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const objectUrl = URL.createObjectURL(file);
        const updated = { ...mediaMap };
        if (!updated[uploadingFor]) updated[uploadingFor] = {};
        updated[uploadingFor] = { ...updated[uploadingFor], [uploadType]: objectUrl };
        setMediaMap(updated);
        localStorage.setItem("fitnix_exercise_media", JSON.stringify(updated));
      }
    } catch {
      console.error("Upload failed");
    } finally {
      setUploadingFor(null);
      setUploadType(null);
    }
  };

  const removeMedia = (exerciseName: string, type: "image" | "video") => {
    const updated = { ...mediaMap };
    if (updated[exerciseName]) {
      delete updated[exerciseName][type];
      if (!updated[exerciseName].image && !updated[exerciseName].video) {
        delete updated[exerciseName];
      }
    }
    setMediaMap(updated);
    localStorage.setItem("fitnix_exercise_media", JSON.stringify(updated));
  };

  const filtered = exercises.filter((ex) => {
    if (filterMuscle !== "all" && ex.muscleGroup !== filterMuscle) return false;
    if (filterLocation !== "all" && ex.location !== filterLocation) return false;
    if (searchQuery && !ex.name.includes(searchQuery)) return false;
    return true;
  });

  const grouped = filtered.reduce<Record<string, Exercise[]>>((acc, ex) => {
    if (!acc[ex.muscleGroup]) acc[ex.muscleGroup] = [];
    acc[ex.muscleGroup].push(ex);
    return acc;
  }, {});

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-fitnix" /></div>;
  }

  return (
    <div>
      <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
      <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={handleFileSelect} />

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث عن تمرين..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-11 pl-4 text-sm text-gray-900 outline-none focus:border-fitnix" dir="rtl" />
        </div>
        <select value={filterMuscle} onChange={(e) => setFilterMuscle(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-fitnix">
          <option value="all">كل العضلات</option>
          {muscles.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-fitnix">
          <option value="all">الكل</option>
          <option value="gym">نادي</option>
          <option value="home">منزل</option>
        </select>
      </div>

      {/* Stats */}
      <div className="mb-4 text-sm text-gray-500">
        إجمالي التمارين: <span className="font-bold text-gray-900">{exercises.length}</span>
        {filterMuscle !== "all" || filterLocation !== "all" || searchQuery ? (
          <> · المعروض: <span className="font-bold text-fitnix">{filtered.length}</span></>
        ) : null}
      </div>

      {/* Exercise List by Muscle Group */}
      {Object.entries(grouped).map(([muscle, exs]) => {
        const isExpanded = expandedMuscle === muscle || expandedMuscle === "all";
        return (
          <div key={muscle} className="mb-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <button
              onClick={() => setExpandedMuscle(isExpanded && expandedMuscle !== "all" ? "all" : muscle)}
              className="flex w-full items-center justify-between bg-gray-50/80 px-5 py-3.5 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-fitnix" />
                <span className="text-sm font-bold text-gray-900">{muscle}</span>
                <span className="rounded-lg bg-fitnix/5 px-2 py-0.5 text-[10px] font-medium text-fitnix">{exs.length}</span>
              </div>
              {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
            </button>

            {isExpanded && (
              <div className="divide-y divide-gray-50">
                {exs.map((ex) => {
                  const media = mediaMap[ex.name] || {};
                  const isUploading = uploadingFor === ex.name;
                  return (
                    <div key={`${ex.name}-${ex.location}`} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50/50">
                      {/* Thumbnail */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                        {media.image ? (
                          <img src={media.image} alt={ex.name} className="h-full w-full object-cover" />
                        ) : (
                          <Dumbbell className="h-5 w-5 text-gray-300" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{ex.name}</p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                          <span>{ex.muscleGroup}</span>
                          <span className={`rounded px-1.5 py-0.5 ${ex.location === "gym" ? "bg-blue-50 text-blue-500" : "bg-green-50 text-green-500"}`}>
                            {ex.location === "gym" ? "نادي" : "منزل"}
                          </span>
                        </div>
                      </div>

                      {/* Image Upload */}
                      <div className="flex items-center gap-1">
                        {media.image ? (
                          <div className="group relative">
                            <img src={media.image} alt="" className="h-8 w-8 rounded-lg object-cover ring-1 ring-gray-100" />
                            <button onClick={() => removeMedia(ex.name, "image")}
                              className="absolute -right-1 -top-1 hidden rounded-full bg-red-500 p-0.5 text-white group-hover:block">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <motion.button
                            onClick={() => handleUpload(ex.name, "image")}
                            disabled={isUploading}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-gray-200 text-gray-300 transition-colors hover:border-fitnix hover:text-fitnix disabled:opacity-40"
                            whileHover={{ scale: 1.05 }}
                          >
                            {isUploading && uploadType === "image" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Image className="h-3.5 w-3.5" />}
                          </motion.button>
                        )}
                      </div>

                      {/* Video Upload */}
                      <div>
                        {media.video ? (
                          <div className="group relative">
                            <video src={media.video} className="h-8 w-12 rounded-lg object-cover ring-1 ring-gray-100" />
                            <button onClick={() => removeMedia(ex.name, "video")}
                              className="absolute -right-1 -top-1 hidden rounded-full bg-red-500 p-0.5 text-white group-hover:block">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <motion.button
                            onClick={() => handleUpload(ex.name, "video")}
                            disabled={isUploading}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-gray-200 text-gray-300 transition-colors hover:border-fitnix hover:text-fitnix disabled:opacity-40"
                            whileHover={{ scale: 1.05 }}
                          >
                            {isUploading && uploadType === "video" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Video className="h-3.5 w-3.5" />}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <Search className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm text-gray-500">لا توجد نتائج للبحث</p>
        </div>
      )}
    </div>
  );
}
