/**
 * Ensure a string ends with a trailing slash
 */
export function addTrailingSlash(str: string) {
  if (!str.endsWith("/")) str += "/";
  return str;
}
