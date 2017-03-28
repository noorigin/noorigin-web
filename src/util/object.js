export const mapKeys = fn => obj =>
  Object.keys(obj).reduce((result, key) => {
    result[fn(key)] = obj[key]
    return result
  }, {})
