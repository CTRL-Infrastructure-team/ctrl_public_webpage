/** HTTPS のときだけ Secure cookie にする判定。HTTP の staging（IP直アクセス）でもログインできるようにする。 */
export function isHttpsRequest(forwardedProto: string | undefined, socketEncrypted: boolean) {
  if (forwardedProto) {
    return forwardedProto.split(',')[0]?.trim() === 'https'
  }
  return socketEncrypted
}
