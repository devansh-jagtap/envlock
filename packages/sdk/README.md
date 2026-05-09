# keydrop

> Runtime SDK for KeyDrop — fetches and injects your secrets automatically.

## Install

```bash
npm install keydrop
```

## Usage

Add one line at the very top of your app entry point:

```js
await import("keydrop/init");
```

That's it. All your secrets are now available via `process.env` as normal.

## Requirements

Your environment must have `KEYDROP_KEY` set. Get one by running:

```bash
npx keydrop-cli push
```

## How It Works

1. Reads `KEYDROP_KEY` from `process.env`
2. Calls the KeyDrop API with the key as auth
3. Receives your decrypted secrets
4. Injects each secret into `process.env`
5. Your app code works without any changes

## Example

```js
// index.js
await import("keydrop/init");

// works exactly as before — no changes needed
const db = mongoose.connect(process.env.MONGO_URI);
const token = jwt.sign(payload, process.env.JWT_SECRET);
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `KEYDROP_KEY` | ✅ | Your project key from `keydrop push` |
| `KEYDROP_API_URL` | ❌ | Custom API URL for self hosting |

## Vercel / Railway / Render

Just add `KEYDROP_KEY` to your platform's environment variables dashboard. No `.env` file needed — the platform injects it directly.

## License

MIT
