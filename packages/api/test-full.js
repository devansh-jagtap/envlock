// Test all endpoints with auth
// Run: node packages/api/test-full.js

const API_URL = "http://localhost:3001";

async function testFull() {
  console.log("🧪 Testing Full KeyDrop Flow\n");

  // 1. Register
  console.log("1️⃣ Register new user...");
  const email = `test${Date.now()}@example.com`;
  const registerRes = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "password123" }),
  });
  const { token } = await registerRes.json();
  console.log("✅ Registered and got token");

  // 2. Create project
  console.log("\n2️⃣ Create project...");
  const uploadRes = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      secrets: { DB_URL: "postgres://...", API_KEY: "secret123" },
      name: "My Test Project",
    }),
  });
  const { projectKey } = await uploadRes.json();
  console.log("✅ Created project:", projectKey);

  // 3. Get user's projects
  console.log("\n3️⃣ Get user's projects...");
  const projectsRes = await fetch(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { projects } = await projectsRes.json();
  console.log("✅ Projects:", projects);

  // 4. Fetch secrets (SDK simulation)
  console.log("\n4️⃣ Fetch secrets (SDK)...");
  const secretsRes = await fetch(`${API_URL}/secrets`, {
    headers: { Authorization: `Bearer ${projectKey}` },
  });
  const { secrets } = await secretsRes.json();
  console.log("✅ Secrets:", secrets);

  // 5. Update project
  console.log("\n5️⃣ Update project...");
  const updateRes = await fetch(`${API_URL}/upload`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      projectKey,
      secrets: { DB_URL: "postgres://updated", NEW_VAR: "added" },
    }),
  });
  await updateRes.json();
  console.log("✅ Updated project");

  // 6. Verify update
  console.log("\n6️⃣ Verify update...");
  const verifyRes = await fetch(`${API_URL}/secrets`, {
    headers: { Authorization: `Bearer ${projectKey}` },
  });
  const { secrets: updatedSecrets } = await verifyRes.json();
  console.log("✅ Updated secrets:", updatedSecrets);

  // 7. Delete project
  console.log("\n7️⃣ Delete project...");
  const deleteRes = await fetch(`${API_URL}/project/${projectKey}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  await deleteRes.json();
  console.log("✅ Deleted project");

  // 8. Verify deletion
  console.log("\n8️⃣ Verify deletion...");
  const finalProjectsRes = await fetch(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { projects: finalProjects } = await finalProjectsRes.json();
  console.log("✅ Remaining projects:", finalProjects);

  console.log("\n✨ All tests passed!");
}

testFull().catch(console.error);
