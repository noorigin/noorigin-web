export const buildUrlQuery = params =>
  Object.keys(params).map(key =>
    `${key}=${encodeURIComponent(params[key])}`).join('&')
