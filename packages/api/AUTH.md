# Authentication Implementation

## What Was Added

### 1. Auth Library (`packages/api/src/lib/auth.js`)
- `generateToken(userId)` - Creates JWT token (30 day expiry)
- `verifyToken(token)` - Validates JWT token
- `authMiddleware(req, res, next)` - Express middleware for protected routes

### 2. Auth Endpoints (`packages/api/src/routes/secrets.js`)

#### POST `/auth/register`
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "clxxx123",
  "email": "user@example.com"
}
```

**Validation:**
- Email required
- Password required (min 6 characters)
- Email must be unique

#### POST `/auth/login`
Login existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "clxxx123",
  "email": "user@example.com"
}
```

## Testing

1. Start the API:
```bash
cd packages/api
npm run dev
```

2. Run tests:
```bash
node packages/api/test-auth.js
```

## Environment Variables

Add to `packages/api/.env`:
```
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

## Next Steps (Future)

- [ ] Link projects to users (add userId to Project model)
- [ ] Protect `/upload` and `/secrets` routes with `authMiddleware`
- [ ] Add password reset functionality
- [ ] Add email verification
- [ ] Add refresh tokens
