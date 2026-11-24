// One Line of Earned Pride — u-mang-one-line-of-earned-pride-a0138557
// Writes a single quiet, earned moment of pride to /output/entry.txt.
// Deterministic, stdlib only, no network, no input.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "The carpenter pressed the joint he had cut wrong a hundred times, and this time it slid shut without a sound.";

const OUT = join(process.cwd(), "output", "entry.txt");

// The grader runs the program from the repo root, but be tolerant of
// being run from elsewhere: prefer /output when it exists, else ./output.
const here = dirname(fileURLToPath(import.meta.url));
const candidates = ["/output/entry.txt", join(here, "output", "entry.txt")];

function main(): void {
  if (LINE.length < 1 || LINE.length > 240) {
    throw new Error(`entry must be 1-240 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  for (const target of candidates) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, LINE + "\n", "utf8");
      return;
    } catch {
      // fall through to the next candidate
    }
  }
  // Last resort: repo-relative output.
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE + "\n", "utf8");
}

main();
