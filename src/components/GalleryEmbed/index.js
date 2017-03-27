import React, { PureComponent, PropTypes } from 'react'
import { browserHistory as history } from 'react-router'
import CropImageEmbed from '../CropImageEmbed'

const WINDOW = typeof window !== 'undefined' && window
const Lightbox = WINDOW ? require('react-image-lightbox') : null
const styles = require('./index.css')

export default class GalleryEmbed extends PureComponent {
  constructor (props) {
    super(props)

    const urlParts = props.url.split('/').filter(s => !!s)
    const rootRoute = WINDOW ? WINDOW.location.pathname : ''
    const openHash = `#gallery-${urlParts[urlParts.length - 1]}`

    this.state = {
      openHash,
      rootRoute,
      photoIndex: 0,
      isOpen: WINDOW && WINDOW.location.hash === openHash,
    }

    this.renderMainImage = this.renderMainImage.bind(this)
  }

  componentWillUpdate (_, nextState) {
    if (!WINDOW) return

    const { rootRoute, openHash, isOpen } = this.state
    const { isOpen: nextIsOpen } = nextState

    if (isOpen === nextIsOpen) return

    if (nextIsOpen) {
      history.push(`${rootRoute}${openHash}`)
      this.unlisten = history.listen(() => {
        if (WINDOW.location.hash !== openHash) this.setState({ isOpen: false })
      })
    } else {
      history.replace(rootRoute)
      this.unlisten && this.unlisten()
      this.unlisten = null
    }
  }

  renderMainImage () {
    const { mainImage, images, isFullPost, cropMain } = this.props
    const { src, caption } = mainImage || images[0] || {}

    if (!cropMain) return <img src={src} alt={caption} />

    return (
      <CropImageEmbed
        {...{ src, caption, ...cropMain }}
        isFullPost={isFullPost}
      />
    )
  }

  render () {
    const { images } = this.props
    const { isOpen, photoIndex } = this.state

    return (
      <div>
        <div
          className={styles.wrapper}
          onClick={() => this.setState({ isOpen: true })}
        >
          {this.renderMainImage()}
        </div>
        {isOpen && Lightbox
          ? (
            <Lightbox
              mainSrc={images[photoIndex].src}
              nextSrc={images[(photoIndex + 1) % images.length].src}
              prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
              imageCaption={images[photoIndex].caption}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() => this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })}
              onMoveNextRequest={() => this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })}
            />
          )
          : ''
        }
      </div>
    )
  }
}

const commonImageProps = {
  src: PropTypes.string,
  caption: PropTypes.string,
}

GalleryEmbed.propTypes = {
  url: PropTypes.string,
  mainImage: PropTypes.shape(commonImageProps),
  images: PropTypes.arrayOf(PropTypes.shape(commonImageProps)),
  cropMain: PropTypes.shape(),
  isFullPost: PropTypes.bool,
}

GalleryEmbed.defaultProps = {
  url: '',
  mainImage: null,
  images: [],
  cropMain: null,
  isFullPost: false,
}
