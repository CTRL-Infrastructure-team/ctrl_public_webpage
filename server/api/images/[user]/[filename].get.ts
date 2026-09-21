import { sendStream } from 'h3'

export default defineEventHandler(async (event) => {
  const user = getRouterParam(event, 'user') || ''
  const filename = getRouterParam(event, 'filename') || ''
  const { stream } = openUserFile(user, filename)
  setHeader(event, 'Content-Type', mimeFor(filename))
  return sendStream(event, stream)
})
