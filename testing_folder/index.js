process.env.ENVLOCK_KEY = "proj_527f8664d5737657";
process.env.ENVLOCK_API_URL = "http://localhost:3001";

await import("envlock/init");

console.log("MONGODB_URI:", process.env.MONGODB_URI);       // ← correct name
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY); // ← correct name