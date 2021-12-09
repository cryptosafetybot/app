export function hasValidExtensionContext() {
  return !!chrome?.runtime?.id;
}
