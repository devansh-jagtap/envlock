import { Router } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import { prisma } from "../lib/prisma.js";
import { signToken, verifyToken } from "../lib/jwt.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" },
});

// POST /auth/register
router.post("/register", authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  const token = signToken({ userId: user.id, email: user.email });
  return res.json({ token, email: user.email });
});

// POST /auth/login
router.post("/login", authLimiter, async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ userId: user.id, email: user.email });
  return res.json({ token, email: user.email });
});

// POST /auth/cli/init — CLI calls this to start browser login
router.post("/cli/init", authLimiter, async (req, res) => {
  const token = crypto.randomBytes(16).toString("hex");

  await prisma.cliToken.create({ data: { token } });

  return res.json({ token });
});

// GET /auth/cli/poll — CLI polls this waiting for JWT
router.get("/cli/poll", authLimiter, async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  const record = await prisma.cliToken.findUnique({ where: { token } });

  if (!record) {
    return res.status(404).json({ message: "Token not found" });
  }

  if (!record.jwt) {
    return res.json({ status: "pending" });
  }

  // delete after use
  await prisma.cliToken.delete({ where: { token } });

  return res.json({ status: "authorized", jwt: record.jwt });
});

// POST /auth/cli/confirm — website calls this after user logs in
router.post("/cli/confirm", authLimiter, async (req, res) => {
  const { token, jwt: jwtValue } = req.body;

  if (!token || !jwtValue) {
    return res.status(400).json({ message: "Token and jwt required" });
  }

  try {
    verifyToken(jwtValue);
  } catch {
    return res.status(400).json({ message: "Invalid jwt value" });
  }

  const record = await prisma.cliToken.findUnique({ where: { token } });

  if (!record) {
    return res.status(404).json({ message: "Token not found" });
  }

  await prisma.cliToken.update({
    where: { token },
    data: { jwt: jwtValue, used: true },
  });

  return res.json({ success: true });
});

export default router;
