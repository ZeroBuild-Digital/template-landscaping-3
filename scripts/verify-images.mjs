#!/usr/bin/env node
/**
 * Build-time image-URL verification.
 *
 * Scans every .tsx/.ts file for Unsplash URLs, HEAD-checks each, and exits
 * non-zero if any are broken — wired into `prebuild` so `npm run build`
 * fails fast on broken images.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SEARCH_DIRS = ["components", "app", "lib", "hooks"];
const FILE_EXTS = [".ts", ".tsx", ".js", ".jsx", ".mjs"];
const URL_REGEX = /https:\/\/images\.unsplash\.com\/[^\s"'`)\\]+/g;
const REQUEST_TIMEOUT_MS = 10_000;
const CONCURRENCY = 8;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (FILE_EXTS.some((ext) => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

async function collectUrls() {
  const seen = new Map();
  for (const dir of SEARCH_DIRS) {
    const dirPath = join(ROOT, dir);
    let files;
    try {
      files = await walk(dirPath);
    } catch (err) {
      if (err.code === "ENOENT") continue;
      throw err;
    }
    for (const file of files) {
      const text = await readFile(file, "utf8");
      const lines = text.split("\n");
      lines.forEach((line, idx) => {
        const matches = line.match(URL_REGEX);
        if (!matches) return;
        for (const url of matches) {
          const clean = url.replace(/[)>\];,.]+$/, "");
          if (!seen.has(clean)) seen.set(clean, []);
          seen.get(clean).push({ file: relative(ROOT, file), line: idx + 1 });
        }
      });
    }
  }
  return seen;
}

async function drain(res) {
  try {
    if (res.body && typeof res.body.cancel === "function") {
      await res.body.cancel();
    } else {
      await res.arrayBuffer();
    }
  } catch {
    /* ignore drain errors */
  }
}

async function checkOne(url, attempt = 1) {
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve({ __timeout: true }), REQUEST_TIMEOUT_MS),
  );
  try {
    let res = await Promise.race([fetch(url, { method: "HEAD" }), timeoutPromise]);
    if (res?.__timeout) {
      if (attempt < 2) return checkOne(url, attempt + 1);
      return { ok: false, status: 0, error: "timeout" };
    }
    if (res.status === 405 || res.status === 501) {
      await drain(res);
      res = await Promise.race([fetch(url, { method: "GET" }), timeoutPromise]);
      if (res?.__timeout) {
        if (attempt < 2) return checkOne(url, attempt + 1);
        return { ok: false, status: 0, error: "timeout" };
      }
    }
    const status = res.status;
    await drain(res);
    return { ok: status >= 200 && status < 400, status };
  } catch (err) {
    return { ok: false, status: 0, error: err.message };
  }
}

async function runWithConcurrency(items, worker, limit) {
  const results = new Array(items.length);
  let cursor = 0;
  async function next() {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await worker(items[i], i);
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, next);
  await Promise.all(workers);
  return results;
}

function pad(s, n) {
  s = String(s);
  return s.length >= n ? s : s + " ".repeat(n - s.length);
}

async function main() {
  console.log("verify-images - scanning for Unsplash URLs...\n");
  const map = await collectUrls();
  const urls = [...map.keys()];

  if (urls.length === 0) {
    console.log("  (no Unsplash URLs found - nothing to verify)");
    return 0;
  }

  console.log(`  found ${urls.length} unique URL${urls.length === 1 ? "" : "s"} - checking...\n`);

  const results = await runWithConcurrency(
    urls,
    async (url) => ({ url, ...(await checkOne(url)) }),
    CONCURRENCY,
  );

  const broken = results.filter((r) => !r.ok);

  for (const r of results) {
    const status = r.error
      ? `ERR (${r.error})`
      : r.status === 0
        ? "TIMEOUT"
        : `HTTP ${r.status}`;
    const icon = r.ok ? "  OK" : "FAIL";
    console.log(`  ${icon}  ${pad(status, 14)} ${r.url}`);
    if (!r.ok) {
      for (const loc of map.get(r.url) ?? []) {
        console.log(`        -> ${loc.file}:${loc.line}`);
      }
    }
  }

  console.log("");
  if (broken.length > 0) {
    console.error(
      `FAIL: ${broken.length} of ${results.length} URL${broken.length === 1 ? " is" : "s are"} broken.`,
    );
    console.error(
      "   This build is BLOCKED. Replace each broken URL with a curl-verified Unsplash photo ID before building.",
    );
    console.error(
      "   To re-run the check after fixing: npm run verify:images",
    );
    return 1;
  }

  console.log(`OK: All ${results.length} Unsplash URL${results.length === 1 ? "" : "s"} OK.`);
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error("verify-images crashed:", err);
    process.exit(2);
  });
