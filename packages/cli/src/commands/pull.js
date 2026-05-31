import fs from "fs";
import path from "path";
import axios from "axios";

const API_URL = process.env.KEYDROP_API_URL || "https://keydrop-1wzo.onrender.com";
const CONFIG_PATH = path.join(process.env.HOME || process.env.USERPROFILE, ".keydrop", "config.json");

function getAuthToken() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
      return config.token;
    }
  } catch {}
  return null;
}

export async function pullCommand() {
  const token = getAuthToken();
  if (!token) {
    console.error(" Not logged in. Run: keydrop login");
    process.exit(1);
  }

  const envPath = path.resolve(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    console.error(" No .env file found in current directory.");
    process.exit(1);
  }

  const currentEnv = fs.readFileSync(envPath, "utf-8");
  const keyMatch = currentEnv.match(/KEYDROP_KEY=(.+)/);

  if (!keyMatch || !keyMatch[1]) {
    console.error(" No KEYDROP_KEY found in .env file.");
    process.exit(1);
  }

  const projectKey = keyMatch[1].trim();
  console.log(` Retrieving secrets for key: ${projectKey}...`);

  let secrets;
  try {
    const res = await axios.get(`${API_URL}/secrets`, {
      headers: { Authorization: `Bearer ${projectKey}` },
    });
    secrets = res.data.secrets;
  } catch (err) {
    console.error(" Failed:", err.response?.data?.message || err.message);
    process.exit(1);
  }

  let envContent = `KEYDROP_KEY=${projectKey}\n`;
  for (const [key, value] of Object.entries(secrets)) {
    envContent += `${key}=${value}\n`;
  }

  fs.writeFileSync(envPath, envContent, "utf-8");
  console.log(` Secrets restored! Your .env now contains:`);
  console.log(`\n${Object.keys(secrets).join(", ")}\n`);
  console.log(`KEYDROP_KEY has been kept in your .env file.`);
}