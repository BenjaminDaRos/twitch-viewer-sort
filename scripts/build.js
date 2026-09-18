import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(readFileSync(resolve(root, "manifest.json"), "utf8"));
const output = resolve(root, "dist", `twitch-viewer-sort-${manifest.version}.zip`);
mkdirSync(resolve(root, "dist"), { recursive: true });
rmSync(output, { force: true });
// zip is provided by macOS; no package dependency is needed.
const icons = [...new Set(Object.values(manifest.icons ?? {}))];
execFileSync("zip", [output, "manifest.json", "content.js", ...icons], {
  cwd: root,
  stdio: "inherit",
});
console.log(`Unsigned archive: ${output}`);
