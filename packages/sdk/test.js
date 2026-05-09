// simulate having only ENVLOCK_KEY set
process.env.ENVLOCK_KEY="proj_40123a1e89fd8489";
 // paste your actual key here
process.env.ENVLOCK_API_URL = "http://localhost:3001";

// import the SDK
await import("./src/init.js");

// check if secrets were injected
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("OPENAI_KEY:", process.env.OPENAI_KEY);