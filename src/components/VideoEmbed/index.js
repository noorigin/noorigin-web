import React, { PropTypes } from 'react'
import styles from './index.css'

export default function VideoEmbed ({
  from = 'youtube',
  id = '',
}) {
  const rootUrl = from === 'youtube' ? 'https://youtube.com/embed' : from

  return (
    <div className={styles.videoEmbed}>
      <iframe className={styles.videoFrame} src={`${rootUrl}/${id}`} />
    </div>
  )
}

VideoEmbed.propTypes = {
  from: PropTypes.string,
  id: PropTypes.string,
}
