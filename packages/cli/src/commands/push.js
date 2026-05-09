import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import axios from "axios";

const API_URL = process.env.KEYDROP_API_URL || "http://localhost:3001";

export async function pushCommand() {
  const envPath = path.resolve(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    console.error(" No .env file found in current directory.");
    process.exit(1);
  }

  const raw = fs.readFileSync(envPath, "utf-8");
  const parsed = dotenv.parse(raw);

  if (Object.keys(parsed).length === 0) {
    console.error(" .env file is empty or invalid.");
    process.exit(1);
  }

  console.log(` Uploading ${Object.keys(parsed).length} secret(s)...`);

  let projectKey;
  try {
    const res = await axios.post(`${API_URL}/upload`, { secrets: parsed });
    projectKey = res.data.projectKey;
  } catch (err) {
    console.error("Upload failed:", err.response?.data?.message || err.message);
    process.exit(1);
  }

  fs.writeFileSync(envPath, `KEYDROP_KEY=${projectKey}\n`, "utf-8");

  console.log(` Done! Your .env is now:`);
  console.log(`\n   KEYDROP_KEY=${projectKey}\n`);
  console.log(`Deploy with just this key. Your app will work normally.`);
}