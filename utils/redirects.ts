const pastWorkRedirects: Record<string, string> = {
  '62f716cf7edacc07e46e6a1c': 'cl7m3qi1a03173vku3pqzuwfo',
  '6306ce68dbcc8f2f9ab813c3': 'cl7m3qi1a03193vku8ypu3ebx'
}

export function redirectPastWorkId(id: string) {
  return pastWorkRedirects[id] || ''
}
