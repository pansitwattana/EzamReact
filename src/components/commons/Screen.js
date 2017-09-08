import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import LaTeX from './LaTeX'

const Screen = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0px 15px;
`

const Submit = styled.div`
  font-size: 30px;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`

const Text = styled.span`
  font-size: 13px;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`

const ScreenComponent = ({ displayText, onSubmit }) =>
  (<Screen>
    <LaTeX text={displayText} id={uuid()} />
    <LeftContainer onClick={onSubmit}>
      <Submit>✓</Submit>
      <Text>Send</Text>
    </LeftContainer>
  </Screen>)

ScreenComponent.propTypes = {
  displayText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ScreenComponent
