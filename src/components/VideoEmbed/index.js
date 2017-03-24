import React, { PropTypes } from 'react'
import styles from './index.css'

export default function VideoEmbed ({ from, id, theme }) {
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
