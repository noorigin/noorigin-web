import React, { PropTypes } from 'react'
import enhanceCollection from 'phenomic/lib/enhance-collection'
import PostList from '../../components/PostList'

const LatestPosts = (props, { collection }) => {
  const latestPosts = enhanceCollection(collection, {
    filter: { layout: 'Post' },
    sort: 'date',
    reverse: true,
  }).map(({ __url, bodyComponents, title, body }) => ({
    __url,
    bodyComponents,
    title,
    body,
  }))

  return (
    <div>
      <PostList posts={ latestPosts } />
    </div>
  )
}

LatestPosts.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default LatestPosts
