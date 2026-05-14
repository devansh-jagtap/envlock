// Set your KEYDROP_KEY before importing the SDK
process.env.KEYDROP_KEY = "proj_527f8664d5737657"; // paste your actual key here
process.env.KEYDROP_API_URL = "http://localhost:3001";

// Side-effect import: automatically fetches and injects secrets into process.env
await import("keydrop/init");

// Verify injected secrets (values masked to avoid leaking sensitive data)
const mask = (v) => (v ? "[set]" : "[not set]");
console.log("MONGODB_URI:", mask(process.env.MONGODB_URI));
console.log("JWT_SECRET:", mask(process.env.JWT_SECRET));
console.log("OPENAI_API_KEY:", mask(process.env.OPENAI_API_KEY));