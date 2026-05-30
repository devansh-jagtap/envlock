import { init } from "keydrop";

await init();

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("STRIPE_KEY:", process.env.STRIPE_KEY);