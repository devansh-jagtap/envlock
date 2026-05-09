import fs from "fs";
import path from "path";
import axios from "axios";

const API_URL = process.env.KEYDROP_API_URL || "http://localhost:3001";

export async function pullCommand(options) {
  const envPath = path.resolve(process.cwd(), ".env");

  // 1. Read current .env to get KEYDROP_KEY
  if (!fs.existsSync(envPath)) {
    console.error("❌ No .env file found in current directory.");
    process.exit(1);
  }

  const currentEnv = fs.readFileSync(envPath, "utf-8");
  const keyMatch = currentEnv.match(/KEYDROP_KEY=(.+)/);

  if (!keyMatch || !keyMatch[1]) {
    console.error(" No KEYDROP_KEY found in .env file.");
    console.error("   Use: keydrop pull <KEYDROP_KEY>");
    process.exit(1);
  }

  const projectKey = keyMatch[1].trim();

  console.log(`🔍 Retrieving secrets for key: ${projectKey}...`);

  // 2. Fetch secrets from backend
  let secrets;
  try {
    const res = await axios.get(`${API_URL}/secrets`, {
      headers: { Authorization: `Bearer ${projectKey}` },
    });
    secrets = res.data.secrets;
  } catch (err) {
    console.error(
      " Failed to retrieve secrets:",
      err.response?.data?.message || err.message
    );
    process.exit(1);
  }

  // 3. Reconstruct .env file
  let envContent = "";
  for (const [key, value] of Object.entries(secrets)) {
    envContent += `${key}=${value}\n`;
  }

  fs.writeFileSync(envPath, envContent, "utf-8");

  console.log(` Secrets restored! Your .env now contains:`);
  console.log(`\n${Object.keys(secrets).join(", ")}\n`);
}
