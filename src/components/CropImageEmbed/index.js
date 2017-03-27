import React, { PropTypes } from 'react'
import classNames from './index.css'
import { camelCase, mapKeys } from '../../util'

const camelKeys = mapKeys(camelCase)

export default function CropImageEmbed({
  src,
  caption,
  className,
  style,
  cropFull,
  isFullPost,
}) {
  if (isFullPost && !cropFull) {
    return (
      <img
        alt={caption}
        className={classNames.imageEmbed}
        src={src}
      />
    )
  }

  return (
    <div
      title={caption}
      style={{ backgroundImage: `url(${src})`, ...camelKeys(style) }}
      className={
        [classNames.backgroundImageEmbed].concat(className).join(' ').trim()
      }
    />
  )
}

CropImageEmbed.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  cropFull: PropTypes.bool,
  isFullPost: PropTypes.bool,
}

CropImageEmbed.defaultProps = {
  caption: '',
  className: '',
  style: {},
  cropFull: false,
  isFullPost: false,
}
