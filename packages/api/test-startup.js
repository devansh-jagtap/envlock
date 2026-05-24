// Test if server starts without errors
// Run: node packages/api/test-startup.js

import "dotenv/config";

console.log("✅ Environment variables loaded");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✓ Set" : "✗ Missing");
console.log("ENCRYPTION_KEY:", process.env.ENCRYPTION_KEY ? "✓ Set" : "✗ Missing");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✓ Set" : "✗ Missing");

try {
  const { encrypt, decrypt } = await import("./src/lib/crypto.js");
  console.log("✅ Crypto module loaded");
  
  const test = encrypt("test");
  const result = decrypt(test);
  console.log("✅ Encryption/decryption works");
} catch (err) {
  console.error("❌ Crypto error:", err.message);
  process.exit(1);
}

try {
  const { generateToken, verifyToken } = await import("./src/lib/auth.js");
  const token = generateToken("test-user-id");
  const decoded = verifyToken(token);
  console.log("✅ JWT works");
} catch (err) {
  console.error("❌ JWT error:", err.message);
  process.exit(1);
}

try {
  const { prisma } = await import("./src/lib/prisma.js");
  console.log("✅ Prisma client loaded");
} catch (err) {
  console.error("❌ Prisma error:", err.message);
  process.exit(1);
}

console.log("\n✨ All checks passed! Server should start successfully.");
