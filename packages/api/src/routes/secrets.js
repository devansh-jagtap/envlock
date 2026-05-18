import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../lib/prisma.js";
import { encrypt, decrypt } from "../lib/crypto.js";

const router = Router();


// POST /upload — receive secrets, encrypt, store, return key
router.post("/upload", async (req, res) => {
  const { secrets } = req.body;

  if (!secrets || typeof secrets !== "object") {
    return res.status(400).json({ message: "Invalid secrets payload" });
  }

  const projectKey = "proj_" + crypto.randomBytes(8).toString("hex");
  const encryptedData = encrypt(JSON.stringify(secrets));

  await prisma.project.create({
    data: { projectKey, encryptedData },
  });

  return res.json({ projectKey });
});
// PUT /upload — update existing project secrets
router.put("/upload", async (req, res) => {
  const { secrets } = req.body;
  const authHeader = req.headers["authorization"];
  const projectKey = authHeader?.replace("Bearer ", "");

  if (!projectKey) {
    return res.status(401).json({ message: "Missing KEYDROP_KEY" });
  }

  if (!secrets || typeof secrets !== "object") {
    return res.status(400).json({ message: "Invalid secrets payload" });
  }

  const project = await prisma.project.findUnique({ where: { projectKey } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const encryptedData = encrypt(JSON.stringify(secrets));

  await prisma.project.update({
    where: { projectKey },
    data: { encryptedData },
  });

  return res.json({ projectKey });
});

// GET /secrets — SDK fetches secrets using ENVLOCK_KEY
router.get("/secrets", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const projectKey = authHeader?.replace("Bearer ", "");

  if (!projectKey) {
    return res.status(401).json({ message: "Missing ENVLOCK_KEY" });
  }

  const project = await prisma.project.findUnique({ where: { projectKey } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const secrets = JSON.parse(decrypt(project.encryptedData));
  return res.json({ secrets });
});


router.post("/auth/register",async(req,res)=>{

})
router.post("/auth/login",async(req,res)=>{

})

export default router;