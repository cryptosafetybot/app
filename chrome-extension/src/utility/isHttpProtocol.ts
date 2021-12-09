/**
 * Returns true when url begins with "http://"" or "https://"
 */
export function isHttpProtocol(urlString: string): boolean {
  const url = new URL(urlString);
  return url.protocol === "http:" || url.protocol === "https:";
}
