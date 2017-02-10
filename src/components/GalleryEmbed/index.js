import React, { PureComponent, PropTypes } from 'react'
// import { browserHistory } from 'react-router'
import styles from './index.css'

const WINDOW = typeof window !== 'undefined' && window
const Lightbox = WINDOW ? require('react-image-lightbox') : null

export default class GalleryEmbed extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      photoIndex: 0,
      initialRoute: WINDOW ? window.location.search : '',
    }
  }

  // componentDidUpdate () {
  //   const { initialRoute } = this.state
  //   console.log(initialRoute)
  //   if (!this.state.initialRoute) return
  //   browserHistory.push(`${initialRoute}/gallery`)
  // }

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
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    caption: PropTypes.string,
  })),
}

GalleryEmbed.defaultProps = {
  images: [],
}
