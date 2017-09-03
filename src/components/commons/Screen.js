import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import LaTeX from './LaTeX'

const Screen = styled.div`
  background-color: #68cef2;
  color: #190d08;
  font-size: 30px;
  padding: 5px 10px;
  text-align: left;
  font-weight: lighter;
  box-shadow:
    5px 5px 5px 0px rgba(0,0,0,.18),
    0 3px 1px -2px rgba(0,0,0,.24),
    0 1px 10px 0 rgba(0,0,0,.1);
`

const ScreenComponent = ({ displayText }) =>
  (<Screen>
    <LaTeX text={displayText} id={uuid()} />
  </Screen>)

ScreenComponent.propTypes = {
  displayText: PropTypes.string.isRequired,
}

export default ScreenComponent
