import React, { PropTypes, Children, cloneElement } from 'react'
import { Link, BodyContainer } from 'phenomic'
import VideoEmbed from '../VideoEmbed'
import GalleryEmbed from '../GalleryEmbed'
import CropImageEmbed from '../CropImageEmbed'
import styles from './index.css'

const createLinkWrap = (url, isFullPost) => {
  const LinkWrap = ({ children }) => {
    const child = Children.only(children)

    if (isFullPost) return child

    return (
      <Link to={url} key={child.key} className={styles.htmlContent}>
        {cloneElement(child, { key: 0 })}
      </Link>
    )
  }

  LinkWrap.propTypes = { children: PropTypes.node.isRequired }

  return LinkWrap
}

export default function PostContent ({
  __url,
  title,
  bodyComponents,
  body,
  isFullPost,
}) {
  const Wrap = createLinkWrap(__url, isFullPost)

  return (
    <article>
      <Link to={ __url } className={styles.title}>
        <h1>{ title }</h1>
      </Link>
      { bodyComponents && bodyComponents.length
        ? bodyComponents.map(({ type, props }, key) => {
          const embedProps = { ...props, isFullPost, url: __url }

          switch (type) {
            case 'HTMLContent':
              return (
                <Wrap key={key}>
                  <BodyContainer key={key}>{props.content}</BodyContainer>
                </Wrap>
              )
            case 'Video':
              return <VideoEmbed {...embedProps} key={key} />
            case 'Gallery':
              return <GalleryEmbed {...embedProps} key={key} />
            case 'CropImage':
              return (
                <Wrap key={key}>
                  <CropImageEmbed {...embedProps} key={key} />
                </Wrap>
              )
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
  isFullPost: PropTypes.bool,
  bodyComponents: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    props: PropTypes.object,
  })),
}

PostContent.defaultProps = {
  __url: '',
  title: '',
  isFullPost: false,
  bodyComponents: [],
  body: '',
}
