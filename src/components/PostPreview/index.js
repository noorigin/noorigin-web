import React, { PropTypes } from 'react'
import { Link } from 'phenomic'
import BlackBox from '../BlackBox'
import PostContent from '../PostContent'
import PostFooter from '../PostFooter'
import styles from './index.css'

const PostPreview = props => {
  const { __url } = props

  return (
    <BlackBox className={`PostPreview ${styles.wrapper}`}>
      <div className={styles.contentContainer}>
        <PostContent {...{ ...props, isFullPost: false }} />
      </div>
      <div className={styles.footerContainer}>
        <Link to={ __url } className={ styles.readMore }>
          Continue...
        </Link>
        <PostFooter {...props} />
      </div>
    </BlackBox>
  )
}

PostPreview.propTypes = {
  __url: PropTypes.string.isRequired,
}

export default PostPreview
