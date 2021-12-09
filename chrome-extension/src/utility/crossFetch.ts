export async function crossFetch(url: string) {
  if (typeof global.fetch !== "function") {
    throw new TypeError(`global.fetch not defined`);
  }

  return await global.fetch(url);
}
