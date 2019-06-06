const baseConfig = {
  server: 'http://admin.meilala_mall.127-0-0-1.w.nip.ink',
  tokenStoreKey: 'token'
}


export default {
  ...baseConfig,
  cableUrl: `${baseConfig.server}/cable`,
  apiUrl: `${baseConfig.server}/api/v1`,
  token: localStorage.getItem(baseConfig.tokenStoreKey),
}
