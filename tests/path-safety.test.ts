import { describe, expect, it } from 'vitest'
import { isSafeFileSegment } from '../utils/pathSafety'
import { formatDate } from '../utils/formatDate'

describe('isSafeFileSegment', () => {
  it('allows normal filenames', () => {
    expect(isSafeFileSegment('abc123.png')).toBe(true)
    expect(isSafeFileSegment('photo-1.jpg')).toBe(true)
  })

  it('rejects traversal and separators', () => {
    expect(isSafeFileSegment('../secret')).toBe(false)
    expect(isSafeFileSegment('a/b.png')).toBe(false)
    expect(isSafeFileSegment('a\\b.png')).toBe(false)
    expect(isSafeFileSegment('')).toBe(false)
  })
})

describe('formatDate', () => {
  it('formats ISO dates in local time', () => {
    expect(formatDate('2022-08-24T00:00:00.000Z')).toMatch(/2022年/)
  })
})
