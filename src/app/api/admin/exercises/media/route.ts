import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const EXERCISE_MEDIA_DIR = "public/exercise-media";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const exerciseName = formData.get("exerciseName") as string;
    const mediaType = formData.get("mediaType") as string;

    if (!file || !exerciseName || !mediaType) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const ext = file.name.split(".").pop();
    const safeName = exerciseName.replace(/[/\\?%*:|"<>]/g, "-");
    const dirPath = path.join(process.cwd(), EXERCISE_MEDIA_DIR, safeName);
    await mkdir(dirPath, { recursive: true });

    const filename = `${mediaType}.${ext}`;
    const filePath = path.join(dirPath, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, url: `/exercise-media/${safeName}/${filename}` });
  } catch (error) {
    console.error("Media upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
