import { v4 as uuidv4 } from "uuid";

/**
 * Return a single random letter between a-z
 */
const randomLetter = (): string =>
  String.fromCharCode(97 + Math.floor(Math.random() * 26));

/**
 * Generate a random valid html element id
 */
export function generateRandomElementId(): string {
  return randomLetter() + uuidv4();
}
