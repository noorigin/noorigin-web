import React, { PropTypes } from 'react'
import { Link, BodyContainer } from 'phenomic'
import VideoEmbed from '../VideoEmbed'
import GalleryEmbed from '../GalleryEmbed'
import styles from './index.css'

export default function PostContent ({
  __url,
  title,
  bodyComponents,
  body,
}) {
  return (
    <article>
      <Link to={ __url } className={styles.title}>
        <h1>{ title }</h1>
      </Link>
      { bodyComponents && bodyComponents.length
        ? bodyComponents.map(({ type, props }, index) => {
          switch (type) {
            case 'HTMLContent':
              return (
                <div className={styles.htmlContent} key={index}>
                  <BodyContainer>{props.content}</BodyContainer>
                </div>
              )
            case 'Video':
              return <VideoEmbed {...{ ...props, url: __url }} key={index} />
            case 'Gallery':
              return <GalleryEmbed {...{ ...props, url: __url }} key={index} />
            default: return ''
          }
        })
        : body
      }
    </article>
  )
}

PostContent.propTypes = {
  __url: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  bodyComponents: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    props: PropTypes.object,
  })),
}

PostContent.defaultProps = {
  __url: '',
  title: '',
  bodyComponents: [],
  body: '',
}
