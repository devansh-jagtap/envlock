# KeyDrop API

> Backend API for KeyDrop — encrypts and stores secrets securely.

## Stack

- Express.js
- PostgreSQL (Neon)
- Prisma ORM
- AES-256-GCM encryption

## Routes

| Method | Path       | Description                                 |
| ------ | ---------- | ------------------------------------------- |
| `POST` | `/upload`  | Receive secrets, encrypt, store, return key |
| `GET`  | `/secrets` | Fetch secrets using KEYDROP_KEY             |
| `GET`  | `/health`  | Health check                                |

## Setup

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_postgres_connection_string
ENCRYPTION_KEY=your_64_char_hex_key
PORT=3001
```

Generate encryption key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Start the server:

```bash
npm run dev
```

## Deployment

Deploy to Render or any Node.js host.

Set these environment variables on your platform:
DATABASE_URL=your_neon_connection_string
ENCRYPTION_KEY=your_64_char_hex_key

## Security

- All secrets encrypted with AES-256-GCM before storage
- Plain text secrets never touch the database
- KEYDROP_KEY verified on every `/secrets` request
- Auth tag verification prevents tampering

## Database Schema

```prisma
model Project {
  id            String @id @default(cuid())
  projectKey    String @unique
  encryptedData String
}
```

## License

MIT
