import React, { PureComponent, PropTypes } from 'react'
import { browserHistory as history } from 'react-router'

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

  render () {
    const { images } = this.props
    const { src: src1, caption: caption1 } = images[0] || {}
    const { isOpen, photoIndex } = this.state

    return (
      <div>
        <div
          className={styles.wrapper}
          onClick={() => this.setState({ isOpen: true })}
        >
          <img src={src1} alt={caption1} />
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

GalleryEmbed.propTypes = {
  url: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    caption: PropTypes.string,
  })),
}

GalleryEmbed.defaultProps = {
  url: '',
  images: [],
}
