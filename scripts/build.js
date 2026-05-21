import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const publicDir = resolve(root, "public");
const distDir = resolve(root, "dist");

if (!existsSync(publicDir)) {
  console.error("Build failed: public/ directory was not found.");
  process.exit(1);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
cpSync(publicDir, distDir, { recursive: true });

console.log("Built DTB static assets into dist/ for Cloudflare Workers.");
