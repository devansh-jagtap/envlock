import axios from "axios";

const API_URL = process.env.KEYDROP_API_URL || "https://keydrop-production-d38c.up.railway.app";

(async () => {
  const KEYDROP_KEY = process.env.KEYDROP_KEY;

  if (!KEYDROP_KEY) {
    console.warn("[KeyDrop] No KEYDROP_KEY found in environment. Skipping.");
    return;
  }

  try {
    const res = await axios.get(`${API_URL}/secrets`, {
      headers: { Authorization: `Bearer ${KEYDROP_KEY}` },
    });

    const secrets = res.data.secrets;
    Object.assign(process.env, secrets);

    console.log(`[KeyDrop] Injected ${Object.keys(secrets).length} secret(s)`);
  } catch (err) {
    console.error("[KeyDrop] Failed to fetch secrets:", err instanceof Error ? err.message : String(err));
  }
})();