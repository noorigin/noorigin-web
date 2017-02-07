import React, { PropTypes } from 'react'
import PostPreview from '../PostPreview'
import styles from './index.css'

const PostList = ({ posts }) => {
  return (
    <div>
      {
      posts.length
      ? (
        <ul className={ styles.list }>
          {
          posts.map(post => (
            <li className={styles.postContainer} key={ post.title }>
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
