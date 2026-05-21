import { cpSync, existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";

const root = resolve(process.cwd());
const publicDir = resolve(root, "public");
const distDir = resolve(root, "dist");
const maxWorkerAssetSize = 25 * 1024 * 1024;
const skippedFiles = [];

if (!existsSync(publicDir)) {
  console.error("Build failed: public/ directory was not found.");
  process.exit(1);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

cpSync(publicDir, distDir, {
  recursive: true,
  filter: (source) => {
    const stats = statSync(source);

    if (stats.isFile() && stats.size > maxWorkerAssetSize) {
      skippedFiles.push(relative(publicDir, source));
      return false;
    }

    return true;
  },
});

console.log("Built DTB static assets into dist/ for Cloudflare Workers.");

if (skippedFiles.length) {
  console.warn("Skipped files larger than Cloudflare Workers' 25 MiB asset limit:");
  for (const file of skippedFiles) {
    console.warn(`- ${file}`);
  }
}
