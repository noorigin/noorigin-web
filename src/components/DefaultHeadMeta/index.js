import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

const DefaultHeadMeta = props => (
  <div hidden>
    <Helmet
      meta={[
        { property: 'og:site_name', content: 'no origin' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#222' },
        ...props.meta ? props.meta : [],
      ]}
      link={[
        {
          rel: 'icon',
          type: 'image/png',
          href: '/assets/favicon.png',
        },
      ]}
      script={[
        { src: 'https://cdn.polyfill.io/v2/polyfill.min.js' },
        ...props.scripts ? props.scripts : [],
      ]}
    />
    <style>{ '@-ms-viewport { width: device-width; }' }</style>
  </div>
)

DefaultHeadMeta.propTypes = {
  meta: React.PropTypes.arrayOf(React.PropTypes.object),
  scripts: React.PropTypes.arrayOf(React.PropTypes.object),
}

DefaultHeadMeta.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default DefaultHeadMeta
