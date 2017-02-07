import React, { PropTypes } from 'react'
import { Link } from 'phenomic'
import styles from './index.css'

const Header = (props, { metadata: { pkg } }) => (
  <header className={ styles.header }>
    <Link className={ styles.titleLink } to={ '/' }>
      <h1 className={ styles.title }>No Origin</h1>
    </Link>
    <nav className={ styles.nav }>
      <a
        href={pkg.facebook}
        className={ styles.link }
        target='_blank'
      >
          Facebook
      </a>
      <a
        href={pkg.youtube}
        className={ styles.link }
        target='_blank'
      >
          YouTube
      </a>
      <a
        href={pkg.instagram}
        className={ styles.link }
        target='_blank'
      >
          Instagram
      </a>
    </nav>
  </header>
)

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header
