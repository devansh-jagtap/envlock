import dotenv from "dotenv";

dotenv.config();

const API_URL =
  process.env.KEYDROP_API_URL ||
  "https://keydrop-1wzo.onrender.com";

let _promise = null;

export async function init() {
  if (_promise) return _promise;

  _promise = (async () => {
    if (typeof process === "undefined" || !process.env) {
      return;
    }

    const KEYDROP_KEY = process.env.KEYDROP_KEY;

    if (!KEYDROP_KEY) {
      console.warn(`
[KeyDrop] KEYDROP_KEY not found.

To use KeyDrop:

1. Login
   keydrop login

2. Pull your secrets
   keydrop pull

or manually add:

KEYDROP_KEY=proj_xxx

to your .env file.
`);
      return;
    }

    try {
      let data;

      if (typeof fetch !== "undefined") {
        const res = await fetch(`${API_URL}/secrets`, {
          headers: {
            Authorization: `Bearer ${KEYDROP_KEY}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        data = await res.json();
      } else {
        const { default: axios } = await import("axios");

        const res = await axios.get(`${API_URL}/secrets`, {
          headers: {
            Authorization: `Bearer ${KEYDROP_KEY}`,
          },
        });

        data = res.data;
      }

      const secrets = data?.secrets;

      if (
        !secrets ||
        typeof secrets !== "object" ||
        Array.isArray(secrets)
      ) {
        console.warn("[KeyDrop] No secrets returned from server.");
        return;
      }

      Object.assign(process.env, secrets);

      console.log(
        `[KeyDrop] Injected ${Object.keys(secrets).length} secret(s)`
      );
    } catch (err) {
      console.error(
        "[KeyDrop] Failed:",
        err instanceof Error ? err.message : String(err)
      );
    }
  })();

  return _promise;
}

export const initKeydrop = init;

export default init;