import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Keys } from '../data/Keys'

const Key = styled.div`
  background-color: #ffffff;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 10px 0;
  font-weight: lighter;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  transition: all 0.2s;
  ${props => props.highlight && `
    transform: scale(0.9);
  `}
  ${props => props.operator && `
    width: 25%;
    color: white;
    padding: 20px 0;
  `}
  ${props => props.number && `
    border: 1px solid #f8f8f8;
    width: 20%;
    color: #919191;
  `}
  ${props => props.action && `
    width: 33%;
    padding: 20px;
  `}
`

const Operation = styled.div`
  padding-left: ${props => props.padding};
  padding-right: ${props => props.padding};
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  border: ${props => props.border};
  color: ${props => props.color};
  ${props => props.operator && `
    padding-top: 8px;
    padding-bottom: 8px;
    display: inline;
    box-shadow:
      0 2px 2px 0 rgba(0,0,0,.14),
      0 3px 1px -2px rgba(0,0,0,.2),
      0 1px 5px 0 rgba(0,0,0,.12);
  `}
`

const KeyComponent = ({ keyType, keySymbol = '', keyValue, highlight, onPress }) => {
  let operator = false
  let number = false
  let action = false
  let padding = '0px'
  let backgroundColor = 'white'
  let borderRadius = '0px'
  let border = ''
  let color = ''
  if (keyType === 'number') {
    number = true
  } else if (keyType === 'operator') {
    operator = true
    borderRadius = '20px'
    if (keyValue === Keys.PLUS) {
      padding = '12px'
      backgroundColor = '#cb7dc9'
    } else if (keyValue === Keys.RIGHT || keyValue === Keys.LEFT) {
      backgroundColor = '#00ffff'
      color = '#000000'
      padding = '13px'
    } else if (keyValue === Keys.BACKSPACE) {
      backgroundColor = '#89e8e1'
      color = '#000000'
      padding = '7px'
    } else if (keyValue === Keys.ENTER) {
      backgroundColor = '#ec1b5b'
      padding = '15px'
      borderRadius = '7px'
    }
  } else if (keyType === 'action') {
    action = true
    borderRadius = '10px'
    if (keyValue === Keys.BACKSPACE) {
      color = '#d68086'
    } else if (keyValue === Keys.EQUAL) {
      color = '#9ed8a6'
    } else if (keyValue === Keys.ENTER) {
      color = 'red'
    }
    border = `1px solid ${color}`
  }

  return (<Key onClick={() => onPress(keyValue)} number={number} operator={operator} action={action}>
    <Operation
      operator={operator}
      padding={padding}
      backgroundColor={backgroundColor}
      color={color}
      borderRadius={borderRadius}
      border={border}
      highlight={highlight}
    >
      <span>{keySymbol}</span>
    </Operation>
  </Key>)
}


KeyComponent.defaultProps = {
  keySymbol: '',
  keyValue: '',
  highlight: false,
}

KeyComponent.propTypes = {
  keyType: PropTypes.string.isRequired,
  keySymbol: PropTypes.string,
  keyValue: PropTypes.string,
  highlight: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
}

export default KeyComponent
