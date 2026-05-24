import { Router } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { encrypt, decrypt } from "../lib/crypto.js";
import { generateToken, authMiddleware } from "../lib/auth.js";

const router = Router();

// POST /upload — requires auth, creates project linked to user
router.post("/upload", authMiddleware, async (req, res) => {
  const { secrets, name } = req.body;

  if (!secrets || typeof secrets !== "object") {
    return res.status(400).json({ message: "Invalid secrets payload" });
  }

  const projectKey = "proj_" + crypto.randomBytes(24).toString("hex");
  const encryptedData = encrypt(JSON.stringify(secrets));

  await prisma.project.create({
    data: {
      projectKey,
      encryptedData,
      name: name || "Untitled Project",
      userId: req.userId,
    },
  });

  return res.json({ projectKey });
});

// PUT /upload — requires auth, updates existing project
router.put("/upload", authMiddleware, async (req, res) => {
  const { secrets, projectKey } = req.body;

  if (!projectKey) {
    return res.status(400).json({ message: "projectKey required" });
  }

  if (!secrets || typeof secrets !== "object") {
    return res.status(400).json({ message: "Invalid secrets payload" });
  }

  const project = await prisma.project.findUnique({ where: { projectKey } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.userId !== req.userId) {
    return res.status(403).json({ message: "Not your project" });
  }

  const encryptedData = encrypt(JSON.stringify(secrets));
  await prisma.project.update({
    where: { projectKey },
    data: { encryptedData },
  });

  return res.json({ projectKey });
});

// GET /secrets — public, SDK uses this (no auth required for runtime)
router.get("/secrets", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const projectKey = authHeader?.replace("Bearer ", "");

  if (!projectKey) {
    return res.status(401).json({ message: "Missing KEYDROP_KEY" });
  }

  const project = await prisma.project.findUnique({ where: { projectKey } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const secrets = JSON.parse(decrypt(project.encryptedData));
  return res.json({ secrets });
});

// GET /projects — requires auth, returns user's projects
router.get("/projects", authMiddleware, async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.userId },
    select: {
      id: true,
      projectKey: true,
      name: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return res.json({ projects });
});

// DELETE /project/:key — requires auth, deletes project
router.delete("/project/:key", authMiddleware, async (req, res) => {
  const { key } = req.params;

  const project = await prisma.project.findUnique({ where: { projectKey: key } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.userId !== req.userId) {
    return res.status(403).json({ message: "Not your project" });
  }

  await prisma.project.delete({ where: { projectKey: key } });

  return res.json({ success: true });
});

// POST /auth/register
router.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  const token = generateToken(user.id);
  return res.json({ token, userId: user.id, email: user.email });
});

// POST /auth/login
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id);
  return res.json({ token, userId: user.id, email: user.email });
});

export default router;
