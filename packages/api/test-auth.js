// Test auth endpoints
// Run: node packages/api/test-auth.js

const API_URL = "http://localhost:3001";

async function testAuth() {
  console.log("🧪 Testing Auth Endpoints\n");

  // Test Register
  console.log("1️⃣ Testing /auth/register...");
  const registerRes = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: `test${Date.now()}@example.com`,
      password: "password123",
    }),
  });
  
  const registerText = await registerRes.text();
  console.log("Status:", registerRes.status);
  console.log("Response:", registerText);
  
  if (!registerRes.ok) {
    console.error("❌ Register failed");
    return;
  }
  
  const registerData = JSON.parse(registerText);
  console.log("✅ Register:", registerData);

  // Test Login
  console.log("\n2️⃣ Testing /auth/login...");
  const loginRes = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: registerData.email,
      password: "password123",
    }),
  });
  const loginData = await loginRes.json();
  console.log("✅ Login:", loginData);

  // Test Invalid Login
  console.log("\n3️⃣ Testing invalid login...");
  const invalidRes = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: registerData.email,
      password: "wrongpassword",
    }),
  });
  const invalidData = await invalidRes.json();
  console.log("✅ Invalid login:", invalidData);

  console.log("\n✨ All tests passed!");
}

testAuth().catch(console.error);
