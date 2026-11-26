/**
 * Funniest Cat Voicemail Greeting — make.fun bounty entry.
 *
 * Writes exactly one voicemail greeting line (max 120 characters), as
 * recorded by a cat called Miso who is busy knocking the caller's glass
 * off the table, to /output/entry.txt.
 *
 * Node 22, standard library only. Deterministic, no network, no input:
 * the entry text is a constant below, guarded by a 1–120 character
 * length gate and verified by reading the file back after writing.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You've reached Miso. I'm busy knocking your glass off the table. Leave a message after the meow — or leave tuna.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

const MAX_CHARS = 120;

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(
    `entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// One line only: the bounty asks for a single voicemail greeting line.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line with no line breaks");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");

const back = readFileSync(OUTPUT_FILE, "utf8");
if (back !== ENTRY) {
  throw new Error(
    `read-back check failed: expected ${JSON.stringify(ENTRY)}, got ${JSON.stringify(back)}`,
  );
}

console.log(`Wrote ${ENTRY.length} characters to ${OUTPUT_FILE}`);
