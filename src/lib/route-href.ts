export function resolveHref(path: string, params: Record<string, string> = {}) {
  return path.replace(/\$(\w+)/g, (_, key: string) => {
    const value = params[key];
    if (value === undefined) throw new Error(`Missing URL parameter: ${key}`);
    return encodeURIComponent(value);
  });
}
