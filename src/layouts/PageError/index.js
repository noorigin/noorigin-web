import React, { PropTypes } from 'react'
import { Link } from 'phenomic'
import Page from '../Page'
import styles from './index.css'

const PageError = ({ error, errorText }) => (
  <Page head={{ hero: '/assets/ogimage.png' }}>
    <div className={ styles.container }>
      <div className={ styles.text }>
        <p className={ styles.title }>
          <strong>{ error }</strong>
          { ' ' }
          { errorText }
        </p>
        {
          error === 404 &&
          <div>
            It seems you found a broken link. <Link to={'/'} className={styles.link}>Return home.</Link>
          </div>
        }
      </div>
    </div>
  </Page>
)

PageError.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  errorText: PropTypes.string,
}

PageError.defaultProps = {
  error: 404,
  errorText: 'Page Not Found',
}

export default PageError
