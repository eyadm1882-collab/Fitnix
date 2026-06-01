import { NextResponse } from "next/server";
import { chunkText, searchChunks } from "@/lib/rag/chunker";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["text/plain", "text/markdown", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type. Use PDF, TXT, DOCX, or Markdown." }, { status: 400 });
    }

    const content = await file.text();
    const title = file.name.replace(/\.[^/.]+$/, "");
    const chunks = chunkText(content);

    const { data: doc, error: docError } = await supabase
      .from("ai_documents")
      .insert({ title, file_type: file.type, content })
      .select()
      .single();

    if (docError) throw docError;

    const chunkRecords = chunks.map((chunk, i) => ({
      document_id: doc.id,
      chunk_index: i,
      content: chunk,
    }));

    const { error: chunkError } = await supabase
      .from("ai_chunks")
      .insert(chunkRecords);

    if (chunkError) throw chunkError;

    return NextResponse.json({
      success: true,
      documentId: doc.id,
      chunksCount: chunks.length,
    });
  } catch (error) {
    console.error("Knowledge upload error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    if (query) {
      const { data: chunks } = await supabase
        .from("ai_chunks")
        .select("content, document_id, chunk_index")
        .limit(100);

      if (!chunks || chunks.length === 0) {
        return NextResponse.json({ results: [] });
      }

      const { data: documents } = await supabase
        .from("ai_documents")
        .select("id, title");

      const docMap = new Map((documents || []).map((d) => [d.id, d.title]));

      const allChunks = (chunks || []).map((c) => ({
        content: c.content,
        documentTitle: docMap.get(c.document_id) || "Unknown",
      }));

      const results = searchChunks(query, allChunks, 5);

      return NextResponse.json({ results });
    }

    const { data: documents } = await supabase
      .from("ai_documents")
      .select("id, title, file_type, created_at")
      .order("created_at", { ascending: false });

    return NextResponse.json({ documents: documents || [] });
  } catch (error) {
    console.error("Knowledge search error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
