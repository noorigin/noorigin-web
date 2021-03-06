import './index.global.css'
import './highlight.global.css'
import React, { PropTypes } from 'react'
import Container from './components/Container'
import DefaultHeadMeta from './components/DefaultHeadMeta'
import Header from './components/Header'
import Content from './components/Content'
import './custom.global.css'

const AppContainer = props => (
  <Container>
    <DefaultHeadMeta />
    <Header />
    <Content>
      { props.children }
    </Content>
  </Container>
)

AppContainer.propTypes = {
  children: PropTypes.node,
}

export default AppContainer
