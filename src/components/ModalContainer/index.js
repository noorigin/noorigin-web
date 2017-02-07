import React, { PropTypes } from 'react'
import styles from './index.css'

export default function ModalContainer ({ children }) {
  return (
    <div className={styles.root}>
      <div className={styles.contentContainer}>
        { children }
      </div>
    </div>
  )
}

ModalContainer.propTypes = {
  children: PropTypes.node,
}

ModalContainer.defaultProps = {
  children: [],
}
