import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuthFromRequest } from "@/lib/api-auth";

export const runtime = "nodejs";

// POST /api/article
export async function POST(request) {
  const user = await requireAuthFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await request.json();
  if (!title?.trim()) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  const newArticle = await prisma.article.create({
    data: {
      title,
      content: content || null,
      userId: user.sub,
    },
  });

  return NextResponse.json({ data: newArticle }, { status: 201 });
}