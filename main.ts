// Worst Fix Ever: Funniest Commit Message
//
// The entry is one commit-message line: a fix for slow logins that
// "solved" the problem by deleting the password check entirely.
// The repair worked perfectly — and opened the door to everyone.
//
// The program writes that single line to entry.txt in the output
// directory (MAKEFUN_OUTPUT_DIR when set, otherwise the working
// directory), exactly as the harness expects.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The commit message. One line, at most 100 characters, plain
// commit-subject voice: what was "fixed", and what it cost.
const COMMIT_MESSAGE =
  "fix: slow login by removing the password check; login is instant now, so is the breach";

const MAX_LENGTH = 100;

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return resolve(fromEnv);
  }
  return process.cwd();
}

function checkLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("commit message must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("commit message must be a single line");
  }
  if ([...line].length > MAX_LENGTH) {
    throw new Error(
      `commit message is ${[...line].length} characters, over the ${MAX_LENGTH} limit`,
    );
  }
}

function main(): void {
  checkLine(COMMIT_MESSAGE);

  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, COMMIT_MESSAGE + "\n", { encoding: "utf8" });
}

main();
