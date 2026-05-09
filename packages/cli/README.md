# keydrop-cli

> CLI tool for KeyDrop — turn your `.env` into one deployable key.

## Install

```bash
npm install -g keydrop-cli
```

Or use without installing:

```bash
npx keydrop-cli push
```

## Usage

Run inside any project folder that has a `.env` file:

```bash
keydrop push
```

### Before

```env
MONGO_URI=mongodb://localhost
JWT_SECRET=abc123
STRIPE_KEY=sk_test_xxx
OPENAI_KEY=sk-xxxx
```

### After

```env
KEYDROP_KEY=proj_x82js8sh
```

## What It Does

1. Reads your `.env` file
2. Parses all secrets into JSON
3. Sends them securely to the KeyDrop API
4. Receives a unique project key
5. Rewrites your `.env` with only `KEYDROP_KEY`

## Commands

| Command | Description |
|---------|-------------|
| `keydrop push` | Upload `.env` and get a `KEYDROP_KEY` |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `KEYDROP_API_URL` | Override the API URL for self hosting |

## After Pushing

Add one line to your app:

```js
await import("keydrop/init");
```

Then deploy with only `KEYDROP_KEY` in your environment.

## License

MIT
