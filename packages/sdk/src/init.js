import axios from "axios";

const API_URL = process.env.KEYDROP_API_URL || "http://localhost:3001";
const KEYDROP_KEY = process.env.KEYDROP_KEY;

if (!KEYDROP_KEY) {
  console.warn("[KeyDrop] No KEYDROP_KEY found in environment. Skipping.");
} else {
  try {
    const res = await axios.get(`${API_URL}/secrets`, {
      headers: {
        Authorization: `Bearer ${KEYDROP_KEY}`,
      },
    });

    const secrets = res.data.secrets;

    for (const [key, value] of Object.entries(secrets)) {
      process.env[key] = value;
    }

    console.log(`[KeyDrop]  Injected ${Object.keys(secrets).length} secret(s)`);
  } catch (err) {
    console.error("[KeyDrop]  Failed to fetch secrets:", err.message);
    process.exit(1);
  }
}