import React, { PropTypes } from 'react'
import FaTwitter from 'react-icons/fa/twitter'
import FaFacebook  from 'react-icons/fa/facebook'
import FaTumblr  from 'react-icons/fa/tumblr'
import FaReddit from 'react-icons/fa/reddit-alien'
import {
  buildTwitterShareUrl,
  buildFacebookShareUrl,
  buildTumblrShareUrl,
  buildRedditShareUrl,
} from '../../util'
import styles from './index.css'

const PostFooter = ({ __url: url, title, description }) => (
  <div className={styles.wrapper}>
    <a
      className={styles.shareLink}
      href={buildTwitterShareUrl({ url, title, description })}
      target='_blank'
    ><FaTwitter /></a>
    <a
      className={styles.shareLink}
      href={buildFacebookShareUrl({ url, title, description })}
      target='_blank'
    ><FaFacebook /></a>
    <a
      className={styles.shareLink}
      href={buildTumblrShareUrl({ url, title, description })}
      target='_blank'
    ><FaTumblr /></a>
    <a
      className={styles.shareLink}
      href={buildRedditShareUrl({ url, title, description })}
      target='_blank'
    ><FaReddit /></a>
  </div>
)

PostFooter.propTypes = {
  __url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

PostFooter.defaultProps = {
  url: '',
  title: '',
  description: '',
}

export default PostFooter
