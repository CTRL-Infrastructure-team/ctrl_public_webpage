export function isSafeFileSegment(value: string) {
  return Boolean(value)
    && !value.includes('..')
    && !value.includes('\0')
    && !/[/\\]/.test(value)
}
