"use strict";

const API_URL =
  process.env.KEYDROP_API_URL ||
  "https://keydrop-production-d38c.up.railway.app";

let _promise = null;

async function init() {
  if (_promise) return _promise;

  _promise = (async () => {
    if (typeof process === "undefined" || !process.env) return;

    const KEYDROP_KEY = process.env.KEYDROP_KEY;

    if (!KEYDROP_KEY) {
      console.warn("[KeyDrop] No KEYDROP_KEY found. Skipping.");
      return;
    }

    try {
      let data;
      if (typeof fetch !== "undefined") {
        const res = await fetch(`${API_URL}/secrets`, {
          headers: { Authorization: `Bearer ${KEYDROP_KEY}` },
        });
        data = await res.json();
      } else {
        const axios = require("axios");
        const res = await axios.get(`${API_URL}/secrets`, {
          headers: { Authorization: `Bearer ${KEYDROP_KEY}` },
        });
        data = res.data;
      }

      const secrets = data?.secrets;
      if (!secrets || typeof secrets !== "object" || Array.isArray(secrets)) {
        console.warn("[KeyDrop] No secrets returned. Skipping.");
        return;
      }

      Object.assign(process.env, secrets);
      console.log(`[KeyDrop] Injected ${Object.keys(secrets).length} secret(s)`);
    } catch (err) {
      console.error("[KeyDrop] Failed:", err instanceof Error ? err.message : String(err));
    }
  })();

  return _promise;
}

module.exports = init;
module.exports.init = init;
module.exports.default = init;