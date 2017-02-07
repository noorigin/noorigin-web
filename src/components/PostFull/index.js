import React from 'react'
import BlackBox from '../BlackBox'
import PostContent from '../PostContent'
import PostFooter from '../PostFooter'
import styles from './index.css'

const PostFull = props => {
  return (
    <BlackBox className={styles.wrapper}>
      <PostContent {...props} />
      <PostFooter {...props} />
    </BlackBox>
  )
}

export default PostFull
