import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { isSafeFileSegment } from '../../utils/pathSafety'

export type UploadedPart = {
  name?: string
  filename?: string
  data: Buffer
  type?: string
}

const IMAGE_EXT = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp'])
const ZIP_EXT = new Set(['zip'])
const IMAGE_MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp'
}

export function getDataDir() {
  const configured = useRuntimeConfig().dataDir
  if (configured) return String(configured)
  return path.resolve(process.cwd(), 'server/data')
}

export function extOf(name: string) {
  const ext = name.split('.').pop() || ''
  return ext.toLowerCase()
}

export function mimeFor(filename: string) {
  return IMAGE_MIME[extOf(filename)] || 'application/octet-stream'
}

export function resolveUserFile(user: string, filename: string) {
  if (!isSafeFileSegment(user) || !isSafeFileSegment(filename)) {
    throw createError({ statusCode: 400, statusMessage: '不正なパスです' })
  }
  const root = path.resolve(getDataDir(), user)
  const full = path.resolve(root, filename)
  if (full !== root && !full.startsWith(root + path.sep)) {
    throw createError({ statusCode: 400, statusMessage: '不正なパスです' })
  }
  return full
}

export function publicAssetUrl(kind: 'images' | 'games', user: string, filename: string) {
  return `/api/${kind}/${user}/${filename}`
}

export async function saveUpload(
  file: UploadedPart,
  username: string,
  kind: 'image' | 'zip'
) {
  const original = file.filename || 'upload.bin'
  const ext = extOf(original)
  if (kind === 'image') {
    if (!IMAGE_EXT.has(ext)) {
      throw createError({ statusCode: 400, statusMessage: '画像は jpg/png/gif/webp のみです' })
    }
    if (file.data.length > 500 * 1024) {
      throw createError({ statusCode: 400, statusMessage: '画像は 500KB 以下にしてください' })
    }
  } else {
    if (!ZIP_EXT.has(ext)) {
      throw createError({ statusCode: 400, statusMessage: 'zip ファイルを指定してください' })
    }
    if (file.data.length > 100 * 1024 * 1024) {
      throw createError({ statusCode: 400, statusMessage: 'zip は 100MB 以下にしてください' })
    }
  }

  const stored = `${randomUUID()}.${ext}`
  await mkdir(path.join(getDataDir(), username), { recursive: true })
  const dest = resolveUserFile(username, stored)
  await writeFile(dest, file.data)
  return {
    stored,
    url: publicAssetUrl(kind === 'image' ? 'images' : 'games', username, stored)
  }
}

export async function deletePublicFile(url: string | null | undefined) {
  if (!url) return
  const parts = url.replace(/\\/g, '/').split('/').filter(Boolean)
  if (parts.length < 4) return
  const user = parts[2]
  const filename = parts.slice(3).join('/')
  if (!isSafeFileSegment(user) || !isSafeFileSegment(filename)) return
  const full = path.resolve(getDataDir(), user, filename)
  if (!existsSync(full)) return
  await unlink(full)
}

export function openUserFile(user: string, filename: string) {
  const full = resolveUserFile(user, filename)
  if (!existsSync(full)) {
    throw createError({ statusCode: 404, statusMessage: 'ファイルが見つかりません' })
  }
  return { full, stream: createReadStream(full) }
}

export function pickParts(parts: UploadedPart[] | undefined, field: string) {
  return (parts || []).filter(part => part.name === field && part.filename)
}

export function textFields(parts: UploadedPart[] | undefined) {
  const fields: Record<string, string> = {}
  for (const part of parts || []) {
    if (!part.filename && part.name) {
      fields[part.name] = part.data.toString('utf8')
    }
  }
  return fields
}
