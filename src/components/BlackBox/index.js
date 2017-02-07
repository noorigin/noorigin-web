import React, { PropTypes } from 'react'
import styles from './index.css'

const BlackBox = ({ children, className }) => (
  <div className={[styles.blackBox, className].join(' ')}>
    { children }
  </div>
)

BlackBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

BlackBox.defaultProps = {
  children: [],
  className: '',
}

export default BlackBox
