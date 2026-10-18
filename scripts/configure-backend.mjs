import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
const { BACKEND_URL } = loadEnv('production', root, '');
let url;
try { url = new URL(BACKEND_URL); } catch { throw new Error('Set BACKEND_URL in frontend/.env to your Railway HTTPS origin.'); }
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/' || ['localhost', '127.0.0.1'].includes(url.hostname)) {
  throw new Error('Production BACKEND_URL must be an HTTPS origin, without credentials, query or /api path.');
}
const file = new URL('../vercel.json', import.meta.url);
const config = JSON.parse(await readFile(file, 'utf8'));
config.rewrites = [
  { source: '/api/:path*', destination: `${url.origin}/api/:path*` },
  ...(config.rewrites || []).filter(rule => !rule.source.startsWith('/api')),
];
await writeFile(file, JSON.stringify(config, null, 2) + '\n');
console.log('Configured Vercel /api proxy for ' + url.origin + '. Commit vercel.json and redeploy the frontend.');
