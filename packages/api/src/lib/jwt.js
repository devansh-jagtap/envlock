import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET environment variable must be set");
}

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "30d" });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
