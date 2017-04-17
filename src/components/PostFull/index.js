import React from 'react'
import FaChevronLeft  from 'react-icons/fa/chevron-left'
import BlackBox from '../BlackBox'
import PostContent from '../PostContent'
import PostFooter from '../PostFooter'
import styles from './index.css'

const goBack = () => typeof window !== 'undefined' && window.history.back()

const BackButton = () => (
  <button className={styles.backButton} onClick={goBack}>
    <div className={styles.backButtonLabel}>
      <FaChevronLeft style={{ marginRight: '0.6em' }}/> Back
    </div>
  </button>
)

const PostFull = props => {
  return (
    <div className={styles.wrapper}>
      <BackButton />
      <BlackBox className="PostFull">
        <PostContent {...{ ...props, isFullPost: true }} />
        <PostFooter {...props} />
      </BlackBox>
      <BackButton />
    </div>
  )
}

export default PostFull
