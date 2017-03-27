export const words = str => str.split(/[-,_,\s,\t]/g).map(s => s.trim())

export const upperFirst = str =>
  `${str.slice(0, 1).toUpperCase()}${str.slice(1, str.length).toLowerCase()}`

export const camelCase = str => {
  const [first, ...rest] = words(str)
  return `${first.toLowerCase()}${rest.map(upperFirst).join('')}`
}
