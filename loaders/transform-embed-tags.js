const { get, trim } = require('lodash/fp')

const embedRegex = /\[embed (.*?)\]/

const cleanHtml = str =>
  trim(trim(str).replace(/^<\/p[^>]*>/, '').replace(/<p[^>]*>$/, ''))

const transformResult = result => {
  const embedCodes = result.body.match(new RegExp(embedRegex, 'g')) || []
  const embeds = get('head.embed', result)

  if (!embedCodes.length || !embeds) {
    const bodyComponents = [{
      type: 'HTMLContent',
      props: { content: result.body },
    }]

    return {
      bodyComponents,
      head: {
        ...result.head || {},
        bodyComponents,
        description,
      },
    }
  }

  // Strip embed codes from description
  const description = embedCodes.reduce((out, code) =>
    out.replace(code, ''), get('head.description', result) || '')

  const bodyComponents = result.body.split(embedRegex)
    .map(cleanHtml)
    .map(str => embeds[str]
      ? embeds[str]
      : { type: 'HTMLContent', props: { content: str } })

  return {
    bodyComponents,
    head: {
      ...result.head || {},
      bodyComponents,
      description,
    },
  }
}

module.exports = function (subject) {
  const { result } = subject
  const transformed = transformResult(result)
  return Object.assign({}, result, transformed)
}
