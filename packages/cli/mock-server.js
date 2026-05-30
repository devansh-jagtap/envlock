#!/usr/bin/env node
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mock database to store uploaded secrets
const uploadedSecrets = new Map();

app.post("/upload", (req, res) => {
  const { secrets } = req.body;

  if (!secrets || Object.keys(secrets).length === 0) {
    return res.status(400).json({ message: "No secrets provided" });
  }

  // Generate a unique project key
  const projectKey = uuidv4();

  // Store the secrets (in a real app, this would be encrypted and stored in a database)
  uploadedSecrets.set(projectKey, secrets);

  console.log(`Uploaded ${Object.keys(secrets).length} secret(s) with key: ${projectKey}`);

  res.json({ projectKey });
});

// Endpoint to retrieve secrets (for testing)
app.get("/secrets/:projectKey", (req, res) => {
  const { projectKey } = req.params;
  const secrets = uploadedSecrets.get(projectKey);

  if (!secrets) {
    return res.status(404).json({ message: "Project key not found" });
  }

  res.json({ secrets });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(` Mock ENVLOCK API server running on http://localhost:${PORT}`);
  console.log(` POST /upload - Upload .env secrets`);
  console.log(` GET /secrets/:projectKey - Retrieve secrets (testing only)`);
  console.log(`GET /health - Health check`);
});
