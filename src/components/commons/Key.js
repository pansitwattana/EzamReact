import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
    width: 25%;
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
    if (keyValue === 'add') {
      padding = '12px'
      backgroundColor = '#cb7dc9'
    } else if (keyValue === 'substract') {
      backgroundColor = '#fcb064'
      padding = '15px'
    } else if (keyValue === 'divide') {
      backgroundColor = '#fb96cf'
      padding = '12px'
    } else if (keyValue === 'multiply') {
      backgroundColor = '#68cef1'
      padding = '13px'
    }
  } else if (keyType === 'action') {
    action = true
    borderRadius = '10px'
    if (keyValue === 'back') {
      color = '#d68086'
    } else if (keyValue === 'equal') {
      color = '#9ed8a6'
    } else if (keyValue === 'enter') {
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
