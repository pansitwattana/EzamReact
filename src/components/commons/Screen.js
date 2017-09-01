import React, { PropTypes } from 'react'
import styled from 'styled-components'
import uuid from 'uuid'
import LaTeX from './LaTeX'

const Screen = styled.div`
  background-color: #68cef2;
  color: #190d08;
  font-size: 30px;
  padding: 5px 10px;
  text-align: left;
  font-weight: lighter;
`

const ScreenComponent = ({ displayText }) =>
  (<Screen>
    <LaTeX text={displayText} id={uuid()} />
  </Screen>)

ScreenComponent.propTypes = {
  displayText: PropTypes.string.isRequired,
}

export default ScreenComponent
