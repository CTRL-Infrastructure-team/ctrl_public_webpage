import { describe, expect, it } from 'vitest'
import { isSafeFileSegment } from '../utils/pathSafety'
import { formatDate } from '../utils/formatDate'
import { isHttpsRequest } from '../utils/https'

describe('isHttpsRequest', () => {
  it('trusts X-Forwarded-Proto over the socket flag', () => {
    expect(isHttpsRequest('https', false)).toBe(true)
    expect(isHttpsRequest('http', true)).toBe(false)
    expect(isHttpsRequest('https,http', false)).toBe(true)
  })

  it('falls back to the TLS socket when no forwarded proto is set', () => {
    expect(isHttpsRequest(undefined, true)).toBe(true)
    expect(isHttpsRequest(undefined, false)).toBe(false)
  })
})

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
