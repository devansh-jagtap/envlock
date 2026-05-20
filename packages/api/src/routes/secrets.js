import { Router } from "express";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import { prisma } from "../lib/prisma.js";
import { encrypt, decrypt } from "../lib/crypto.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" },
});

// POST /upload — requires auth
router.post("/upload", apiLimiter, requireAuth, async (req, res) => {
  const { secrets, name } = req.body;

  if (!secrets || typeof secrets !== "object") {
    return res.status(400).json({ message: "Invalid secrets payload" });
  }

  const projectKey = "proj_" + crypto.randomBytes(8).toString("hex");
  const encryptedData = encrypt(JSON.stringify(secrets));

  await prisma.project.create({
    data: {
      projectKey,
      encryptedData,
      name: name || "Untitled Project",
      userId: req.user.userId,
    },
  });

  return res.json({ projectKey });
});

// PUT /upload — requires auth
router.put("/upload", apiLimiter, requireAuth, async (req, res) => {
  const { secrets } = req.body;
  const projectKey = req.body.projectKey;

  if (!projectKey) {
    return res.status(400).json({ message: "projectKey required in body" });
  }

  if (!secrets || typeof secrets !== "object") {
    return res.status(400).json({ message: "Invalid secrets payload" });
  }

  const project = await prisma.project.findUnique({ where: { projectKey } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.userId !== req.user.userId) {
    return res.status(403).json({ message: "Not your project" });
  }

  const encryptedData = encrypt(JSON.stringify(secrets));
  await prisma.project.update({
    where: { projectKey },
    data: { encryptedData },
  });

  return res.json({ projectKey });
});

// GET /secrets — public, SDK uses this
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
router.get("/projects", apiLimiter, requireAuth, async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.user.userId },
    select: {
      id: true,
      projectKey: true,
      name: true,
    },
  });

  return res.json({ projects });
});

// DELETE /project/:key — requires auth
router.delete("/project/:key", apiLimiter, requireAuth, async (req, res) => {
  const { key } = req.params;

  const project = await prisma.project.findUnique({ where: { projectKey: key } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.userId !== req.user.userId) {
    return res.status(403).json({ message: "Not your project" });
  }

  await prisma.project.delete({ where: { projectKey: key } });

  return res.json({ success: true });
});

export default router;