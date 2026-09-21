import { sendStream } from 'h3'

export default defineEventHandler(async (event) => {
  const user = getRouterParam(event, 'user') || ''
  const filename = getRouterParam(event, 'filename') || ''
  const { stream } = openUserFile(user, filename)
  setHeader(event, 'Content-Type', 'application/zip')
  setHeader(event, 'Content-Disposition', `attachment; filename="${filename}"`)
  return sendStream(event, stream)
})
