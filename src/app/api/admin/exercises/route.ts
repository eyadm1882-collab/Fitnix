import { NextResponse } from "next/server";
import { writeFile, readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const BODY_DIR = "public/body.tsx";
const MUSCLES_DIR = "public/muscleslibrary.tsx";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const name = formData.get("name") as string;

    if (!file || !category || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const targetDir = category === "body" ? BODY_DIR : MUSCLES_DIR;
    const dirPath = path.join(process.cwd(), targetDir);
    await mkdir(dirPath, { recursive: true });

    const ext = file.name.split(".").pop();
    const filename = `${name}.${ext}`;
    const filePath = path.join(dirPath, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error("Exercise upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  const bodyDir = path.join(process.cwd(), BODY_DIR);
  const musclesDir = path.join(process.cwd(), MUSCLES_DIR);

  let bodyImages: string[] = [];
  let muscleImages: string[] = [];

  try {
    if (existsSync(bodyDir)) bodyImages = await readdir(bodyDir);
    if (existsSync(musclesDir)) muscleImages = await readdir(musclesDir);
  } catch {}

  return NextResponse.json({ bodyImages, muscleImages });
}
