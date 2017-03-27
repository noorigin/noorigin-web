import React, { PropTypes } from 'react'
import PostPreview from '../PostPreview'
import styles from './index.css'

const PostList = ({ posts }) => {
  return (
    <div className="PostList">
      {
      posts.length
      ? (
        <ul className={`PostList__list ${styles.list}`}>
          {
          posts.map(post => (
            <li
              className={`PostList__postContainer ${styles.postContainer}`}
              key={ post.title }
            >
              <PostPreview { ...post } />
            </li>
          ))
        }
        </ul>
      )
      : 'No posts yet.'
    }
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostList
