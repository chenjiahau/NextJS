import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export const runtime = "nodejs"; // important for jose

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const payload = await verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    return NextResponse.json({ valid: true, user: payload });
  } catch (err) {
    console.error("Verify API error:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}