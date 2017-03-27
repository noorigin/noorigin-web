export const mapKeys = fn => obj =>
  Object.entries(obj).reduce((result, [key, val]) => {
    result[fn(key)] = val
    return result
  }, {})
