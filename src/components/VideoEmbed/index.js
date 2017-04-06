import React, { Component, PropTypes } from 'react'
import styles from './index.css'

export default class VideoEmbed extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { from, id, theme } = this.props
    const rootUrl = from === 'youtube' ? 'https://youtube.com/embed' : from

    return (
      <div className={styles.videoEmbed}>
        <iframe
          className={styles.videoFrame}
          src={`${rootUrl}/${id}?theme=${theme}`}
          allowFullScreen
        />
      </div>
    )
  }
}

VideoEmbed.propTypes = {
  from: PropTypes.string,
  id: PropTypes.string,
  theme: PropTypes.oneOf([ 'light', 'dark' ]),
}

VideoEmbed.defaultProps = {
  from: 'youtube',
  id: '',
  theme: 'light',
}
