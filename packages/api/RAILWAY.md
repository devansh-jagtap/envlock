# Railway Deployment Guide

## 🚂 Deploy to Railway

### 1. Set Environment Variables in Railway Dashboard

Go to your Railway project → Variables tab and add:

```
DATABASE_URL=postgresql://neondb_owner:npg_mdPOfi71TSKy@ep-holy-sunset-apdspolm-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require

ENCRYPTION_KEY=fd1e85299978d5f21f0628f6acb38dad592f43d59737a5e488a6a8f722bc5531

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-long-and-random

PORT=3001
```

**IMPORTANT:** Generate a new JWT_SECRET for production:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. Set Root Directory

In Railway Settings → Build:
- **Root Directory:** `packages/api`

### 3. Deploy

Push to GitHub and Railway will auto-deploy.

### 4. Verify Deployment

Check the logs for:
```
KeyDrop API running on 0.0.0.0:3001
```

Test the health endpoint:
```bash
curl https://your-app.railway.app/health
```

Should return:
```json
{"status":"ok"}
```

---

## 🐛 Troubleshooting

### Healthcheck Fails

**Symptom:** "service unavailable" errors

**Causes:**
1. Environment variables not set
2. Database connection fails
3. Server not binding to 0.0.0.0

**Fix:**
- Check Railway logs for errors
- Verify all env vars are set
- Ensure DATABASE_URL is correct

### Prisma Errors

**Symptom:** "Prisma Client not generated"

**Fix:**
Railway runs `npm ci` which triggers `postinstall` script that runs `prisma generate`. This should work automatically.

If it doesn't, add to Railway Settings → Build Command:
```
npm ci && npx prisma generate
```

### Port Issues

**Symptom:** Server starts but healthcheck fails

**Fix:**
Railway automatically sets `PORT` env var. The app listens on `0.0.0.0:$PORT` which is correct.

---

## 📝 Deployment Checklist

- [ ] Set DATABASE_URL in Railway
- [ ] Set ENCRYPTION_KEY in Railway (64 hex chars)
- [ ] Set JWT_SECRET in Railway (generate new one)
- [ ] Set Root Directory to `packages/api`
- [ ] Push to GitHub
- [ ] Check logs for startup message
- [ ] Test /health endpoint
- [ ] Test /auth/register endpoint

---

## 🔗 Update CLI & SDK

After deployment, update the API URL:

### CLI
Users should set:
```bash
export KEYDROP_API_URL=https://your-app.railway.app
```

Or hardcode in `packages/cli/src/commands/push.js`:
```js
const API_URL = "https://your-app.railway.app";
```

### SDK
Update in `packages/sdk/src/init.js`:
```js
const API_URL = "https://your-app.railway.app";
```

---

## 🎯 Post-Deployment

1. Test registration:
```bash
curl -X POST https://your-app.railway.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

2. Test login:
```bash
curl -X POST https://your-app.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

3. Update website env:
```env
NEXT_PUBLIC_API_URL=https://your-app.railway.app
```
