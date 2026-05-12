import { Pool, neonConfig } from "@neondatabase/serverless";

// Use WebSocket transport so the driver works in local Node.js (HTTP transport
// requires Neon's fetch-based API endpoint which is not resolvable outside Vercel).
// eslint-disable-next-line @typescript-eslint/no-require-imports
neonConfig.webSocketConstructor = require("ws");

let _pool: Pool | null = null;

export function getPool(): Pool {
  if (!_pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return _pool;
}
