# Connect the frontend to Django

Set `BACKEND_URL` in `frontend/.env` to the Railway backend's public HTTPS origin, without `/api`:

```env
BACKEND_URL=https://your-backend.up.railway.app
```

For local Django use `http://127.0.0.1:8000` and restart `npm run dev` after editing the file.

For Vercel, set the Railway HTTPS URL, then run locally BEFORE committing/deploying:

```sh
npm run configure:backend
git add vercel.json package.json vite.config.js scripts .env.example .gitignore BACKEND-CONNECTION.md
git commit -m "Configure backend API proxy"
git push origin main
```

The command reads `.env.production` / `.env.production.local` overrides too, if present. It updates `vercel.json` with the real origin before Vercel reads deployment configuration. Merely setting an environment variable in Vercel does not update a static rewrite. `.env` is ignored; commit the generated rewrite. The backend domain is public, never put passwords or database URLs here.

Browser requests remain `/api/` on the frontend domain, preserving session cookies and CSRF. On the Railway backend set `DJANGO_CSRF_TRUSTED_ORIGINS` to your frontend HTTPS origin. For local development against Railway add `http://localhost:5173` explicitly only if needed; local Django already trusts that development origin. Production login should be tested on the HTTPS frontend because production cookies are Secure.

After deployment, open `/api/session/` on your frontend URL. It must return JSON. If it returns the website HTML, check rewrite ordering. The `/api` rewrite must precede the SPA fallback.
