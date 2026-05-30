import fs from "fs";
import path from "path";
import axios from "axios";
import readline from "readline";

const API_URL = process.env.KEYDROP_API_URL || "https://keydrop-production-d38c.up.railway.app";
const CONFIG_DIR = path.join(process.env.HOME || process.env.USERPROFILE, ".keydrop");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

export async function loginCommand() {
  console.log("KeyDrop Login\n");

  const email = await prompt("Email: ");
  const password = await prompt("Password: ");

  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token } = res.data;

    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }

    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ token, email }, null, 2));

    console.log("\n Logged in successfully!");
  } catch (err) {
    console.error("\n Login failed:", err.response?.data?.message || err.message);
    process.exit(1);
  }
}

export async function registerCommand() {
  console.log(" KeyDrop Register\n");

  const email = await prompt("Email: ");
  const password = await prompt("Password (min 6 chars): ");

  try {
    const res = await axios.post(`${API_URL}/auth/register`, { email, password });
    const { token } = res.data;

    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }

    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ token, email }, null, 2));

    console.log("\nAccount created and logged in!");
  } catch (err) {
    console.error("\nRegistration failed:", err.response?.data?.message || err.message);
    process.exit(1);
  }
}
