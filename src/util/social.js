import { joinUri } from 'phenomic'
import { buildUrlQuery } from './url'
import metaData from '../metadata'

const fullUri = uri => joinUri(metaData.pkg.homepage, uri)

export const buildFacebookShareUrl = ({ title, url }) =>
  `https://www.facebook.com/sharer.php?${buildUrlQuery({
    t: title,
    u: fullUri(url),
  })}`

export const buildTwitterShareUrl = ({ title, url }) =>
  `https://twitter.com/intent/tweet?${buildUrlQuery({
    text: title,
    url: fullUri(url),
    via: 'no origin',
  })}`

export const buildTumblrShareUrl = () => '#'

export const buildRedditShareUrl = ({ title, url }) =>
  `https://www.reddit.com/submit?${buildUrlQuery({
    title,
    url: fullUri(url),
  })}`
