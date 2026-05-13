import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import axios from "axios";

const API_URL = process.env.KEYDROP_API_URL || "https://keydrop-production-d38c.up.railway.app";

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

  // check if KEYDROP_KEY already exists
  const existingKey = parsed.KEYDROP_KEY;

  // remove KEYDROP_KEY from secrets before uploading
  const secrets = { ...parsed };
  delete secrets.KEYDROP_KEY;

  if (Object.keys(secrets).length === 0) {
    console.error(" No secrets found only KEYDROP_KEY exists in .env.");
    process.exit(1);
  }

  console.log(`${existingKey ? "Updating" : "Uploading"} ${Object.keys(secrets).length} secret(s)...`);

  let projectKey;

  try {
    if (existingKey) {
      // UPDATE existing project
      const res = await axios.put(`${API_URL}/upload`, { secrets }, {
        headers: { Authorization: `Bearer ${existingKey}` },
      });
      projectKey = res.data.projectKey;
      fs.writeFileSync(envPath, `KEYDROP_KEY=${projectKey}\n`, "utf-8"); // ✅ rewrite
      console.log(`✅ Secrets updated! Your .env is now:`);
      console.log(`\n   KEYDROP_KEY=${projectKey}\n`);
      console.log(`Your secrets have been updated in the vault.`);
    } else {
      // CREATE new project
      const res = await axios.post(`${API_URL}/upload`, { secrets });
      projectKey = res.data.projectKey;
      fs.writeFileSync(envPath, `KEYDROP_KEY=${projectKey}\n`, "utf-8");
      console.log(` Done! Your .env is now:`);
      console.log(`\n   KEYDROP_KEY=${projectKey}\n`);
      console.log(`Deploy with just this key. Your app will work normally.`);
    }
  } catch (err) {
    console.error(" Failed:", err.response?.data?.message || err.message);
    process.exit(1);
  }
}