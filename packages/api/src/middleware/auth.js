import { verifyToken } from "../lib/jwt.js";

export function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
