import axios from "axios";

const API_URL = process.env.ENVLOCK_API_URL || "http://localhost:3001";
const KEYDROP_KEY = process.env.KEYDROP_KEY;
// and update the rest to use KEYDROP_KEY instead of ENVLOCK_KEY

if (!KEYDROP_KEY) {
  console.warn("[KEYDROP] No KEYDROP_KEY found in environment. Skipping.");
} else {
  try {
    // fetch secrets from backend using the key as auth
    const res = await axios.get(`${API_URL}/secrets`, {
      headers: {
        Authorization: `Bearer ${KEYDROP_KEY}`,
      },
    });

    const secrets = res.data.secrets;

    // inject every secret into process.env
    for (const [key, value] of Object.entries(secrets)) {
      process.env[key] = value;
    }

    console.log(`[KEYDROP] Injected ${Object.keys(secrets).length} secret(s)`);
  } catch (err) {
    console.error("[KEYDROP] Failed to fetch secrets:", err.message);
    process.exit(1);
  }
}