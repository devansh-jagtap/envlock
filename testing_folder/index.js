// Side-effect import: automatically fetches and injects secrets into process.env
import "keydrop/init";

// Verify injected secrets (values masked to avoid leaking sensitive data)
const mask = (v) => (v ? "[set]" : "[not set]");
console.log("MONGODB_URI:", mask(process.env.MONGODB_URI));
console.log("JWT_SECRET:", mask(process.env.JWT_SECRET));
console.log("OPENAI_API_KEY:", mask(process.env.OPENAI_API_KEY));
