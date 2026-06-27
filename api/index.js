import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Vercel Serverless Functions have a read-only file system.
// We must copy the database to /tmp to allow write operations (POST, PUT, DELETE).
// NOTE: /tmp is ephemeral. Data will be reset when the function spins down.
const dbPath = path.join('/tmp', 'db.json');
const sourceDbPath = path.join(process.cwd(), 'db.json');

if (!fs.existsSync(dbPath)) {
  fs.copyFileSync(sourceDbPath, dbPath);
}

const router = jsonServer.router(dbPath);

server.use(middlewares);

server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);

export default server;
