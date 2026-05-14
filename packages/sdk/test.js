// Set your KEYDROP_KEY before importing the SDK
process.env.KEYDROP_KEY = "proj_40123a1e89fd8489"; // paste your actual key here
process.env.KEYDROP_API_URL = "http://localhost:3001";

// Side-effect import: automatically fetches and injects secrets into process.env
await import("./src/init.js");

// Verify injected secrets
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("OPENAI_KEY:", process.env.OPENAI_KEY);