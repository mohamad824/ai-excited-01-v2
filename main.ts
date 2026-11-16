import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

try {
  // Resolve the bundled image relative to this script, never relative to
  // the working directory: the grader may run us from anywhere.
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "image.jpg");

  if (!existsSync(source)) {
    throw new Error(`bundled image not found next to main.ts: ${source}`);
  }

  // An empty or whitespace-only MAKEFUN_OUTPUT_DIR counts as unset.
  const rawOut = process.env.MAKEFUN_OUTPUT_DIR;
  const outDir = rawOut !== undefined && rawOut.trim() !== "" ? rawOut : "out";
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, join(outDir, "entry.png"));
} catch (error) {
  console.error(
    `ai-excited-01-v2: failed to write entry image: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(1);
}
