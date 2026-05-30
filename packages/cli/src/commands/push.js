import fs from "fs";
import path from "path";
import dotenv from "dotenv";
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

export async function pushCommand() {
  const token = getAuthToken();
  if (!token) {
    console.error("Not logged in. Run: keydrop login");
    process.exit(1);
  }

  const envPath = path.resolve(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    console.error("No .env file found in current directory.");
    process.exit(1);
  }

  const raw = fs.readFileSync(envPath, "utf-8");
  const parsed = dotenv.parse(raw);

  if (Object.keys(parsed).length === 0) {
    console.error(" .env file is empty or invalid.");
    process.exit(1);
  }

  const existingKey = parsed.KEYDROP_KEY;
  const secrets = { ...parsed };
  delete secrets.KEYDROP_KEY;

  if (Object.keys(secrets).length === 0) {
    console.error(" No secrets found, only KEYDROP_KEY exists in .env.");
    process.exit(1);
  }

  console.log(`${existingKey ? "Updating" : "Uploading"} ${Object.keys(secrets).length} secret(s)...`);

  let projectKey;

  try {
    if (existingKey) {
      const res = await axios.put(`${API_URL}/upload`, 
        { secrets, projectKey: existingKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      projectKey = res.data.projectKey;
      fs.writeFileSync(envPath, `KEYDROP_KEY=${projectKey}\n`, "utf-8");
      console.log(`Secrets updated! Your .env is now:`);
      console.log(`\n   KEYDROP_KEY=${projectKey}\n`);
    } else {
      const res = await axios.post(`${API_URL}/upload`, 
        { secrets },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      projectKey = res.data.projectKey;
      fs.writeFileSync(envPath, `KEYDROP_KEY=${projectKey}\n`, "utf-8");
      console.log(`Done! Your .env is now:`);
      console.log(`\n   KEYDROP_KEY=${projectKey}\n`);
    }
  } catch (err) {
    console.error("Failed:", err.response?.data?.message || err.message);
    process.exit(1);
  }
}