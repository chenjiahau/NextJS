import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

/**
 * @param {*} payload 
 * @param {*} exp 
 * @returns 
 */
export async function signJwt(payload, exp = "1h") {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .sign(secret);
}
