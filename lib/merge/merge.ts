export function merge(source: object, additional: object) {
  return {
    ...source,
    ...additional
  }
}
