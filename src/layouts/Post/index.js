import React, { PropTypes } from 'react'
import Page from '../Page'
import PostFull from '../../components/PostFull'
// import styles from './index.css'

const Post = props => {
  const postContentProps = {
    __url: props.__url,
    title: props.head.title,
    bodyComponents: props.bodyComponents,
    body: props.body,
  }

  return (
    <Page {...props}>
      <PostFull {...postContentProps} />
    </Page>
  )
}

Post.propTypes = {
  head: PropTypes.object.isRequired,
  __url: PropTypes.string,
  title: PropTypes.string,
  bodyComponents: PropTypes.array,
  body: PropTypes.string,
}

export default Post
