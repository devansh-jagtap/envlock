# KeyDrop 🔐

> Turn your entire `.env` file into one secure deployable key.

KeyDrop lets you replace dozens of environment variables with a single secure key.

Instead of manually copying `.env` files between local machines, CI pipelines, staging servers, and production environments, you push your secrets once and deploy anywhere using only `KEYDROP_KEY`.

---

# Why KeyDrop?

Managing secrets across environments is painful:

* `.env` files get shared over Slack, Discord, or email
* CI/CD platforms require repetitive manual setup
* Team onboarding means sending sensitive credentials around
* Deployments break because one variable is missing
* Secret rotation becomes messy and inconsistent

KeyDrop simplifies this workflow into:

```bash
keydrop push
```

Your secrets are encrypted, stored securely, and replaced with a single deployable key.

---

# Before vs After

## Before

```env
MONGO_URI=mongodb://...
JWT_SECRET=abc123
STRIPE_SECRET_KEY=sk_test_xxx
REDIS_URL=redis://...
```

Every environment needs all variables configured manually.

---

## After

```env
KEYDROP_KEY=proj_x82js8sh
```

That single key securely loads all your environment variables at runtime.

---

# How It Works

## 1. Push Your `.env`

```bash
keydrop push
```

The CLI:

* Reads your `.env`
* Parses all environment variables
* Encrypts them using AES-256-GCM
* Uploads the encrypted payload to the KeyDrop API
* Returns a unique project key
* Replaces your local `.env` with:

```env
KEYDROP_KEY=proj_x82js8sh
```

---

## 2. Initialize KeyDrop in Your App

### For Next.js

1. Install the latest SDK:

```bash
npm install keydrop@latest
```

2. Create `instrumentation.ts` in your project root (same level as `package.json`):

```ts
export async function register() {
  const { init } = await import("keydrop");
  await init();
}
```

> Note: `instrumentation.ts` is supported in Next.js 13.2+. If you are on an older setup, you may need to enable the instrumentation hook in `next.config.js`.

### For Node.js

1. Install the latest SDK:

```bash
npm install keydrop@latest
```

2. In `index.js` or `server.js`, initialize KeyDrop in the first lines:

```js
import { init } from "keydrop";
await init();

// now start your server below
const app = express();
```

If your runtime does not support top-level `await`, use an async IIFE:

```js
import { init } from "keydrop";

(async () => {
  await init();
  const app = express();
  app.listen(3000);
})();
```

---

## 3. Runtime Secret Injection

When your app starts:

1. The SDK reads `KEYDROP_KEY`
2. Fetches encrypted secrets from the API
3. Decrypts them securely
4. Injects them into `process.env`

Your existing code works unchanged:

```js
process.env.MONGO_URI
process.env.JWT_SECRET
process.env.STRIPE_SECRET_KEY
```

---

# Quick Start

## Install

```bash
npm install keydrop@latest
npm install -g keydrop-cli
```

---

## Push Secrets

```bash
keydrop push
```

---

## Add Runtime Initialization

### Next.js

```bash
npm install keydrop@latest
```

Create `instrumentation.ts` in your project root:

```ts
export async function register() {
  const { init } = await import("keydrop");
  await init();
}
```

> Note: `instrumentation.ts` is supported in Next.js 13.2+. If you are on an older setup, you may need to enable the instrumentation hook in `next.config.js`.

### Node.js

```bash
npm install keydrop@latest
```

In `index.js` or `server.js`:

```js
import { init } from "keydrop";
await init();
```

If top-level `await` is not supported in your setup, wrap startup in an async IIFE instead.

---

## Deploy Anywhere

Only set this environment variable:

```env
KEYDROP_KEY=proj_x82js8sh
```

Your secrets will automatically load at runtime.

---

# Example Flow

```bash
# Local development
keydrop push

# .env becomes
KEYDROP_KEY=proj_x82js8sh
```

Deploy to:

* Vercel
* Railway
* Render
* Docker
* AWS
* VPS
* GitHub Actions

Only `KEYDROP_KEY` is required.

---

# Packages

| Package       | Description                                  |
| ------------- | -------------------------------------------- |
| `keydrop`     | Runtime SDK that fetches and injects secrets |
| `keydrop-cli` | CLI tool for pushing and managing secrets    |
| `api`         | Backend API for encryption and storage       |

---

# Architecture

```text
┌─────────────────┐
│   keydrop-cli   │
└────────┬────────┘
         │
         │ Reads .env
         │
         ▼
┌─────────────────┐
│ Encrypt Secrets │
│ AES-256-GCM     │
└────────┬────────┘
         │
         │ Upload encrypted payload
         ▼
┌─────────────────┐
│   KeyDrop API   │
│ Stores ciphertext│
└────────┬────────┘
         │
         │ Returns KEYDROP_KEY
         ▼
┌─────────────────┐
│ Runtime SDK     │
│ keydrop/init    │
└────────┬────────┘
         │
         │ Fetch + decrypt secrets
         ▼
┌─────────────────┐
│ process.env     │
└─────────────────┘
```

---

# Security

KeyDrop is designed so secrets are never exposed in plaintext after upload.

## Encryption

* AES-256-GCM authenticated encryption
* Encrypted before storage
* Ciphertext stored in the database

## Authentication

* `KEYDROP_KEY` acts as the project access token
* No secret values exposed in logs
* HTTPS-only communication in production

## Runtime

Secrets are injected directly into memory via `process.env`.

---

# Self Hosting

You can self-host the KeyDrop API.

## Clone the Repository

```bash
git clone https://github.com/devansh-jagtap/keydrop
cd keydrop/packages/api
npm install
```

---

## Configure Environment Variables

```env
DATABASE_URL=your_postgres_connection_string
ENCRYPTION_KEY=your_64_char_hex_key
```

---

## Start the API

```bash
npm start
```

---

## Point SDK & CLI to Your API

```env
KEYDROP_API_URL=https://your-api.com
```

---


# License

MIT
