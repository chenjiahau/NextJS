import { jwtVerify } from "jose";

export const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export async function requireAuthFromRequest(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1]; // Extract the token part
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload; // e.g., { sub: "userId", email: "..." }
  } catch {
    return null;
  }
}