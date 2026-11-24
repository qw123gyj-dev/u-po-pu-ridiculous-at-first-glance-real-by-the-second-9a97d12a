import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The pitch: one sentence that names the odd thing being sold, who pays
// for it, and why the business holds together.
const SENTENCE =
  "We rent goats in tiny reflective vests as self-propelled lawnmowers to suburban HOAs, who pay monthly because the goats mow, fertilize, and entertain kids cheaper than any landscaping crew.";

function validateSentence(sentence: string): void {
  if (typeof sentence !== "string") {
    throw new Error("Sentence must be a string.");
  }
  if (sentence.length === 0) {
    throw new Error("Sentence must not be empty.");
  }
  if (sentence.trim().length === 0) {
    throw new Error("Sentence must not be only whitespace.");
  }
  if (sentence !== sentence.trim()) {
    throw new Error("Sentence must not have leading or trailing whitespace.");
  }
  if (sentence.includes("\n") || sentence.includes("\r")) {
    throw new Error("Sentence must be a single line.");
  }
  if ([...sentence].length > 200) {
    throw new Error("Sentence must be at most 200 characters.");
  }
  const terminators = sentence.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1) {
    throw new Error(
      `Sentence must contain exactly one sentence terminator, found ${terminators.length}.`,
    );
  }
  if (!sentence.endsWith(".")) {
    throw new Error("Sentence must end in a single period.");
  }
}

function main(): void {
  validateSentence(SENTENCE);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, SENTENCE, "utf8");

  const written = readFileSync(outputPath, "utf8");
  if (written !== SENTENCE) {
    throw new Error("Verification failed: file content does not match the sentence exactly.");
  }

  console.log(SENTENCE);
  console.log(`Character count: ${[...SENTENCE].length}`);
}

main();
